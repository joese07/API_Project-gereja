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
      nama: data.nama_lengkap,
      email: data.email,
      tempat_lahir: data.tempat_lahir,
      tanggal_lahir: data.tanggal_lahir,
      alamat: data.alamat,
      picture: data.picture,
      createdAt: data.createdAt,
      updateAt: data.updatedAt,
      userroles: data.userroles[0].roles.description,
    };
    return dataUser;
  });
  console.log(cekUser);

  res.status(200).json(cekUser);
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
      id,
      role,
      email,
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
