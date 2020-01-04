const express = require('express');
const rp = require('request-promise');
const cheerio = require('cheerio');
const router = express.Router();
const USER_AGENT = process.env.USER_AGENT;
const ENDPOINT = process.env.ENDPOINT;
const IMAGE_ENDPOINT = process.env.IMAGE_ENDPOINT;

const mapper = {
    "Codigo UNI": 'codigoUniversitario',
    "Nombres": 'nombres',
    "Especialidad": 'especialidad',
    "Situación": 'situacion',
    "Medida Disciplinaria": 'estado'
};
const especialidades = {
    "ARQUITECTURA": 'a1',
    "INGENIERÍA CIVIL": 'c1',
    "INGENIERÍA ECONÓMICA": 'e1',
    "INGENIERÍA ESTADÍSTICA": 'e3',
    "INGENIERÍA GEOLÓGICA": 'g1',
    "INGENIERÍA METALÚRGICA": 'g2',
    "INGENIERÍA DE MINAS": 'g3',
    "INGENIERÍA INDUSTRIAL": 'i1',
    "INGENIERÍA DE SISTEMAS": 'i2',
    "INGENIERÍA ELÉCTRICA": 'l1',
    "INGENIERÍA ELECTRÓNICA": 'l2',
    "INGENIERÍA DE TELECOMUNICACIONES": 'l3',
    "INGENIERÍA MECÁNICA": 'm3',
    "INGENIERÍA MECÁNICA Y ELÉCTRICA": 'm4',
    "INGENIERÍA NAVAL": 'm5',
    "INGENIERÍA MECATRÓNICA": 'm6',
    "FÍSICA": 'n1',
    "MATEMÁTICA": 'n2',
    "QUÍMICA": 'n3',
    "INGENIERÍA FÍSICA": 'n5',
    "CIENCIA DE LA COMPUTACIÓN": 'n6',
    "INGENIERÍA PETROQUÍMICA": 'p2',
    "INGENIERÍA DE PETRÓLEO Y GAS NATURAL": 'p3',
    "INGENIERÍA QUÍMICA": 'q1',
    "INGENIERÍA TEXTIL": 'q2',
    "INGENIERÍA SANITARIA": 's1',
    "INGENIERÍA DE HIGIENE Y SEGURIDAD INDUSTRIAL": 's2',
    "INGENIERÍA AMBIENTAL": 's3'
};

router.get('/', (req, res) => {
    const { codigo } = req.query;
    const imageUrl = IMAGE_ENDPOINT + codigo + '.jpg';
    const dataRequest = {
        uri: ENDPOINT,
        method: 'POST',
        timeout: 5000,
        rejectUnauthorized: false,
        transform: (body) => cheerio.load(body),
        qs: { id: codigo, op: 'detalu' },
        headers: { 'User-Agent': USER_AGENT }
    };
    const imageRequest = {
        uri: imageUrl,
        followAllRedirects: false,
        rejectUnauthorized: false,
        headers: { 'User-Agent': USER_AGENT },
        resolveWithFullResponse: false
    };

    return rp(dataRequest)
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
            Final['imageUrl'] = IMAGE_ENDPOINT + codigo + '.jpg';
            const numeroIdentificación = codigo[4];
            const segundoNumero = codigo[5];
            const añoIngreso = codigo.substr(2, 2);
            Final['cicloIngreso'] = añoIngreso + '-';
            switch (numeroIdentificación) {
                case '0':
                    Final['cicloIngreso'] += '1';
                    break;
                case '1':
                    Final['cicloIngreso'] += '2';
                    break;
                case '2':
                    if (parseInt(segundoNumero) >= 5) Final['cicloIngreso'] += '2';
                    else Final['cicloIngreso'] += 1;
                    break;
                case '3':
                    if (parseInt(segundoNumero) >= 5) Final['cicloIngreso'] += '2';
                    else Final['cicloIngreso'] += 1;
                    break;
                case '4':
                    if (parseInt(segundoNumero) >= 5) Final['cicloIngreso'] += '2';
                    else Final['cicloIngreso'] += 1;
                    break;
                case '5':
                    if (parseInt(segundoNumero) >= 5) Final['cicloIngreso'] += '2';
                    else Final['cicloIngreso'] += 1;
                    break;
                case '7':
                    if (parseInt(segundoNumero) >= 5) Final['cicloIngreso'] += '2';
                    else Final['cicloIngreso'] += 1;
                    break;
                case '9':
                    if (parseInt(segundoNumero) >= 5) Final['cicloIngreso'] += '2';
                    else Final['cicloIngreso'] += 1;
                    break;
                default:
                    throw new Error('Codigo invalido! ' + codigo);
            }
            return rp.head(imageRequest)
                .then(headers => {
                    Final['imagenValida'] = headers['content-type'] === 'image/jpeg';
                })
                .catch(() => {
                    Final['imagenValida'] = false;
                })
                .finally(() => res.send(Final));
        })
        .catch(e => {
            res.status(500).send(e);
            console.error(e);
        });
});

module.exports = router;