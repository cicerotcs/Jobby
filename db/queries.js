const candidateSignupQuery =
  "insert into users(name, email, password, user_type) values($1,$2,$3,$4);";

module.exports = candidateSignupQuery;
