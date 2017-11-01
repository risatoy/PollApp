const bodyParser = require('body-parser');
const express = require('express');
const models = require('./models');
const methodOverride = require('method-override');
const passport = require('./middlewares/authentication');
const viewHelpers = require('./middlewares/viewHelpers');
const expressSession = require('express-session');

const PORT = process.env.PORT || 8000;

const app = express();

app.use(methodOverride('_method'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(expressSession (({secret: 'keyboard cat'})));
app.use(passport.initialize());
app.use(passport.session());


// Uncomment the following if you want to serve up static assets.
// (You must create the public folder)

app.use(express.static('./public'));

// Uncomment the following if you want to use handlebars
// on the backend. (You must create the views folder)

const exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({
  layoutsDir: './views/layouts',
  defaultLayout: 'main',
}));
app.set('view engine', 'handlebars');
app.set('views', `${__dirname}/views/`);


app.use(viewHelpers.register());
// app.use(function(req, res, next){
//   res.locals.cur_user = req.user;
//   next();     // since this is middleware function has to mention next() to move to next code
// });

// Load up all of the controllers
const controllers = require('./controllers');
app.use(controllers)


// First, make sure the Database tables and models are in sync
// then, start up the server and start listening.
models.sequelize.sync({force: false})
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is up and running on port: ${PORT}`)
    });
  });
