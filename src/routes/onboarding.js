const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Onboarding route placeholder');
});

module.exports = router;
