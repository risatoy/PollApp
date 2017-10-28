const express = require('express');
const models = require('../models');
const methodOverride = require('method-override');

const router = express.Router();

router.use(methodOverride('_method'));
