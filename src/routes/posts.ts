import express = require('express')
import { PostsRepo, upload, MulterFile } from '../domain/posts_repo';
const router = express.Router();
 

export function postsRouter(postsRepo : PostsRepo) {
    router.get("/", (req: express.Request, res: express.Response) => {
        postsRepo.getAllPosts().then(posts => {
            res.render('pages/index', { posts: posts });
        }).catch(err => {
            res.status(400).send("unable to get data");
        });
    });

    router.get("/deck", (req: express.Request, res: express.Response) => {
        res.render('pages/deck');
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


