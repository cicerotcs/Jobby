const express = require("express");

const {
  getEmployerSignupPage,
  postEmployerSignup,
} = require("../../../controllers/auth/employers/signup");

const {
  getEmployerSigninPage,
  postEmployerSignin,
} = require("../../../controllers/auth/employers/signin");

const router = express.Router();

router.get("/signup", getEmployerSignupPage);
router.post("/signup", postEmployerSignup);

router.get("/signin", getEmployerSigninPage);
router.post("/signin", postEmployerSignin);

module.exports = router;
