const e = require("express");
const { Sabda_Padua } = require("../models");

exports.index = async (req, res) => {
  const sabda_padua = await Sabda_Padua.findAll();
  res.json(sabda_padua);
};

exports.show = async (req, res) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) {
    return res.status(400).json({
      message: "ID must be a number",
    });
  }

  const sabda_padua = await Sabda_Padua.findByPk(id);
  if (!sabda_padua) {
    return res.status(404).json({
      message: "Data sabda padua not found",
    });
  }

  return res.json(sabda_padua);
};

exports.store = async (req, res) => {
  const { title, content, picture } = req.body;
  if (!title || !content || !picture) {
    return res.status(400).json({
      message: "failed to create new sabda-padua",
    });
  }

  const sabda_padua = await Sabda_Padua.create({ title, content, picture });
  return res.status(201).json(sabda_padua);
};

exports.update = async (req, res) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) {
    return res.status(400).json({
      message: "ID must be a number",
    });
  }

  const sabda_padua = await Sabda_Padua.findByPk(id);

  if (!sabda_padua) {
    return res.status(404).json({
      message: "Sabda padua not found",
    });
  }

  const { title, content, picture } = req.body;

  if (!title || !content || !picture) {
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
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
  } catch ({ error }) {
    return res.status(422).json({
      message: "Username/email already exist",
    });
  }

  return res.status(201).json({
    message: "Berhasil update data!",
  });
};

exports.destroy = async (req, res) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) {
    return res.status(400).json({
      message: "ID Must be a number",
    });
  }

  const sabda_padua = await Sabda_Padua.findByPk(id);

  if (!sabda_padua) {
    return res.status(404).json({
      message: "Data sabda-padua not found",
    });
  }

  await sabda_padua.destroy();
  return res.status(204).send();
};
