const express = require('express');
const models = require('../models');

const Controller = {
  registerRouter() {
    const router = express.Router();

    router.get('/', this.index);
    router.post('/', this.submit);

    return router;
  },
  index(req, res) {
    res.render('sign-up');
  },
  submit(req, res) {
    models.User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    }).then((user) => {
      req.login(user, () =>
        res.redirect('/')
      );
    }).catch(() => {
      res.render('sign-up');
    });
  },
};

module.exports = Controller.registerRouter();
