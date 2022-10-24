const { Post } = require("./model");

const postDAO = {
    async create({ title, content, author }) {
        const board = new Post({ title, content, author });
        await Post.save();
        return board.toObject();
    },
};
