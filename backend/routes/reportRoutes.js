const express = require('express')
const router = express.Router();
const { getreport, savereport } = require('../controllers/reportController')
router.get('/getreport', (req, res) => {
    res.json('hello')
});

router.post('/savereport', savereport);

module.exports = router