const express = require("express");
const logger = require("morgan");
const mustacheExpress = require("mustache-express");
const bodyParser = require("body-parser");
const session = require("express-session");
const path = require("path");
const port = process.env.PORT || 8000;

const sessionConfig = require("./sessionConfig");
const users = require("./data");
const checkAuth = require("./middlewares/checkAuth");

const app = express();

//TEMPLATE ENGINES
app.engine("mustache", mustacheExpress());
app.set("views", "./views");
app.set("view engine", "mustache");

//MIDDLEWARES
app.use(express.static(path.join(__dirname, "./public")));  //access to css
app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session(sessionConfig));

app.get("/", (req, res) => {   //when root("/") is entered into the browser, it requests a response (????)
    console.log("1");
    res.render("home");
})

app.get("/signup", (req, res) => {
    console.log("only when signup is pressed");
    res.render("signup");
});


app.listen(port, () => {
    console.log(`you are on port ${port}`);
});