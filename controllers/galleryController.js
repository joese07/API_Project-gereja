const e = require("express");
const { Gallery } = require("../models");

exports.index = async (req, res) => {
  const gallery = await Gallery.findAll();

  res.json(gallery);
};

exports.store = async (req, res) => {
  const { judul, content, author } = req.body;
  if (!judul || !content || !author) {
    return res.status(400).json({
      message: " Failed to create new gallery",
    });
  }

  const gallery = await Gallery.create({
    judul,
    content,
    author,
  });

  return res.status(201).json(gallery);
};

exports.destroy = async (req, res) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) {
    return res.status(400).json({
      message: "ID must be a number",
    });
  }

  const gallery = await Gallery.findByPk(id);

  if (!gallery) {
    return res.status(404).json({
      message: "Data Gallery not found",
    });
  }

  await gallery.destroy();
  return res.status(204).send();
};
