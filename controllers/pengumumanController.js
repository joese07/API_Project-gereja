const e = require("express");
const { Pengumuman } = require("../models");

exports.index = async (req, res) => {
  const pengumuman = await Pengumuman.findAll();
  res.json(pengumuman);
};

exports.show = async (req, res) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) {
    return res.status(400).json({
      message: "ID must be a number",
    });
  }

  const pengumuman = await Pengumuman.findByPk(id);
  if (!pengumuman) {
    return res.status(404).json({
      message: "Data Pengumuman not found",
    });
  }

  return res.json(pengumuman);
};

exports.store = async (req, res) => {
  const { nama, category, subcategory, isi, approved, author } = req.body;
  if (!nama || !category || !isi || !author) {
    return res.status(400).json({
      message: "Failed to create pengumuman",
    });
  }

  const pengumuman = await Pengumuman.create({
    nama,
    category,
    subcategory,
    isi,
    approved,
    author,
  });

  return res.status(201).json(pengumuman);
};

exports.update = async (req, res) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) {
    return res.status(400).json({
      message: "ID must be a number",
    });
  }

  const pengumuman = await Pengumuman.findByPk(id);

  if (!Pengumuman) {
    return res.status(404).json({
      message: "Pengumuman not found",
    });
  }

  const { nama, category, subcategory, isi, approved, author } = req.body;

  if (!nama || !category || !isi || !approved || !author) {
    return res.status(400).json({
      message: "Failed to edit data",
    });
  }

  try {
    updatePengumuman = await Pengumuman.update(
      {
        nama,
        category,
        subcategory,
        isi,
        approved,
        author,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
  } catch ({ error }) {
    return res.status(422).json({
      message: "somthing wrong..",
    });
  }

  return res.status(201).json({
    message: "Berhasil update data",
  });
};

exports.destroy = async (req, res) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) {
    return res.status(400).json({
      message: "Id Must be a number",
    });
  }

  const pengumuman = await Pengumuman.findByPk(id);

  if (!pengumuman) {
    return res.status(400).json({
      message: "data pengumuman not found",
    });
  }

  await pengumuman.destroy();
  return res.status(204).send();
};
