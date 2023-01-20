const { ResetPassword } = require("../models");

exports.index = async (req, res) => {
  const dataResetPassword = await ResetPassword.findAll();
  res.json(dataResetPassword);
};

exports.c_resetPassword = async (req, res) => {
  try {
    const data = await ResetPassword.reset_pass(req.body);
    const { id_user } = data.dataToken;
    if (!id_user) {
      return res.json({
        message: "Code OTP invalid",
      });
    }
    return res.status(200).json({ id_user, message: "Code OTP Valid" });
  } catch (error) {
    return res.json({ error });
  }
};
