const express = require('express');
const router = express.Router();
const miembro = require('./models/miembro');
const submission = require('./models/submission');

router.post('/', (req, res) => {
    const direccionIp = req.ip;
    req.body['fechaAfiliacion'] = req.body['fechaAfiliacion'] ? new Date(req.body['fechaAfiliacion']) : null;
    req.body['fechaNacimiento'] = req.body['fechaNacimiento'] ? new Date(req.body['fechaNacimiento']) : null;
    return miembro.create(req.body)
        .then(entrada => {
            const idEntradaMiembro = entrada.get('id');
            return submission.create({ direccionIp, idEntradaMiembro });
        })
        .then(() => res.sendStatus(200))
        .catch(e => res.status(500).send(e));
});

router.all('/', (req, res) => {
    res.sendStatus(405);
});

module.exports = router;