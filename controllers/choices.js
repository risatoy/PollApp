const express = require('express');
const models = require('../models');
const methodOverride = require('method-override');

const router = express.Router();

router.use(methodOverride('_method'));


// *************
// CHOICE ROUTE
// *************

router.put('/:choiceid', (req, res) => {
  console.log("what is the id: " + req.body.id);
  models.Choices.findById(parseInt(req.body.id))
 		.then(poll => {
    //  res.json(poll.count);
 			poll.update({
 				count: poll.count+1
 			});
 			res.redirect('back');

 		})
 		.catch(() => {
    	  res.sendStatus(400);
    });
});

module.exports = router;
