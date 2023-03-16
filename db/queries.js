const candidateSignupQuery =
  "insert into users(name, email, password, user_type) values($1,$2,$3,$4);";

const employerSignupQuery =
  "insert into employers(company_name, email, password, user_type) values($1,$2,$3,$4);";

const selectUser = "select * from users where email=$1;";
const selectUserNameAndEmail = "select name, email from users where id=$1";
const selectEmployer = "select * from employers where email=$1;";

const selectUserSummary = "select * from user_about where user_id=$1";
const selectUserWorkExperiences =
  "select id, company_name,position, to_char(start_date, 'Mon DD YYYY') AS start_date_string, to_char(end_date, 'Mon DD YYYY') AS end_date_string from work_experiences where user_id=$1";

const selectUserWorkExperiencesById =
  "select user_id, company_name,position, to_char(start_date, 'Mon DD YYYY') AS start_date_string, to_char(end_date, 'Mon DD YYYY') AS end_date_string from work_experiences where id=$1";

const selectUserEducation =
  "select id,institution_name,degree,field_of_study,to_char(start_date, 'Mon DD YYYY') AS start_date_string,to_char(end_date, 'Mon DD YYYY') AS end_date_string from education where user_id=$1";
const selectUserSkills = "select * from skills where user_id=$1";

const updateSummary = "update user_about set about=$1 where user_id=$2";

const addRole =
  "INSERT INTO work_experiences (user_id, company_name, position, start_date, end_date) VALUES ($1, $2, $3, to_date($4, 'Mon YYYY'), to_date($5, 'Mon YYYY'));";

const addEducation =
  "INSERT INTO education (user_id, institution_name, degree, field_of_study, start_date, end_date) VALUES ($1, $2, $3,$4, to_date($5, 'Mon YYYY'), to_date($6, 'Mon YYYY'));";

const insertNewSkill =
  "insert into skills(user_id, skill_name) values($1, $2);";

const addJob =
  "insert into job_postings(title,description,company,location,salary_range,employer_id) values($1,$2,$3,$4,$5,$6);";

const getAllJobsByEmployerId =
  "select * from job_postings where employer_id=$1;";

const selectJob = "select * from job_postings where id=$1";

const editJobQuery =
  "update job_postings set title=$1, description=$2, company=$3, location=$4, salary_range=$5 where id=$6;";

const deleteJobQuery = "delete from job_postings where id=$1;";

module.exports = {
  candidateSignupQuery,
  selectUser,
  employerSignupQuery,
  selectEmployer,
  selectUserSummary,
  selectUserWorkExperiences,
  selectUserEducation,
  selectUserSkills,
  updateSummary,
  addRole,
  addEducation,
  selectUserWorkExperiencesById,
  addJob,
  getAllJobsByEmployerId,
  selectJob,
  editJobQuery,
  deleteJobQuery,
  selectUserNameAndEmail,
  insertNewSkill,
};
