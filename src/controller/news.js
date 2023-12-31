const path = require("path");
const filePathNews = path.join(__dirname, "../controller/news.json");
const { News } = require("../models/news");
const news = require("../models/news");
const fs = require("fs");
const { Sequelize } = require("sequelize");

const getAllNews = async (req, res, next) => {
  try {
    const allNews = await news.findAll();
    res.status(200).json(allNews);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: `Internal Server Error: ${err}` });
  }
};

const detailNews = async (req, res, next) => {
  const detailArticle = req.params.id;
  try {
    const filteredArticles = await news.findAll({
      where: {
        id: detailArticle,
      },
    });
    res.status(200).json(filteredArticles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Internal Server Error: ${error}` });
  }
};

const newsToDb = async (req, res, next) => {
  try {
    //untuk ambil file JSON
    const jsonData = fs.readFileSync(filePathNews, "utf8");
    const articlesData = JSON.parse(jsonData);

    //ngirim data JSON ke DB
    await news.bulkCreate(articlesData, { ignoreDuplicates: true });
    res.json({ message: "Successfully Send to DB" });
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({
      error: "Failed to read JSON file",
    });
  }
};

const deleteNewsDb = async (req, res) => {
  try {
    await news.destroy({
      where: {},
    });

    return res.status(200).json({ message: `News deleted` });
  } catch (error) {
    console.error("Query Error: ", error.message);
    res.status(500).json({ error: `Internal Server Error: ${error}` });
  }
};

const getNewsByCategory = async (req, res, next) => {
  const category = req.params.category;

  try {
    const filteredArticles = await news.findAll({
      where: {
        category: category,
      },
    });

    res.json(filteredArticles);
  } catch (error) {
    console.error("Query Error: ", error.message);
    res.status(500).json({ error: `Internal Server Error: ${error}` });
  }
};

const getNewsBySearch = async (req, res, next) => {
  const searchKeywords = req.query.keyword;

  try {
    const filteredArticles = await news.findAll({
      where: {
        [Sequelize.Op.or]: [
          { title: { [Sequelize.Op.like]: `%${searchKeywords}%` } },
          { description: { [Sequelize.Op.like]: `%${searchKeywords}%` } },
        ],
      },
    });

    res.json(filteredArticles);
  } catch (error) {
    console.error("Query Error: ", error.message);
    res.status(500).json({ error: `Internal Server Error: ${error}` });
  }
};

const getLatestNews = async (req, res, next) => {
  try {
    let limit = parseInt(req.query.limit) || 3;

    const latestNews = await news.findAll({
      limit: limit,
      order: [["publishedAt", "DESC"]],
    });

    res.json(latestNews);
  } catch (error) {
    console.error("Query Error: ", error.message);
    res.status(500).json({ error: `Internal Server Error: ${error}` });
  }
};

const getOtherNewsOnArticle = async (req, res, next) => {
  try {
    let limit = parseInt(req.query.limit) || 5;

    const otherNews = await news.findAll({
      where: {
        id: {
          [Sequelize.Op.not]: req.params.id, // Menghindari berita dengan ID yang sedang diakses
        },
      },
      order: [Sequelize.literal('RAND()')], // Mengambil berita secara acak
      limit: limit,
    });
    res.status(200).json(otherNews);
  } catch (error) {
    console.error("Query Error: ", error.message);
    res.status(500).json({ error: `Internal Server Error: ${error}` });
  }
}

const getOtherNews = async (req, res, next) => {
  try {
    let limit = parseInt(req.query.limit) || 5;

    const otherNews = await news.findAll({
      order: [Sequelize.literal('RAND()')], // Mengambil berita secara acak
      limit: limit,
    });
    res.status(200).json(otherNews);
  } catch (error) {
    console.error("Query Error: ", error.message);
    res.status(500).json({ error: `Internal Server Error: ${error}` });
  }
}

module.exports = {
  getAllNews,
  detailNews,
  getNewsByCategory,
  getNewsBySearch,
  getLatestNews,
  getOtherNews,
  getOtherNewsOnArticle,
  newsToDb,
  deleteNewsDb,
};
