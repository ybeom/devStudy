const path = require("path");
const express = require("express");
const router = express.Router();
const rootDir = require("../util/path");

const products = [];

router.get("/add-product", (req, res, next) => {
    res.sendFile(path.join(rootDir, "views", "add-product.html"));
});

router.post("/add-product", (req, res, next) => {
    const { title } = req.body;
    products.push({ title: title });
    res.redirect("/");
});

module.exports = {
    routes: router,
    products: products,
};
