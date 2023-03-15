const candidateSignupQuery =
  "insert into users(name, email, password, user_type) values($1,$2,$3,$4);";

const employerSignupQuery =
  "insert into employers(company_name, email, password, user_type) values($1,$2,$3,$4);";

const selectUser = "select * from users where email=$1;";
const selectEmployer = "select * from employers where email=$1;";

module.exports = {
  candidateSignupQuery,
  selectUser,
  employerSignupQuery,
  selectEmployer,
};
