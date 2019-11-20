const express = require('express');
const router = express.Router();

const miembroRouter = require('./routes/miembro');
router.use('/miembro', miembroRouter);

module.exports = router;