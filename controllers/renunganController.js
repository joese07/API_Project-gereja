const { Renungan } = require("../models");

exports.index = async (req, res) => {
  const renungan = await Renungan.findAll();
  res.json(renungan);
};

exports.show = async (req, res) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) {
    return res.status(400).json({
      message: "ID must be a number",
    });
  }

  const renungan = await Renungan.findByPk(id);
  if (!renungan) {
    return res.status(404).json({
      message: "Data renungan not found",
    });
  }

  return res.json(renungan);
};

exports.store = async (req, res) => {
  const { judul, isi, foto, status, author } = req.body;
  if (!judul || !isi || !foto || !author) {
    return res.status(400).json({
      message: "failed to create new renungan",
    });
  }

  const renungan = await Renungan.create({
    judul,
    isi,
    foto,
    status,
    author,
  });

  return res.status(201).json(renungan);
};

exports.update = async (req, res) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) {
    return res.status(400).json({
      message: "Id must be a number",
    });
  }

  const renungan = await Renungan.findByPk(id);

  if (!renungan) {
    return res.status(404).json({
      message: "Renungan is not found",
    });
  }

  const { judul, isi, foto, status, author } = req.body;

  if (!judul || !isi || !foto || !author) {
    return res.status(400).json({
      message: "failed to edit data",
    });
  }
  try {
    updateRenungan = await Renungan.update(
      {
        judul,
        isi,
        foto,
        status,
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
      message: "Something wrong..",
    });
  }

  return res.status(201).json({
    message: "berhasil update data",
  });
};

exports.destroy = async (req, res) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) {
    return res.status(400).json({
      message: "ID must be a number",
    });
  }

  const renungan = await Renungan.findByPk(id);

  if (!renungan) {
    return res.status(404).json({
      message: "Data renungan not found",
    });
  }

  await renungan.destroy();
  return res.status(204).json({
    message: "Delete sucessful",
  });
};
