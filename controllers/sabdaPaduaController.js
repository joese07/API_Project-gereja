const e = require("express");
const { Sabda_Padua } = require("../models");
const { Op } = require("sequelize");

exports.index = async (req, res) => {
  const sabda_padua = await Sabda_Padua.findAll();
  res.json(sabda_padua);
};

exports.show = async (req, res) => {
  const id = req.params.id;
  // if (Number.isNaN(id)) {
  //   return res.status(400).json({
  //     message: "ID must be a number",
  //   });
  // }

  const sabda_padua = await Sabda_Padua.findByPk(id);
  if (!sabda_padua) {
    return res.status(404).json({
      message: "Data sabda padua not found",
    });
  }

  return res.json(sabda_padua);
};

exports.search = async (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).json({
      message: "please insert data",
    });
  }

  const searchData = await Sabda_Padua.findAll({
    where: {
      [Op.or]: [
        {
          title: {
            [Op.iLike]: `%${title}%`,
          },
        },
        {
          content: {
            [Op.iLike]: `%${content}%`,
          },
        },
      ],
    },
  });

  if (searchData == "") {
    return res.status(404).json({
      message: "data not found",
    });
  }

  return res.status(200).json({
    message: "successfull",
    data: searchData,
  });
};

exports.store = async (req, res) => {
  const {
    title,
    content,
    picture,
    author,
    is_validation,
    date_validation,
    validation,
  } = req.body;
  if (!title || !content || !picture || !author) {
    return res.status(400).json({
      message: "failed to create new sabda-padua",
    });
  }

  const uuid = require("uuid");
  let randomId = uuid.v4();

  let cekId = await Sabda_Padua.findByPk(randomId);

  // let cekId = '6b33bafb-6f2c-4c14-ab2e-8a5b1ee5472c';

  for (let i = 0; i < cekId; i++) {
    randomId;
  }

  const sabda_padua = await Sabda_Padua.create({
    id: randomId,
    title,
    content,
    picture,
    author,
    is_validation: false,
    date_validation: null,
    validation: null,
  });

  return res.status(201).json(sabda_padua);
};

exports.update = async (req, res) => {
  const id = req.params.id;
  // if (Number.isNaN(id)) {
  //   return res.status(400).json({
  //     message: "ID must be a number",
  //   });
  // }

  const sabda_padua = await Sabda_Padua.findByPk(id);

  if (!sabda_padua) {
    return res.status(404).json({
      message: "Sabda padua not found",
    });
  }

  const {
    title,
    content,
    picture,
    author,
    is_validation,
    validation,
    date_validation,
  } = req.body;

  if (!title || !content || !picture || !author) {
    return res.status(400).json({
      message: "Failed to Edit data",
    });
  }
  try {
    updatedSabda_Padua = await Sabda_Padua.update(
      {
        title,
        content,
        picture,
        author,
        is_validation,
        validation,
        date_validation,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
  } catch ({ error }) {
    return res.status(422).json({
      message: "Something Wrong..",
    });
  }

  return res.status(201).json({
    message: "Berhasil update data!",
  });
};

exports.destroy = async (req, res) => {
  const id = req.params.id;
  // if (Number.isNaN(id)) {
  //   return res.status(400).json({
  //     message: "ID Must be a number",
  //   });
  // }

  const sabda_padua = await Sabda_Padua.findByPk(id);

  if (!sabda_padua) {
    return res.status(404).json({
      message: "Data sabda-padua not found",
    });
  }

  await sabda_padua.destroy();
  return res.status(204).send();
};
