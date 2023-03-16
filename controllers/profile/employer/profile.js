const getEmployerProfilePage = (req, res) => {
  if (req.session.authorized && req.session.employerId) {
    return res.render("pages/dashboard/employer");
  }
  return res.redirect("/employer/signin");
};

module.exports = { getEmployerProfilePage };
