const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require("express");
const hbs = require("hbs");
const mongoose = require("mongoose");
const logger = require("morgan");
const path = require("path");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const app = express();
const router = require("./routes/index");
const siteRouter = require("./routes/site-routes");
const registerHelpers = require("./loaders/hbs");

require("dotenv").config();

mongoose
  .connect(process.env.MONGODB_URI, { useNewUrlParser: true })

  // .connect("mongodb://localhost/spotted", { useNewUrlParser: true })
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });
// const app_name = require("./package.json").name;
// const debug = require("debug")(`${app_name}:${path.basename(__filename).split(".")[0]}`);

// Middleware Setup
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Authentication

app.use(
  session({
    // secret: "basic-auth-secret",
    secret: process.env.SESSION_SECRET,
    // cookie: { maxAge: 3600000 * 1 },	// 1 hour
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      ttl: 60 * 60 * 24 * 7 // Time to live - 7 days (14 days - Default)
    })
  })
);
app.use(cookieParser());

// Express View engine setup

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
app.use(express.static(path.join(__dirname, "public")));
registerHelpers(hbs);

// default value for title local
app.locals.title = "Express - Generated with IronGenerator";

app.use("/", router);
app.use("/", siteRouter); // Protected / Private routes

//Error handlers
// app.use((req, res, next) => {
//   const err = new Error("Not Found");
//   err.status = 404;
//   next(err);
// });

// app.listen(process.env.PORT);

module.exports = app;
