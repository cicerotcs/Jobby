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
} = require("../../../db/queries");

const getCandidateProfilePage = async (req, res) => {
  if (req.session.authorized && req.session.userId) {
    try {
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

module.exports = {
  getCandidateProfilePage,
  postCandidateSummary,
  addCandidateRole,
  addCandidateEducation,
};
