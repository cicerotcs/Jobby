const client = require("../../../db/connect");
const bcrypt = require("bcrypt");
const emailValidation = require("../../../helpers/emailValidation");
const { StatusCodes } = require("http-status-codes");

const candidateSignupQuery = require("../../../db/queries");

const getCandidateSignupPage = (req, res) => {
  res.render("pages/auth/signup/candidates/signup");
};

const postCandidateSignup = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    // use node flash messages
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "You need to provide a name, email and password" });
  }

  if (!emailValidation(email)) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "You need to provide a valid email" });
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
          .json({ msg: "you have been successfully signed up" });
      }
      //return res.redirect("/");
    } catch (error) {
      return res.status(StatusCodes.BAD_REQUEST).json(error.detail);
    }
  });
};

module.exports = {
  getCandidateSignupPage,
  postCandidateSignup,
};
