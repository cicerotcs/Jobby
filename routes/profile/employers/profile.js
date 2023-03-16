const express = require("express");

const {
  getEmployerProfilePage,
  postJob,
  editJob,
  deleteJob,
} = require("../../../controllers/profile/employer/profile");

const router = express.Router();

router.get("/profile", getEmployerProfilePage);
router.post("/profile/job/new", postJob);
router.put("/profile/job/edit", editJob);
router.delete("/profile/job/:id", deleteJob);

module.exports = router;
