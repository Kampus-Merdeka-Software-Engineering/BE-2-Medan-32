const path = require("path");
const filePathNews = path.join(__dirname, "../controller/news.json");
const fs = require("fs");
const fss = require("fs").promises;

const getAllnews = (req, res, next) => {
  let articles = [];
  fs.readFile(filePathNews, "utf8", (err, jsonString) => {
    if (err) {
      console.log("Error reading file from disk:", err);
      res.status(500).json({ error: "Error reading JSON file" });
      return;
    }
    try {
      articles = JSON.parse(jsonString);
      res.json({ articles });
    } catch (err) {
      console.log("Error parsing JSON string:", err);
      res.status(500).json({ error: "Error parsing JSON string" });
    }
  });
};

const getNewsByCategory = async (req, res, next) => {
  const category = req.params.category;

  try {
    const data = await fss.readFile(filePathNews, { encoding: "utf8" });
    const articles = JSON.parse(data);
    const filteredArticles = articles.filter(
      (articles) => articles.category === category
    );

    res.json(filteredArticles);
  } catch (error) {
    console.error("Error reading file:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getNewsBySearch = async (req, res) => {
  const searchKeywords = req.params.keyword;

  try {
    const data = await fss.readFile(filePathNews, { encoding: "utf8" });
    const articles = JSON.parse(data);

    // Filter articles
    const filteredArticles = articles.filter(
      (articles) =>
        articles.title.includes(searchKeywords) ||
        articles.description.includes(searchKeywords)
    );

    res.json(filteredArticles);
  } catch (error) {
    console.error("Error reading file:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getAllnews,
  getNewsByCategory,
  getNewsBySearch,
};
