const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const client = require("./db/connect");

const candidateSignupRouter = require("./routes/auth/candidates/candidate");

const app = express();

app.set("view engine", "ejs");
app.use(expressLayouts);
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const port = process.env.PORT || 5000;

app.use("/candidate", candidateSignupRouter);

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
