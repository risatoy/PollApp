const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const basename = path.basename(module.filename);
const redirect = require('../middlewares/redirect');

fs
  .readdirSync(__dirname)
  .filter(file => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach(file => {
    const fileName = file.substr(0, file.length - 3);
    router.use(`/${fileName}`, require(`./${fileName}`));
  });

router.get('/', (req, res) => {
  res.render('home');
});

module.exports = router;
