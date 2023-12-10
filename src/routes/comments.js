const express = require("express");
const commentsController = require("../controller/comments");
const router = express.Router();

router.get("/comments", commentsController.getAllComments);
router.get("/news/:news_id/comments", commentsController.getAllCommentsByIdNews);
router.post("/news/:news_id/comments", commentsController.createCommentOnNews);

router.patch("/news/comments/:id", commentsController.editComment);
router.delete("/news/comments/:id", commentsController.deleteComment);

module.exports = router;
