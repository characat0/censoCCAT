const express = require('express');
const rp = require('request-promise');
const cheerio = require('cheerio');
const router = express.Router();
const USER_AGENT = process.env.USER_AGENT;
const ENDPOINT = process.env.ENDPOINT;

const mapper = {
    "Codigo UNI": 'codigoUniversitario',
    "Nombres": 'nombres',
    "Especialidad": 'especialidad',
    "Situación": 'situacion',
    "Medida Disciplinaria": 'estado'
};
const especialidades = {
    "INGENIERÍA DE SISTEMAS": 'i2',
    "INGENIERÍA INDUSTRIAL": 'i1'
};

router.get('/', (req, res) => {
    const { codigo } = req.query;
    const params = {
        uri: ENDPOINT,
        method: 'POST',
        rejectUnauthorized: false,
        transform: (body) => cheerio.load(body),
        qs: { id: codigo, op: 'detalu' },
        headers: { 'User-Agent': USER_AGENT }
    };
    return rp(params)
        .then($ => {
            const tabla = $('tr');
            const usuario = {};
            for (let i = 4; i < 22; i++) {
                const fila = tabla.eq(i).children('td');
                let campo = fila.eq(0).text().trim();
                const index = campo.indexOf(":");
                if (~index) campo = campo.substr(0,index);
                const valor = fila.eq(1).text().trim();
                if (campo && valor && !valor.match(/^\.[1-9]\./)) usuario[campo] = valor;
            }
            const Data = {};
            Object.getOwnPropertyNames(mapper)
                .forEach(prop => {
                    const newProp = mapper[prop];
                    if (!newProp) throw new Error('Propiedad no encontrada: ' + prop);
                    Data[newProp] = usuario[prop];
                });
            const Final = {};
            Final['codigoUniversitario'] = Data['codigoUniversitario'];
            [Final['apellidoPaterno'], Final['apellidoMaterno'], Final['nombres']] = Data['nombres'].split('-');
            Final['especialidad'] = especialidades[Data['especialidad']];
            Final['matriculado'] = Data['situacion'].split('-')[0] === "ALUMNO REGULAR MATRICULADO ";

            return res.json(Final);
        })
        .catch(e => res.status(500).send(e));
});

module.exports = router;