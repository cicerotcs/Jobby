const express = require("express");

const {
  getCandidateSignupPage,
  postCandidateSignup,
} = require("../../../controllers/auth/candidates/candidate");

const router = express.Router();

router.get("/signup", getCandidateSignupPage);
router.post("/signup", postCandidateSignup);

module.exports = router;
