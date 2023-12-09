const express = require("express");
const path = require("path");
const router = express.Router();
const newsController = require("../controller/news");

router.get("/news", newsController.getAllNews);
router.get("/news/search", newsController.getNewsBySearch);
router.get("/news/:id", newsController.detailNews);
router.get("/news/category/:category", newsController.getNewsByCategory);

//bukan buat user
router.get("/news/db/newsdb", newsController.newsToDb);
router.delete("/news/db/newsdb", newsController.deleteNewsDb);

module.exports = router;
