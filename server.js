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

app.post("/signup", (req, res) => {  //theory: this portion takes information from form, redirects to login page.
    let newUser = req.body;
    users.push(newUser);
    console.log("users: ", users);
    res.redirect("/login");
});

app.get("/login", (req, res) => {
    res.render("login");
});  ///this should render the login page, or does the above redirect do that?

app.post("/login", (req, res) => {
    let reqUsername = req.body.username;
    let reqPassword = req.body.password;

    let foundUser = users.find(user => user.username === reqUsername);
    if (!foundUser) {
        return res.render("signup", { errors: ["User not found"] });
    }

    if (foundUser.password === reqPassword) {
        delete foundUser.password;
        req.session.user = foundUser;
        res.redirect("/");
    } else {
        return res.render("login", { errors: ["Password does not match."] });
    }
});

app.get("/profile", checkAuth, (req, res) => {
    res.render("profile", { user: req.session.user });
});

app.listen(port, () => {
    console.log(`you are on port ${port}`);
});