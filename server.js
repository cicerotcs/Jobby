const express = require("express");
const expressLayouts = require("express-ejs-layouts");

const app = express();

app.set("view engine", "ejs");
app.use(expressLayouts);
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/jobs", (req, res) => {
  res.render("pages/all-jobs-result");
});

app.listen(port, console.log(`Server running on port ${port}`));
