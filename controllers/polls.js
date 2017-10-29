const express = require('express');
const models = require('../models');
const methodOverride = require('method-override');

const router = express.Router();

router.use(methodOverride('_method'));


// *INDEX
// This route retrieves a list of all poll questions
router.get('/', (req, res) => {
  models.Polls.findAll()
    .then((allPolls) => {
      //res.json(allPolls);
      res.render('./polls/index', {allPolls: allPolls});
    })
});

// *NEW
router.get('/new', (req, res) => {
  res.render('./polls/new');
});


// *CREATE
// This route is for creating a new poll object
//  We provide the `question` in the body parameters
//  Note: this does NOT take an array of choices
router.post('/', (req, res) => {
  console.log(req.params.id);
  models.Polls.create({
    question: req.body.question
  })
  .then((poll) => {
    //res.json(poll);  poll.id = question.id
    //choices ['yes', 'no', 'maybe', 'leave me alone']
    var arrayChoices = req.body.choice;
    var arrayChoiceObjects = new Array();
    for (var i = 0; i < arrayChoices.length - 1; i++){
      arrayChoiceObjects.push({
        description: arrayChoices[i],
        count: 0,
        PollId: poll.id
      });
    }
    // arrayChoiceObjects [{ description: 'yes', PollId: poll.id }, { description: 'no', PollId: poll.id }, { description: 'maybe', PollId: poll.id }, { description: 'leave me alone', PollId: poll.id },  ]
    models.Choices.bulkCreate(arrayChoiceObjects).then((choicearray) => {
      res.redirect("/polls");
    });
  })
  .catch(() => {
    res.sendStatus(400);
  });
});

// *SHOW
// This route is used to retrieve a specific poll object
//  The query also retrieves all associated choices for the poll
router.get('/:id', (req, res) => {
  models.Polls.findById(parseInt(req.params.id), {
    include: [{
      model: models.Choices
    }]
  })
  .then(poll => {
    //res.json(poll);
    res.render("./polls/show", {poll: poll});
  });
});

// *EDIT
router.get('/:id/edit', (req, res) => {
  models.Polls.findById(parseInt(req.params.id), {
    include: [{
      model: models.Choices
    }]
  })
  .then(poll => {
    //res.json(poll);
    res.render("./polls/edit", {poll: poll});
  });
});

// *UPDATE
router.put('/:id', (req, res) => {
  models.Polls.findById(parseInt(req.params.id))
 		.then(polls => {
    //res.json(polls);
 			polls.update({
 				question: req.body.question
 			});
 			res.redirect("/polls");
 		})
 		.catch(() => {
    	  res.sendStatus(400);
    });
});

// *DELETE
router.delete('/:id', (req, res) => {
  models.Polls.findById(parseInt(req.params.id))
 	  .then(poll => {
 			models.Choices.destroy({
 				where: {PollId: req.params.id}
 			});
 			poll.destroy();
 			res.redirect("/polls");
 		})
 		.catch(() => {
 			res.sendStatus(400);
 		});
});


// This route is used for adding a choice for a specific poll
//  The poll id is in the route parameters
//  The choice description is in the parameters
// router.post('/:id/choices', (req, res) => {
//   models.Polls.findById(parseInt(req.params.id))
//     .then(poll => {
//       models.Choices.create({
//         description: req.body.description,
//         PollId: poll.id
//       })
//       .then((choice) => {
//         res.json(choice);
//       })
//     })
//     .catch(() => {
//       console.log('error here')
//       res.sendStatus(400);
//     });
// });


module.exports = router;
