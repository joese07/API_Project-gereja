const { Renungan } = require("../models");

exports.index = async (req, res) => {
  const renungan = await Renungan.findAll();
  res.json(renungan);
};

exports.show = async (req, res) => {
  const id = req.params.id;

  const renungan = await Renungan.findByPk(id);
  if (!renungan) {
    return res.status(404).json({
      message: "Data renungan not found",
    });
  }

  return res.json(renungan);
};

exports.store = async (req, res) => {
  const {
    judul,
    isi,
    foto,
    status,
    author,
    is_validation,
    date_validation,
    validation,
  } = req.body;
  if (!judul || !isi || !foto || !author) {
    return res.status(400).json({
      message: "failed to create new renungan",
    });
  }

  const uuid = require("uuid");
  let randomId = uuid.v4();

  let cekId = await Renungan.findByPk(randomId);

  for (let i = 0; i < cekId; i++) {
    randomId;
  }

  const renungan = await Renungan.create({
    id: randomId,
    judul,
    isi,
    foto,
    status,
    author,
    is_validation: false,
    date_validation: null,
    validation: null,
  });

  return res.status(201).json(renungan);
};

exports.update = async (req, res) => {
  const id = req.params.id;

  const renungan = await Renungan.findByPk(id);

  if (!renungan) {
    return res.status(404).json({
      message: "Renungan is not found",
    });
  }

  const {
    judul,
    isi,
    foto,
    status,
    author,
    is_validation,
    validation,
    date_validation,
  } = req.body;

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
      message: "Something wrong..",
    });
  }

  return res.status(201).json({
    message: "berhasil update data",
  });
};

exports.activeContent = async (req, res) => {
  const { id, status } = req.body;

  const checkId = await Renungan.findByPk(id);
  const checkAll = await Renungan.findAll({
    where: {
      status: true,
    },
  });

  if (!checkId) {
    return res.status(404).json({
      message: "id not found",
    });
  }

  console.log(checkAll.length);

  if (
    checkId.dataValues.status == true ||
    (checkId.dataValues.status == false && checkAll.length < 1)
  ) {
    try {
      update_Renungan = await Renungan.update(
        {
          status,
        },
        {
          where: {
            id: id,
          },
        }
      );
    } catch ({ error }) {
      return res.status(422).json({
        message: "Something wrong...",
      });
    }
    const dataActive = await Renungan.findByPk(id);
    return res.status(201).json({
      message: "Successfull",
      data: dataActive.dataValues.status,
    });
  } else if (checkId.dataValues.status == false && checkAll.length >= 1) {
    return res.status(422).json({
      message: "Error",
    });
  } else {
    return res.status(422).json({
      message: "Something wrong...",
    });
  }
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
