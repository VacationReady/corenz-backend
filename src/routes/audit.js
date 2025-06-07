const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Audit route placeholder');
});

module.exports = router;
