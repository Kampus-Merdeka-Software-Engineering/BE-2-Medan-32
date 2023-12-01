const express = require("express");
const router = express.Router();
const path = require("path");
const filePathNews = path.join(__dirname, "news.json");
const fs = require("fs");

router.get("/news", (req, res) => {
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
    }
  });
});

module.exports = router;
