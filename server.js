const express = require("express");
const logger = require("morgan");
const mustacheExpress = require("mustache-express");
const bodyParser = require("body-parser");
const session = require("express-session");
const path = require("path");

const sessionConfig = require("./sessionConfig");
const users = require("./data");
const checkAuth = require("./middlewares/checkAuth");

const app = express();
const port = process.env.PORT || 8000;