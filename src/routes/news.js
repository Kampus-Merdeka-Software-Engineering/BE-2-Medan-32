const express = require("express");
const path = require("path");
const router = express.Router();
const newsController = require("../controller/news");

router.get("/news", newsController.getAllNews);
router.get("/news/search", newsController.getNewsBySearch); //API/news/search?keyword=(pencariannya)
router.get("/news/other", newsController.getOtherNews); //API/news/other?limit=5
router.get("/news/latest", newsController.getLatestNews);//API/news/latest?limit=3
router.get("/news/:id", newsController.detailNews);
router.get("/news/:id/other", newsController.getOtherNewsOnArticle); //API/news/(id)/other?limit=5
router.get("/news/category/:category", newsController.getNewsByCategory);

router.get("/news/db/newsdb", newsController.newsToDb);
router.delete("/news/db/newsdb", newsController.deleteNewsDb);

module.exports = router;
