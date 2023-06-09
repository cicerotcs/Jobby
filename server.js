const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const client = require("./db/connect");
require("dotenv").config();
const session = require("express-session");
const MemoryStore = require("memorystore")(session);
const candidateAuthRouter = require("./routes/auth/candidates/auth");
const employerAuthRouter = require("./routes/auth/employers/auth");

const candidateProfileRouter = require("./routes/profile/candidates/profile");
const employerProfileRouter = require("./routes/profile/employers/profile");

const getInfoMiddleware = require("./middleware/getUserInfo");

const { selectJob } = require("./db/queries");

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
    maxAge: 3600000, //hour
  },
  store: new MemoryStore({
    checkPeriod: 86400000, // prune expired entries every 24h
  }),
};

if (app.get("env") === "production") {
  app.set("trust proxy", 1); // trust first proxy
  sess.cookie.secure = true; // serve secure cookies
}

app.use(session(sess));

const port = process.env.PORT || 5000;

app.use(getInfoMiddleware);

app.use("/candidate", candidateAuthRouter);
app.use("/employer", employerAuthRouter);

app.use("/candidate", candidateProfileRouter);
app.use("/employer", employerProfileRouter);

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/jobs", (req, res) => {
  console.log(req.query);
  res.render("pages/jobs/all-jobs-result");
});

app.post("/search", async (req, res) => {
  const { what, where } = req.body;

  let sql =
    "SELECT * FROM job_postings WHERE title ILIKE $1 OR location ILIKE $2 OR description ILIKE $1";

  const result = await client.query(sql, ["%" + what + "%", "%" + where + "%"]);
  if (result.rowCount !== 0) {
    return res.render("pages/jobs/all-jobs-result", { result });
  }
  return res.status(404).send("<h1>Not found</h1>");
});

app.get("/jobs/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const dbRes = await client.query(selectJob, [id]);
    const job = dbRes.rows[0];
    let sessionId = null;
    if (req.session && req.session.employerId) {
      sessionId = req.session.employerId;
    }
    res.render("pages/jobs/job-details", { job, sessionId, id });
  } catch (error) {}
});

app.get("/employers", (req, res) => {
  res.render("pages/employers/index");
});

app.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    res.redirect("/");
  });
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
