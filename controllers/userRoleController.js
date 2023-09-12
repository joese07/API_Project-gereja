const { UserRoles, User, Roles } = require("../models");
const { Op } = require("sequelize");

exports.index = async (req, res) => {
  const datauser = await UserRoles.findAll();
  res.json(datauser);
};

exports.store = async (req, res) => {
  try {
    const { iduser, idroles } = req.body;

    if (!iduser || !idroles) {
      return res.status(400).json({
        message: "failed to created",
      });
    }

    const cekUserId = await User.findByPk(iduser);
    if (!cekUserId) {
      return res.status(404).json({
        message: "user not found",
      });
    }

    const cekRoleID = await Roles.findByPk(idroles);
    if (!cekRoleID) {
      return res.status(404).json({
        message: "roles not found",
      });
    }

    const cekExistRoleId = await UserRoles.findAll({
      where: {
        iduser,
      },
    });

    if (cekExistRoleId.length > 0) {
      return res.status(400).json({
        message: "user and role exist, check your data",
      });
    }

    const uuid = require("uuid");
    let randomId = uuid.v4();

    let cekId = await UserRoles.findByPk(randomId);

    for (let i = 0; i < cekId; i++) {
      randomId;
    }

    const usersRoles = await UserRoles.create({
      id: randomId,
      iduser,
      idroles,
    });

    return res.status(200).json({
      message: "success created",
    });
  } catch ({ error }) {
    return res.status(400).json({
      message: "error",
    });
  }
};
