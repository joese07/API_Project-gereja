const e = require("express");
const { Berita } = require("../models");

exports.index = async (req, res) => {
  const berita = await Berita.findAll();
  res.json(berita.reverse());
};

exports.show = async (req, res) => {
  const id = req.params.id;

  const berita = await Berita.findByPk(id);
  if (!berita) {
    return res.status(404).json({
      message: "Data berita not found",
    });
  }

  return res.json(berita);
};

exports.store = async (req, res) => {
  try {
    const { title, content, picture, author, category, periode } = req.body;
    if (!title || !content || !picture || !author || !category || !periode) {
      return res.status(400).json({
        message: "Failed to created",
      });
    }

    const uuid = require("uuid");
    let randomId = uuid.v4();

    let cekId = await Berita.findByPk(randomId);

    for (let i = 0; i < cekId; i++) {
      randomId;
    }

    const berita = await Berita.create({
      id: randomId,
      title,
      content,
      picture,
      author,
      periode,
      category,
    });

    return res.status(200).json({
      message: "successfully created",
    });
  } catch ({ error }) {
    return res.status(400).json({
      message: "Something Wrong " + error.message,
    });
  }
};

exports.update = async (req, res) => {
  const id = req.params.id;

  const berita = await Berita.findByPk(id);

  if (!berita) {
    return res.status(404).json({
      message: "Berita not found",
    });
  }

  const { title, content, picture, category, author, periode } = req.body;

  if (!title || !content || !picture || !category || !author || !periode) {
    return res.status(400).json({
      message: "Failed to Edit data",
    });
  }

  try {
    update_berita = await Berita.update(
      {
        title,
        content,
        category,
        picture,
        author,
        periode,
      },
      {
        where: {
          id: id,
        },
      }
    );
  } catch ({ error }) {
    return res.status(422).json({
      message: "Something Wrong..",
    });
  }

  return res.status(201).json({
    message: "update data successfull!",
  });
};

exports.destroy = async (req, res) => {
  const id = req.params.id;

  const berita = await Berita.findByPk(id);

  if (!berita) {
    return res.status(404).json({
      message: "Data not found",
    });
  }

  try {
    await berita.destroy();
    return res.status(204).json({
      message: "delete successfull",
    });
  } catch ({ error }) {
    return res.status(400).json({
      message: "Something wrong",
    });
  }
};
