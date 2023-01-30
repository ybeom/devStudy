const path = require("path");
const express = require("express");
const app = express();
const { adminData, shopRouter } = require("./routes");

app.set("view engine", "pug");
app.set("views", "views");

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminData.routes);
app.use("/", shopRouter);

app.use("/", (req, res, next) => {
    console.log(path.dirname(require.main.filename));
    res.status(404);
    res.sendFile(path.join(__dirname, "views", "404.html"));
});

app.listen(3001);
