const client = require("../../../db/connect");
const bcrypt = require("bcrypt");
const emailValidation = require("../../../helpers/emailValidation");
const { StatusCodes } = require("http-status-codes");

const { candidateSignupQuery } = require("../../../db/queries");

const getCandidateSignupPage = async (req, res) => {
  res.render("pages/auth/signup/candidates/signup");
};

const postCandidateSignup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "You need to provide a name, email and password!" });
    }

    if (!emailValidation(email)) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "You need to provide a valid email!" });
    }

    bcrypt.hash(password, 10, async function (err, hashedPassword) {
      try {
        const dbRes = await client.query(candidateSignupQuery, [
          name,
          email,
          hashedPassword,
          "candidate",
        ]);
        if (dbRes.rowCount === 1) {
          return res
            .status(StatusCodes.OK)
            .json({ msg: "you have been successfully signed up!" });
        }
      } catch (error) {
        if (error.code === "23505" && error.constraint === "users_email_key") {
          res
            .status(StatusCodes.BAD_REQUEST)
            .json({ msg: "Email already exists!" });
        } else {
          res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ msg: "Internal server error! Refresh the page!" });
        }
      }
    });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Internal server error! Refresh the page!" });
  }
};

module.exports = {
  getCandidateSignupPage,
  postCandidateSignup,
};
