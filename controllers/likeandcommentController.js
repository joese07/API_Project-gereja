const e = require("express");
const { Like_and_Comment, Berita, sequelize } = require("../models");

exports.index = async (req, res) => {
  const likeAndComment = await Like_and_Comment.findAll();
  res.json(likeAndComment);
};

exports.show = async (req, res) => {
  const id = req.params.id;

  const likeAndComment = await Like_and_Comment.findByPk(id);
  if (!likeAndComment) {
    return res.status(404).json({
      message: "data not found",
    });
  }

  return res.json(likeAndComment);
};

exports.showbyIdContent = async (req, res) => {
  const id = req.params.id;

  const dataLikeContent = await Like_and_Comment.findAll({
    where: {
      idContent: id,
    },
  });

  if (!dataLikeContent) {
    return res.status(404).json({
      message: "data not found",
    });
  }

  return res.json(dataLikeContent);
};
exports.store = async (req, res) => {
  try {
    const { idContent, countLike, ip, comment } = req.body;
    if (!idContent || !ip || !comment) {
      return res.status(400).json({
        message: "failed to create",
      });
    }

    let cekIdContent = await Berita.findByPk(idContent);
    let cekIpContent = await Like_and_Comment.findAll({
      where: {
        ip: ip,
        idContent: idContent,
      },
    });

    if (!cekIdContent) {
      return res.status(404).json({
        message: "content not found",
      });
    } else if (cekIpContent.length > 0) {
      const cekdataContent = cekIpContent[0].dataValues.id;
      const content = await Like_and_Comment.findByPk(cekdataContent);
      if (!content) {
        return res.status(404).json({
          message: "data not found",
        });
      }

      await content.destroy();
      const dataCount = await Like_and_Comment.findAll({
        where: {
          idContent: idContent,
        },
      });
      return res.status(201).json({
        data: { count: dataCount.length },
        message: "anda unlike postingan",
      });
    } else {
      const uuid = require("uuid");
      let randomId = uuid.v4();

      let cekId = await Like_and_Comment.findByPk(randomId);

      for (let i = 0; i < cekId; i++) {
        randomId;
      }

      const likeAndComment = await Like_and_Comment.create({
        id: randomId,
        idContent,
        countLike,
        ip,
        comment,
      });

      const dataCount = await Like_and_Comment.findAll({
        where: {
          idContent: idContent,
        },
      });

      return res.status(200).json({
        data: { count: dataCount.length },
        message: "anda like postingan",
      });
    }
  } catch ({ error }) {
    return res.status(400).json({
      message: "something wrong " + error,
    });
  }
};
