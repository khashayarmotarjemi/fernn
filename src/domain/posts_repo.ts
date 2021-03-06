import multer = require('multer');
import path = require('path');
import fs = require('fs');
import { Post } from '../domain/models'
import express = require('express');

const { promisify } = require('util');
const readdir = promisify(require('fs').readdir)
const writeFile = promisify(require('fs').writeFile)

export class PostsRepo {
    private saveFile(req: express.Request & { file: MulterFile }, fileName: string) {

        const tempPath = req.file.path;
        const targetPath = path.join(__dirname, `/../../public/images/${fileName}.png`);

        if (path.extname(req.file.originalname).toLowerCase() === ".png") {
            fs.rename(tempPath, targetPath, err => {
                if (err) { console.log(err); return err; };
                return;
            });
        } else {
            fs.unlink(tempPath, err => {
                if (err) { console.log(err); return err; };
                return;
            });
        }
    }

    async addPost(req: express.Request & { file: MulterFile }) {


        let error: boolean = false;

        let fileName = Date.now().toString();

        const post : Post = new Post(req.body.title, req.body.content,fileName);


        await writeFile(__dirname + `/../../public/posts/${fileName}`,
            JSON.stringify(post),
            function (err) {
                if (err) return err;
            });

        return this.saveFile(req, fileName);
    }

    async getAllPosts(): Promise<Post[]> {
        let files = await readdir(__dirname + "/../../public/posts");
        let data = files.map((file: string) => JSON.parse(fs.readFileSync(__dirname + '/../../public/posts/' + file).toString()))
        let posts = data.map((post) => new Post(post.title, post.content,post.date));

        return posts;
    }
}

export interface MulterFile {
    key: string // Available using `S3`.
    path: string // Available using `DiskStorage`.
    mimetype: string
    originalname: string
    size: number
}

export const upload = multer({
    dest: __dirname + "/../../public/tmp"
});