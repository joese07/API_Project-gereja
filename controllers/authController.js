const { User } = require("../models");
const { ResetPassword } = require("../models");
const user = require("../models/user");

exports.index = async (req, res) => {
  const user = await User.findAll({});
  res.status(200).json(user);
};

exports.changePassword = async (req, res) => {
  try {
    const user = await User.changePassword_user(req.body);
    res.json({
      user,
    });
  } catch (error) {
    res.status(400).json({ error });
  }
};

exports.forgetPassword = async (req, res) => {
  try {
    const user = await User.forgetPassword_user(req.body);
    const { id, newPassword, confirmPassword } = req.body;
    if (!id || !newPassword || !confirmPassword) {
      return res.status(400).json({
        message: "Failed change password",
      });
    }

    return res.json({
      user,
    });
  } catch (error) {
    res.status(400).json({ error });
  }
};

exports.register = async (req, res) => {
  try {
    const user = await User.register(req.body);
    const { id, username } = user;
    res.json({
      id,
      username,
      accessToken: user.generateToken(),
    });
  } catch (error) {
    res.status(422).json({ error });
  }
};

exports.login = async (req, res) => {
  try {
    const user = await User.authenticate(req.body);
    const { id, username } = user;
    res.json({
      id,
      username,
      accessToken: user.generateToken(),
    });
  } catch (error) {
    res.status(400).json({ error });
  }
};

exports.checkEmailForgot = async (req, res) => {
  try {
    const dataEmail = await User.checkEmailForgotPassword(req.body);
    const { id } = dataEmail.dataEmail;
    const { email, kode_reset, expired, active } = req.body;
    if (!email || !kode_reset || !expired || !active) {
      return res.status(400).json({
        message: "Failed to send code",
      });
    }

    const dataResetPassword = await ResetPassword.create({
      id_user: id,
      email,
      kode_reset,
      expired,
      active,
    });

    return res.json({
      message: "Send code successfull",
    });
  } catch (error) {
    res.json({ message: "Failed to send code" });
  }
};

exports.whoami = (req, res) => {
  const { password, ...currentUser } = req.user.dataValues;
  res.json(currentUser);
};
