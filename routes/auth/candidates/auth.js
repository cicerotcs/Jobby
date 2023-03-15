const express = require("express");

const {
  getCandidateSignupPage,
  postCandidateSignup,
} = require("../../../controllers/auth/candidates/signup");

const {
  getCandidateSigninPage,
  postCandidateSignin,
} = require("../../../controllers/auth/candidates/signin");

const router = express.Router();

router.get("/signup", getCandidateSignupPage);
router.post("/signup", postCandidateSignup);

router.get("/signin", getCandidateSigninPage);
router.post("/signin", postCandidateSignin);

module.exports = router;
