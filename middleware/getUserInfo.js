const client = require("../db/connect");

async function getUserInfo(req, res, next) {
  const { authorized } = req.session;
  res.locals.candidate = {};
  res.locals.employer = {};
  if (authorized) {
    if (req.session.userId) {
      let sql = "select name, email from users where id=$1";
      const dbRes = await client.query(sql, [req.session.userId]);
      res.locals.candidate = dbRes.rows[0];
      next();
    }
    if (req.session.employerId) {
      let sql = "select company_name, email from employers where id=$1";
      const dbRes = await client.query(sql, [req.session.employerId]);
      res.locals.employer = dbRes.rows[0];
      next();
    }
  } else {
    next();
  }
}

module.exports = getUserInfo;
