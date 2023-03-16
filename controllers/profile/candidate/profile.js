const { StatusCodes } = require("http-status-codes");
const client = require("../../../db/connect");
const {
  selectUserSummary,
  selectUserWorkExperiences,
  selectUserEducation,
  selectUserSkills,
  updateSummary,
  addRole,
  addEducation,
  selectUserNameAndEmail,
  insertNewSkill,
} = require("../../../db/queries");

const getCandidateProfilePage = async (req, res) => {
  if (req.session.authorized && req.session.userId) {
    try {
      const user = await client.query(selectUserNameAndEmail, [
        req.session.userId,
      ]);

      const summary = await client.query(selectUserSummary, [
        req.session.userId,
      ]);
      const work_experience = await client.query(selectUserWorkExperiences, [
        req.session.userId,
      ]);

      const education = await client.query(selectUserEducation, [
        req.session.userId,
      ]);
      const skills = await client.query(selectUserSkills, [req.session.userId]);

      return res.render("pages/dashboard/candidate", {
        summary: summary.rows[0],
        work_experience,
        education,
        user: user.rows[0],
        skills,
      });
    } catch (error) {}
  }
  return res.redirect("/candidate/signin");
};

const postCandidateSummary = async (req, res) => {
  const { summaryText } = req.body;
  try {
    const dbRes = await client.query(updateSummary, [
      summaryText,
      req.session.userId,
    ]);
    if (dbRes.rowCount === 1) {
      res.status(StatusCodes.OK).json({ msg: "Summary has been updated." });
    }
  } catch (error) {}
};

const addCandidateRole = async (req, res) => {
  const { jobTitle, companyName, startedMonthAndYear, endedMonthAndYear } =
    req.body;

  try {
    if (
      !jobTitle ||
      !companyName ||
      !startedMonthAndYear ||
      !endedMonthAndYear
    ) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "You need to provide all the fields" });
    }

    const dbRes = await client.query(addRole, [
      req.session.userId,
      jobTitle,
      companyName,
      startedMonthAndYear,
      endedMonthAndYear,
    ]);
    if (dbRes.rowCount === 1) {
      res.status(StatusCodes.OK).json({ msg: "New role added." });
    }
  } catch (error) {}
};

const addCandidateEducation = async (req, res) => {
  const {
    institution,
    course,
    courseField,
    startedMonthAndYear,
    endedMonthAndYear,
  } = req.body;

  try {
    if (
      !institution ||
      !course ||
      !courseField ||
      !startedMonthAndYear ||
      !endedMonthAndYear
    ) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "You need to provide all the fields" });
    }

    const dbRes = await client.query(addEducation, [
      req.session.userId,
      institution,
      course,
      courseField,
      startedMonthAndYear,
      endedMonthAndYear,
    ]);
    if (dbRes.rowCount === 1) {
      res.status(StatusCodes.OK).json({ msg: "New education added." });
    }
  } catch (error) {}
};

const addCandidateSkill = async (req, res) => {
  const { skillName } = req.body;

  try {
    if (!skillName) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "You need to proovide all fields" });
    }

    const dbRes = await client.query(insertNewSkill, [
      req.session.userId,
      skillName,
    ]);

    if (dbRes.rowCount === 1) {
      return res.status(StatusCodes.OK).json({ msg: "New skill added." });
    }
  } catch (error) {
    console.log(error);
  }
};

const getRecommendedJobs = async (req, res) => {
  console.log(req.session.userId);

  const selectUserSkills = "SELECT skill_name FROM skills WHERE user_id = $1";
  const selectUserJobs =
    "SELECT * FROM job_postings WHERE title ILIKE $1 OR description ILIKE $1";

  try {
    const skills = await client.query(selectUserSkills, [req.session.userId]);

    const recommendedJobs = await Promise.all(
      skills.rows.map(async (skill) => {
        const result = await client.query(selectUserJobs, [
          `%${skill.skill_name}%`,
        ]);
        return result.rows;
      })
    );

    res.render("components/candidate-profile/recommended-jobs", {
      jobs: recommendedJobs.flat(),
    });
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  getCandidateProfilePage,
  postCandidateSummary,
  addCandidateRole,
  addCandidateEducation,
  addCandidateSkill,
  getRecommendedJobs,
};
