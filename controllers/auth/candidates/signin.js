const client = require("../../../db/connect");
const bcrypt = require("bcrypt");

const { StatusCodes } = require("http-status-codes");
const { selectUser } = require("../../../db/queries");

const getCandidateSigninPage = async (req, res) => {
  res.status(StatusCodes.OK).render("pages/auth/signin/candidates/signin");
};

const postCandidateSignin = async (req, res) => {
  const { email, password: inputPassword } = req.body;

  try {
    if (!email || !inputPassword) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "You need to provide an email and password" });
    }

    const dbRes = await client.query(selectUser, [email]);
    if (dbRes.rowCount === 1) {
      const { id, password } = dbRes.rows[0];
      const match = await bcrypt.compare(inputPassword, password);
      if (match) {
        req.session.userId = id;
        req.session.authorized = true;
        return res.status(StatusCodes.OK).redirect("/");
      } else {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ msg: "Wrong password!" });
      }
    } else {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "Email not found!" });
    }
  } catch (error) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Internal server error! Refresh the page" });
  }
};

module.exports = {
  getCandidateSigninPage,
  postCandidateSignin,
};
