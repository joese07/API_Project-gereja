const { User, UserRoles, userroles, Roles } = require("../models");
const { ResetPassword } = require("../models");

exports.index = async (req, res) => {
  const user = await User.findAll({
    include: {
      model: UserRoles,
      as: "userroles",
      include: {
        model: Roles,
        as: "roles",
      },
    },
  });

  const cekUser = user.map((data) => {
    const dataUser = {
      id: data.id,
      nama: data.nama_lengkap,
      email: data.email,
      wilayah_lingkungan: data.wilayah_lingkungan,
      tanggal_lahir: data.tanggal_lahir,
      createdAt: data.createdAt,
      updateAt: data.updatedAt,
      userroles:
        data.userroles[0] == null ? null : data.userroles[0].roles.description,
    };
    return dataUser;
  });

  res.status(200).json(cekUser);
};

exports.show = async (req, res) => {
  const id = req.params.id;

  const user = await User.findOne({
    where: { id: id },
    include: {
      model: UserRoles,
      as: "userroles",
      include: {
        model: Roles,
        as: "roles",
      },
    },
  });

  if (!user) {
    return res.status(404).json({
      message: "Data not found",
    });
  }

  const dataUser = {
    id: user.id,
    nama: user.nama_lengkap,
    email: user.email,
    wilayah_lingkungan: user.wilayah_lingkungan,
    tempat_lahir: user.tempat_lahir,
    tanggal_lahir: user.tanggal_lahir,
    alamat: user.alamat,
    picture: user.picture,
    createdAt: user.createdAt,
    updateAt: user.updatedAt,
    password: user.password,
    userroles:
      user.userroles[0] == null ? null : user.userroles[0].roles.description,
  };

  return res.json(dataUser);
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
    res.status(400).json({
      message: error,
    });
  }
};

exports.register = async (req, res) => {
  try {
    const user = await User.register(req.body);

    // const idRoles = await UserRoles.findOne({
    //   where: {
    //     iduser: user.id,
    //   },
    // });

    // if (!idRoles) {
    //   return res.status(400).json({
    //     message: "check your data user",
    //   });
    // }

    const { id, email } = user;
    // const role = idRoles.idroles;
    res.json({
      id,
      email,
      accessToken: user.generateToken(),
    });
  } catch (error) {
    res.status(422).json({ error });
  }
};

exports.login = async (req, res) => {
  try {
    const user = await User.authenticate(req.body);

    const idRoles = await UserRoles.findOne({
      where: {
        iduser: user.id,
      },
    });

    if (!idRoles) {
      return res.status(400).json({
        message: "Login Failed, check your data",
      });
    }

    const { id, email } = user;

    const role = idRoles.idroles;

    res.json({
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

exports.changePictureProfile = async (req, res) => {
  const { id, picture } = req.body;

  const idUser = await User.findByPk(id);
  if (!idUser) {
    return res.status(404).json({
      message: "not found",
    });
  }

  try {
    update_PhotoProfile = await User.update(
      {
        picture,
      },
      {
        where: {
          id: id,
        },
      }
    );

    return res.status(200).json({
      message: "Success",
    });
  } catch ({ error }) {
    return res.status(422).json({
      message: "Something Wrong..",
    });
  }
};
exports.whoami = async (req, res) => {
  const idRoles = await UserRoles.findOne({
    where: {
      iduser: req.user.id,
    },
  });

  const role = idRoles.idroles;
  // console.log(role);
  const { password, ...currentUser } = req.user.dataValues;
  res.json({ data: currentUser, roleid: role });
};

exports.destroy = async (req, res) => {
  const id = req.params.id;

  const dataUser = await User.findByPk(id);
  const RolesUser = await UserRoles.findOne({
    where: { iduser: id },
  });

  try {
    if (!dataUser && !RolesUser) {
      return res.status(404).json({
        message: "data not found",
      });
    } else {
      await dataUser.destroy();
      await UserRoles.destroy({
        where: {
          iduser: id,
        },
      });
      return res.status(200).json({ message: "sucess deleted" });
    }
  } catch (err) {
    return res.status(422).json({
      message: "delete failed",
    });
  }
};
