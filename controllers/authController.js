const { User } = require("../models");

exports.index = async (req, res) => {
  const user = await User.findAll({});
  res.status(200).json(user);
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

exports.whoami = (req, res) => {
  const { password, ...currentUser } = req.user.dataValues;
  res.json(currentUser);
};
