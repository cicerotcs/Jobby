const express = require("express");

const {
  getEmployerProfilePage,
} = require("../../../controllers/profile/employer/profile");

const router = express.Router();

router.get("/profile", getEmployerProfilePage);

module.exports = router;
