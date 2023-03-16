const { StatusCodes } = require("http-status-codes");
const client = require("../../../db/connect");

const {
  addJob,
  getAllJobsByEmployerId,
  editJobQuery,
  deleteJobQuery,
} = require("../../../db/queries");

const getEmployerProfilePage = async (req, res) => {
  if (req.session.authorized && req.session.employerId) {
    const dbRes = await client.query(getAllJobsByEmployerId, [
      req.session.employerId,
    ]);
    const jobs = dbRes.rows;
    return res.render("pages/dashboard/employer", { jobs });
  }
  return res.redirect("/employer/signin");
};

const postJob = async (req, res) => {
  const { jobTitle, jobDescription, jobCompany, jobLocation, jobSalary } =
    req.body;
  try {
    if (
      jobTitle == "" ||
      jobDescription == "" ||
      jobCompany == "" ||
      jobLocation == "" ||
      jobSalary == ""
    ) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "You need to provide all information" });
    }

    const dbRes = await client.query(addJob, [
      jobTitle,
      jobDescription,
      jobCompany,
      jobLocation,
      jobSalary,
      req.session.employerId,
    ]);

    if (dbRes.rowCount === 1) {
      res.status(StatusCodes.OK).json({ msg: "A new job has been added" });
    }
  } catch (error) {}
};

const editJob = async (req, res) => {
  const {
    jobTitle,
    jobDescription,
    jobCompany,
    jobLocation,
    jobSalary,
    jobId,
  } = req.body;

  try {
    if (
      jobTitle == "" ||
      jobDescription == "" ||
      jobCompany == "" ||
      jobLocation == "" ||
      jobSalary == ""
    ) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "You need to provide all information" });
    }

    const dbRes = await client.query(editJobQuery, [
      jobTitle,
      jobDescription,
      jobCompany,
      jobLocation,
      jobSalary,
      jobId,
    ]);

    if (dbRes.rowCount === 1) {
      res.status(StatusCodes.OK).json({ msg: "Job has been edited" });
    }
  } catch (error) {}
};

const deleteJob = async (req, res) => {
  const { id } = req.params;
  console.log(req.url);
  try {
    const dbRes = await client.query(deleteJobQuery, [id]);
    if (dbRes.rowCount === 1) {
      res.status(StatusCodes.OK).json({ msg: "job has been deleted" });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getEmployerProfilePage, postJob, editJob, deleteJob };
