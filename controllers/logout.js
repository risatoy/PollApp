const express = require('express');

const Controller = {
  registerRouter() {
    const router = express.Router();

    router.post('/', this.logout);

    return router;
  },
  logout(req, res) {
    req.logout();
    res.redirect('/');
  },
};

module.exports = Controller.registerRouter();
