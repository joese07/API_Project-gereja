const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ResetPassword extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ResetPassword.belongsTo(models.User, {
        foreignKey: "id_user",
        as: "user",
      });
      // define association here
    }

    static async reset_pass({ kode_reset }) {
      try {
        const now = new Date();
        const expiredDate = new Date();

        expiredDate.setFullYear(now.getFullYear());
        expiredDate.setMonth(now.getMonth());
        expiredDate.setDate(now.getDate());
        expiredDate.setHours(now.getHours());
        expiredDate.setMinutes(now.getMinutes());
        expiredDate.setSeconds(now.getSeconds());
        const expires = expiredDate;
        const dataToken = await this.findOne({
          where: { kode_reset },
        });

        if (!dataToken) {
          return Promise.reject({
            message: "token invalid, check your token",
            code: "auth/token-invalid",
          });
        } else if (dataToken.active == false) {
          return Promise.reject({
            message: "token invalid, check your token",
            code: "auth/token-invalid",
          });
        } else if (now.getTime() > dataToken.expired.getTime()) {
          return Promise.reject({
            message: "token invalid, check your token",
            code: "auth/token-invalid",
          });
        }

        const updateStatus = await this.update(
          {
            active: false,
          },
          {
            where: {
              id: dataToken.id,
            },
          }
        );

        return Promise.resolve({
          dataToken,
          message: "token valid",
          code: "auth/token-valid",
        });
      } catch (err) {
        return Promise.reject(err);
      }
    }
  }

  ResetPassword.init(
    {
      id_user: DataTypes.STRING,
      email: DataTypes.STRING,
      kode_reset: DataTypes.STRING,
      expired: DataTypes.DATE,
      active: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "ResetPassword",
    }
  );
  return ResetPassword;
};
