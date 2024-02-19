const { Op } = require("sequelize");
const { Roles } = require("../models");

exports.index = async (req, res) => {
  const roles = await Roles.findAll();
  res.json(roles);
};

exports.show = async (req, res) => {
  const id = req.params.id;
  const roles = await Roles.findByPk(id);
  if (!roles) {
    return res.status(404).json({
      message: "role not found",
    });
  }

  return res.json(roles);
};

exports.store = async (req, res) => {
  try {
    const { role, description } = req.body;

    if (!role || !description) {
      return res.status(400).json({
        message: "failed to created",
      });
    }

    const cekRoles = await Roles.findOne({
      where: {
        [Op.or]: [{ role: role }, { description: description }],
      },
    });

    if (cekRoles != null) {
      return res.status(400).json({
        message: "role or description exist",
      });
    }

    const uuid = require("uuid");
    let randomId = uuid.v4();

    let cekId = await Roles.findByPk(randomId);

    for (let i = 0; i < cekId; i++) {
      randomId;
    }

    const roles = await Roles.create({
      id: randomId,
      role,
      description,
    });

    return res.status(200).json({
      message: "success created",
    });
  } catch ({ error }) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

exports.destroy = async (req, res) => {
  const id = req.params.id;

  const role = await Roles.findByPk(id);

  if (!role) {
    return res.status(404).json({
      message: "Role not found",
    });
  }

  await role.destroy();
  return res.status(200).json({
    message: "success deleted",
  });
};
