const express = require('express');
const router = express.Router();

const submissionsRouter = require('./submissions');

router.use('/submissions', submissionsRouter);

router.get('/', (req, res) => {
    res.json(req.ip);
});


module.exports = router;