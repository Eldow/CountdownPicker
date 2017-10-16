const express = require('express');
const router = express.Router();

/* GET api listing. */
router.get('/', (req, res) => {
  res.json({message:'Welcome on CountdownPicker API'});
});

module.exports = router;
