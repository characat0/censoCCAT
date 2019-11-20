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
module.exports = router;