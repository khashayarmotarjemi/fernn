import express = require('express');

import bodyParser = require('body-parser')
import ejs = require('ejs');

import {PostsRepo, MulterFile ,upload} from './domain/posts_repo'
import {postsRouter} from './routes/posts'

import passport = require('passport');
import passportLocal = require('passport-local');

let LocalStrategy = passportLocal.Strategy;

var app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.engine('html', ejs.renderFile);
app.set('view engine', 'ejs');

const postsRepo = new PostsRepo();
const router = postsRouter(postsRepo);

app.use( express.static( __dirname + "/../public" ) );
app.use(require('cookie-parser')());
app.use(require('express-session')({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(
  function(username: string, password:string, done) {
    if(username == 'khashayar' && password == "12345") {
        return done(null, {username: 'khashayar'})
    } else {
        return done(null, false, { message: 'Incorrect username or password' });
    }
    // User.findOne({ username: username }, function (err, user) {
    //   if (err) { return done(err); }
    //   if (!user) {
    //     return done(null, false, { message: 'Incorrect username.' });
    //   }
    //   if (!user.validPassword(password)) {
    //     return done(null, false, { message: 'Incorrect password.' });
    //   }
    //   return done(null, user);
    // });
  }
));


app.use('/',router);


// Listen
app.listen(4000, () => {
    console.log('Server listing on 3000');
})

passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
  passport.deserializeUser(function(user, done) {
    done(null, user);
  });
