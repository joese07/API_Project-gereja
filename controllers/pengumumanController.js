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
  const { nama, category, subcategory, isi, link, approved, author } = req.body;
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
    link,
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

  if (!pengumuman) {
    return res.status(404).json({
      message: "Pengumuman not found",
    });
  }

  const { nama, category, subcategory, isi, link, approved, author } = req.body;

  if (!nama || !category || !isi || !author) {
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
        link,
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
      message: "something wrong..",
    });
  }

  return res.status(201).json({
    message: "Berhasil update data",
  });
};

exports.activeContent = async (req, res) => {
  const { id, approved } = req.body;

  const checkId = await Pengumuman.findByPk(id);
  const checkAll = await Pengumuman.findAll({
    where: {
      approved: true,
    },
  });

  if (!checkId) {
    return res.status(404).json({
      message: "Id not found",
    });
  }

  try {
    update_Pengumuman = await Pengumuman.update(
      {
        approved,
      },
      {
        where: {
          id: id,
        },
      }
    );
  } catch ({ error }) {
    return res.status(422).json({
      message: " 2 Something wrong...",
    });
  }
  const dataActive = await Pengumuman.findByPk(id);
  return res.status(201).json({
    message: "successfull",
    data: dataActive.dataValues.approved,
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
