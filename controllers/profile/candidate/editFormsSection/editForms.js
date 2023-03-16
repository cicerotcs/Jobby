const client = require("../../../../db/connect");

const { selectUserWorkExperiencesById } = require("../../../../db/queries");

const getEditCandidateForm = async (req, res) => {
  const { id } = req.params;
  try {
    const dbRes = await client.query(selectUserWorkExperiencesById, [id]);
    const data = dbRes.rows[0];
    const { user_id, company_name, position } = data;

    res.render("forms/editRoleForm", {
      id,
      user_id,
      company_name,
      position,
    });
  } catch (error) {}
};

const editCandidateForm = async (req, res) => {};

module.exports = { getEditCandidateForm, editCandidateForm };
