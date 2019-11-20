const express = require('express');
const router = express.Router();
const miembro = require('../models/miembro');

router.get('/', (req, res) => {
    return miembro.findAll()
        .then(users => res.json(users))
        .catch(e => {
            console.log(e);
            res.error(e);
        });
});

router.post('/', (req, res) => {
    const { fechaAfilicacion,
        apellidoPaterno,
        apellidoMaterno,
        fechaNacimiento,
        documentoIdentidad,
        codigoUniversitario,
        numeroCelular,
        correoElectronico,
        sexo,
        especialidad,
        estado,
        foto
    } = req.query;
    return miembro.create({ fechaAfilicacion,
        apellidoPaterno,
        apellidoMaterno,
        fechaNacimiento,
        documentoIdentidad,
        codigoUniversitario,
        numeroCelular,
        correoElectronico,
        sexo,
        especialidad,
        estado,
        foto
    })
        .then(() => res.sendStatus(200))
        .catch(e => res.error(e));
});
module.exports = router;