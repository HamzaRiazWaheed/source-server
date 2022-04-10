const express = require('express')
const router = express.Router();
const convertNumberToEnglish = require('./numToEng');

router.get('/', async (req, res) => {  
  res.json(JSON.stringify({english: convertNumberToEnglish(req.query.num.toString())}));
});

module.exports = router
