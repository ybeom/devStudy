const { postService } = require("../service");

const postController = {
    async postPost(req, res, next) {
        try {
            const { title, content, author } = req.body;
            const post = await postService.createPost({ title, content, author });
            res.status(201).json(utill.buildResponse(post));
        } catch (err) {
            next(err);
        }
    },
};

module.exports = postController;
