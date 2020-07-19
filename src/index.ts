// Setup
import express = require('express');

import bodyParser = require('body-parser')
import ejs = require('ejs');

import {PostsRepo, MulterFile ,upload} from './posts_repo'


var app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.engine('html', ejs.renderFile);
app.set('view engine', 'html');


const postsRepo = new PostsRepo();

// Routes
app.get("/", (req: express.Request, res: express.Response) => {
    postsRepo.getAllPosts().then(posts => {
        res.render('index', { posts: posts });
    }).catch(err => {
        res.status(400).send("Unable to save data");
    });
});

app.post('/addpost', upload.single("file"),
    (req: express.Request & { file: MulterFile }, res: express.Response) => {
        postsRepo.addPost(req).then(result => {
            res.redirect('/');
        }).catch(err => {
            console.log(err);
            res.status(400).send("Unable to save data");
        });

    });



// controllers



// Listen
app.listen(4000, () => {
    console.log('Server listing on 3000');
})