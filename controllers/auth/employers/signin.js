const client = require("../../../db/connect");
const bcrypt = require("bcrypt");

const { StatusCodes } = require("http-status-codes");
const { selectEmployer } = require("../../../db/queries");

const getEmployerSigninPage = async (req, res) => {
  if (req.session.authorized && req.session.employerId) {
    return res.redirect("/employer/profile");
  }
  return res.render("pages/auth/signin/employers/signin");
};

const postEmployerSignin = async (req, res) => {
  const { email, password: inputPassword } = req.body;

  try {
    if (!email || !inputPassword) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "You need to provide an email and password" });
    }

    const dbRes = await client.query(selectEmployer, [email]);
    if (dbRes.rowCount === 1) {
      const { id, password } = dbRes.rows[0];
      const match = await bcrypt.compare(inputPassword, password);
      if (match) {
        req.session.employerId = id;
        req.session.authorized = true;
        return res.status(StatusCodes.OK).redirect("/employer/profile");
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

module.exports = { getEmployerSigninPage, postEmployerSignin };
