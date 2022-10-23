const path = require("path");
const express = require("express");
const app = express();

const { adminRouter, shopRouter } = require("./routes");

app.use(express.urlencoded({ extended: false }));

app.use("/admin", adminRouter);
app.use("/", shopRouter);

app.use("/", (req, res, next) => {
    console.log(path.dirname(require.main.filename));
    res.status(404);
    res.sendFile(path.join(__dirname, "views", "404.html"));
});

app.listen(3001);
