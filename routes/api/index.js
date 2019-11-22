const express = require('express');
const router = express.Router();

const submissionsRouter = require('./submissions');
const infoRouter = require('./info');
router.use('/submissions', submissionsRouter);
router.use('/info', infoRouter);

router.get('/', (req, res) => {
    res.json(req.ip);
});


module.exports = router;