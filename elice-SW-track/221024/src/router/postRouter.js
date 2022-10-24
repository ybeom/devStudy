const express = require("express");
const { postController } = require("../controller");
const { postMiddleware } = require("../middleware");

const postRouter = express.Router();

postRouter.post("/", postMiddleware.checkCompletePostForm("body"), postController.postPost);

module.exports = postRouter;
