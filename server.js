const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const client = require("./db/connect");
require("dotenv").config();
const session = require("express-session");
const candidateAuthRouter = require("./routes/auth/candidates/auth");
const employerAuthRouter = require("./routes/auth/employers/auth");

const app = express();

app.set("view engine", "ejs");
app.use(expressLayouts);
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const sess = {
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7, //week
  },
};

if (app.get("env") === "production") {
  app.set("trust proxy", 1); // trust first proxy
  sess.cookie.secure = true; // serve secure cookies
}

app.use(session(sess));

const port = process.env.PORT || 5000;

app.use("/candidate", candidateAuthRouter);
app.use("/employer", employerAuthRouter);

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/jobs", (req, res) => {
  res.render("pages/jobs/all-jobs-result");
});

app.get("/jobs/:id", (req, res) => {
  res.render("pages/jobs/job-details");
});

app.get("/employers", (req, res) => {
  res.render("pages/employers/index");
});

async function init() {
  try {
    await client.connect();
    app.listen(port, console.log(`Server running on port ${port}`));
  } catch (error) {
    console.log(error);
  }
}

init();
