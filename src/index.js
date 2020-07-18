// Setup
var express = require('express');
var app = express();
var bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
posts = [];


// Routes
app.get("/", (req, res) => {
    // printContents();
    getAllPosts().then(posts => {
        res.render('index', { posts: posts });
    }).catch(err => {
        res.status(400).send("Unable to save data");
    });
});

app.post('/addpost', (req, res) => {
    addPost(req.body).then(result => {
        res.redirect('/');
    }).catch(err => {
        console.log(err);
        res.status(400).send("Unable to save data");
    });
});


fs = require('fs');
const { promisify } = require('util');
const { json } = require('body-parser');

const readdir = promisify(require('fs').readdir)

async function addPost(post) {
    fs.writeFile(`./data/posts/${Date.now()}`, JSON.stringify(post), function (err) {
        if (err) return console.log(err);
    });
}


async function getAllPosts() {
    files = await readdir(__dirname + "/../data/posts/");
    data = files.map((file) => JSON.parse(fs.readFileSync(__dirname + '/../data/posts/' + file).toString()))
    return data;
   }

// Listen
app.listen(3000, () => {
    console.log('Server listing on 3000');
})