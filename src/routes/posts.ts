import express = require('express')
import { PostsRepo, upload, MulterFile } from '../domain/posts_repo';
const router = express.Router();
import passport = require('passport');

import { RequestWithUser } from '../custom_req'

export function postsRouter(postsRepo: PostsRepo) {
    router.get("/", (req: express.Request, res: express.Response) => {
        postsRepo.getAllPosts().then(posts => {
            res.render('pages/index', { posts: posts });
        }).catch(err => {
            res.status(400).send("unable to get data");
        });
    });

    router.get("/deck", (req: RequestWithUser, res: express.Response) => {
        if (req.user) {
            res.render('pages/deck');
        } else {
            res.render('pages/login')
        }
    });

    router.post('/login',
        passport.authenticate('local'),
        function (req, res) {
            // If this function gets called, authentication was successful.
            // `req.user` contains the authenticated user.
            res.redirect('/deck');
        });

    router.get("/about", (req: express.Request, res: express.Response) => {
        res.render('pages/about');
    });

    router.post('/addpost', upload.single("file"),
        (req: express.Request & { file: MulterFile }, res: express.Response) => {
            postsRepo.addPost(req).then(result => {
                res.redirect('/');
            }).catch(err => {
                console.log(err);
                res.status(400).send("Unable to save data");
            });

        });
    return router;
}