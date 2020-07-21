import express = require('express');

import bodyParser = require('body-parser')
import ejs = require('ejs');

import {PostsRepo, MulterFile ,upload} from './domain/posts_repo'
import {postsRouter} from './routes/posts'

var app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.engine('html', ejs.renderFile);
app.set('view engine', 'ejs');

const postsRepo = new PostsRepo();
const router = postsRouter(postsRepo);
app.use('/',router);

app.use( express.static( __dirname + "/../public" ) );

// Listen
app.listen(4000, () => {
    console.log('Server listing on 3000');
})