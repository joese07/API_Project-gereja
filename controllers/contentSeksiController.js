const { Op } = require("sequelize");
const { Content_Seksi } = require("../models");

exports.index = async (req, res) => {
  const contentSeksi = await Content_Seksi.findAll();
  res.json(contentSeksi);
};

exports.show = async (req, res) => {
  const id = req.params.id;

  const contentSeksi = await Content_Seksi.findByPk(id);
  if (!contentSeksi) {
    return res.status(404).json({
      message: "Data not found",
    });
  }

  return res.json(contentSeksi);
};

exports.search = async (req, res) => {
  const { title, content } = req.body;
  const searchData = await Content_Seksi.findAll({
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
    status,
    author,
    seksi,
    is_validation,
    date_validation,
    validation,
  } = req.body;

  if (!title || !content || !picture || !author) {
    return res.status(400).json({
      message: "failed to create new data",
    });
  }

  const uuid = require("uuid");
  let randomId = uuid.v4();

  let cekId = await Content_Seksi.findByPk(randomId);

  for (let i = 0; i < cekId; i++) {
    randomId;
  }

  const contentSeksi = await Content_Seksi.create({
    id: randomId,
    title,
    content,
    picture,
    status,
    author,
    seksi,
    is_validation,
    date_validation,
    validation,
  });

  return res.status(201).json(contentSeksi);
};

exports.activeContent = async (req, res) => {
  const { id, status } = req.body;

  const updateActive = await Content_Seksi.findByPk(id);

  if (!updateActive) {
    return res.status(404).json({
      message: "cek data id",
    });
  }

  if (
    updateActive.dataValues.status == false &&
    updateActive.dataValues.is_validation == false
  ) {
    return res.status(422).json({
      message: "cek validation data",
    });
  }

  try {
    updatedContent_Seksi = await Content_Seksi.update(
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

  const dataActive = await Content_Seksi.findByPk(id);
  console.log(dataActive);

  return res.status(201).json({
    message: "Successfull",
    data: dataActive.dataValues.status,
  });
};

exports.update = async (req, res) => {
  const id = req.params.id;

  const contentSeksi = await Content_Seksi.findByPk(id);

  if (!contentSeksi) {
    return res.status(404).json({
      message: "content not found",
    });
  }

  const {
    title,
    content,
    picture,
    status,
    author,
    seksi,
    is_validation,
    date_validation,
    validation,
  } = req.body;

  if (!title || !content || !picture || !seksi) {
    return res.status(400).json({
      message: "failed to edit data",
    });
  }
  try {
    updatedContent_Seksi = await Content_Seksi.update(
      {
        title,
        content,
        picture,
        status,
        author,
        seksi,
        is_validation,
        date_validation,
        validation,
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
    message: "success update data",
  });
};

exports.destroy = async (req, res) => {
  const id = req.params.id;

  const contentSeksi = await Content_Seksi.findByPk(id);
  if (!contentSeksi) {
    return res.status(404).json({
      message: "data not found",
    });
  }

  await contentSeksi.destroy();
  return res.status(204).send();
};
