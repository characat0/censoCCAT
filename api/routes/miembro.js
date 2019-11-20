const express = require('express');
const router = express.Router();
const miembro = require('../models/miembro');

router.get('/', (req, res) => {
    return miembro.findAll()
        .then(users => res.json(users))
        .catch(e => res.status(500).send(e));
});

router.post('/', (req, res) => {
    req.body['fechaAfiliacion'] = req.body['fechaAfiliacion'] ? new Date(req.body['fechaAfiliacion']) : null;
    req.body['fechaNacimiento'] = req.body['fechaNacimiento'] ? new Date(req.body['fechaNacimiento']) : null;
    return miembro.create(req.body)
        .then(() => res.sendStatus(200))
        .catch(e => res.status(500).send(e));
});
module.exports = router;