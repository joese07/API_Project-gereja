const { Model } = require("sequelize");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    static associate(models) {
      User.hasMany(models.ResetPassword, {
        foreignKey: "id_user",
        as: "resetpasswords",
      }),
        User.hasMany(models.UserRoles, {
          foreignKey: "iduser",
          as: "userroles",
        });
      // define association here
    }

    static async forgetPassword_user({ id, newPassword, confirmPassword }) {
      try {
        const user = await this.findOne({ where: { id } });
        if (!user) {
          return Promise.reject({
            message: "user not found !",
            code: "auth/userp-not-found",
          });
        }

        if (newPassword != confirmPassword) {
          return Promise.reject({
            message: "Confirm password Invalid",
            code: "auth/confirm-password-invalid",
          });
        }

        const encryptedPassword = await bcrypt.hash(newPassword, 10);
        const updatePassword = await this.update(
          {
            password: encryptedPassword,
          },
          {
            where: {
              id: user.id,
            },
          }
        );
        return Promise.resolve({
          message: "change password successfull",
          code: "auth/success-changed-pass",
        });
      } catch (err) {
        return Promise.reject(err);
      }
    }

    static async changePassword_user({
      email,
      password,
      newPassword,
      confirmPassword,
    }) {
      try {
        const user = await this.findOne({ where: { email } });
        if (!user) {
          return Promise.reject({
            message: "User not found!",
            code: "auth/user-not-found",
          });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          return Promise.reject({
            message: "Wrong old password",
            code: "auth/wrong-old-password",
          });
        }

        if (newPassword != confirmPassword) {
          return Promise.reject({
            message: "Confirm password Invalid",
            code: "auth/confirm-password-invalid",
          });
        }

        const encryptedPassword = await bcrypt.hash(newPassword, 10);
        const updatePassword = await this.update(
          {
            password: encryptedPassword,
          },
          {
            where: {
              id: user.id,
            },
          }
        );

        return Promise.resolve({
          message: "password changed",
          code: "auth/success-changed-pass",
        });
      } catch (err) {
        return Promise.reject(err);
      }
    }

    static async checkEmailForgotPassword({ email }) {
      try {
        const dataEmail = await this.findOne({ where: { email } });
        if (!dataEmail) {
          return Promise.reject({
            message: "email invalid, check your email",
            code: "auth/email-not-found",
          });
        }

        return Promise.resolve({
          dataEmail,
          message: "email valid",
          code: "auth/email-found",
        });
      } catch (err) {
        return Promise.reject(err);
      }
    }

    static async register({
      nama_lengkap,
      email,
      wilayah_lingkungan,
      password,
      tempat_lahir,
      tanggal_lahir,
      alamat,
      picture,
    }) {
      if (!email || !password) {
        return Promise.reject({
          message: "Failed to create new user",
          code: "auth/register-invalid",
        });
      }

      // const cekEmail = await this.findAll({
      //   where: {
      //     email: email,
      //   },
      // });

      // if (cekEmail.length > 0) {
      //   return Promise.reject({
      //     message: "Email telah terdaftar",
      //     code: "auth/register-invalid",
      //   });
      // }

      try {
        const encryptedPassword = await bcrypt.hash(password, 10);
        const uuid = require("uuid");
        let randomId = uuid.v4();

        let cekId = await this.findByPk(randomId);

        for (let i = 0; i < cekId; i++) {
          randomId;
        }

        const user = await this.create({
          id: randomId,
          nama_lengkap,
          email,
          wilayah_lingkungan,
          password: encryptedPassword,
          tempat_lahir,
          tanggal_lahir,
          alamat,
          picture,
        });
        return Promise.resolve(user);
      } catch (error) {
        if (error.name === "SequelizeUniqueConstraintError") {
          return Promise.reject({
            message: "User already exists",
            code: "auth/user-exists",
          });
        }
        return Promise.reject(error);
      }
    }

    static async authenticate({ email, password }) {
      try {
        const user = await this.findOne({
          attributes: {
            include: [
              [
                sequelize.literal(
                  `(SELECT "UserRoles".idroles FROM "UserRoles" WHERE "UserRoles".iduser="User".id)`
                ),
                "role",
              ],
            ],
          },
          where: { email },
        });
        if (!user) {
          return Promise.reject({
            message: "User not found!",
            code: "auth/user-not-found",
          });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          return Promise.reject({
            message: "Wrong password",
            code: "auth/wrong-password",
          });
        }

        // console.log(user.dataValues.role);
        return Promise.resolve(user);
      } catch (err) {
        return Promise.reject(err);
      }
    }

    generateToken() {
      const payload = {
        id: this.id,
        role: this.dataValues.role,
        email: this.email,
      };

      const rahasia = "Ini rahasia ga boleh disebar-sebar";
      const token = jwt.sign(payload, rahasia);
      return token;
    }
  }

  User.init(
    {
      nama_lengkap: DataTypes.STRING,
      email: DataTypes.STRING,
      wilayah_lingkungan: DataTypes.STRING,
      password: DataTypes.STRING,
      tempat_lahir: DataTypes.STRING,
      tanggal_lahir: DataTypes.DATEONLY,
      alamat: DataTypes.STRING,
      picture: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
