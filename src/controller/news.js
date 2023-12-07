const path = require("path");
const filePathNews = path.join(__dirname, "../controller/news.json");
const news = require("../models/news");
const fs = require("fs");
const { Sequelize } = require("sequelize");
const fss = require("fs").promises;

const getAllNews = async (req, res, next) => {
  try {
    const allNews = await news.findAll();
    res.status(200).json(allNews);
  } catch (err) {
    console.error(err);
    // Jangan lupa untuk menangani kesalahan dan memberikan respons yang sesuai
    res.status(500).json({ error: `Internal Server Error: ${err}` });
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
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getNewsBySearch = async (req, res, next) => {
  const searchKeywords = req.params.keyword;

  try {
    const filteredArticles = await news.findAll({
      where: {
        [Sequelize.Op.or]: [
          { title: { [Sequelize.Op.like]: `%${searchKeywords}%` } },
          { description: { [Sequelize.Op.like]: `%${searchKeywords}%` } }
        ]
      }
    });

    res.json(filteredArticles);
  } catch (error) {
    console.error("Query Error: ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = {
  getAllNews,
  newsToDb,
  getNewsByCategory,
  getNewsBySearch,
};
