const express = require('express');
const passport = require('../middlewares/authentication');
const Redirect = require('../middlewares/redirect');

const Controller = {
  registerRouter() {
    const router = express.Router();

    router.get('/', Redirect.ifLoggedIn('/'), this.index);
    router.post('/', this.login);

    return router;
  },
  index(req, res) {
    res.render('login');
    //res.render('login', { error: req.flash('error') });
  },
  login(req, res) {
    passport.authenticate('local', {
      successRedirect: '/',
      failureRedirect: '/login',
      // failureFlash: true,
      // successFlash: true,
    })(req, res);
  },
};

module.exports = Controller.registerRouter();
