const express = require("express");

const {
  getCandidateProfilePage,
  postCandidateSummary,
  addCandidateRole,
  addCandidateEducation,
} = require("../../../controllers/profile/candidate/profile");

const {
  getEditCandidateForm,
  editCandidateForm,
} = require("../../../controllers/profile/candidate/editFormsSection/editForms");

const router = express.Router();

router.get("/profile", getCandidateProfilePage);

router.put("/profile/summary", postCandidateSummary);

router.post("/profile/role/new", addCandidateRole);

router.get("/profile/role/:id/edit", getEditCandidateForm);
router.put("/profile/role/:id/edit", editCandidateForm);

router.post("/profile/education/new", addCandidateEducation);

module.exports = router;
