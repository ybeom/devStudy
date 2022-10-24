const { postDAO } = require("../data-access");

const postService = {
    async createPost({ title, content, author }) {
        const createdPost = await postDAO.create({
            title,
            content,
            author,
        });
        return createdPost;
    },
};

module.exports = postService;
