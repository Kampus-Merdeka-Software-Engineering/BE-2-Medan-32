const Comments = require("../models/comments.js");
const { news_id } = require("../models/news.js");
const News = require("../models/news.js");
const Sequelize = require("sequelize");

const getAllComments = async (req, res, next) => {
  try {
    const allComment = await Comments.findAll();
    res.status(200).json(allComment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Internal Server Error: ${error}` });
  }
};

const getAllCommentsByIdNews = async (req, res, next) => {
  const { news_id } = req.params;

  try {
    const news = await News.findByPk(news_id);
    if (!news) {
      return res.status(404).json({ error: "News not found" });
    }

    const comments = await Comments.findAll({
      where: {
        news_id: news_id,
      },
    });

    res.status(200).json(comments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Internal Server Error: ${error}` });
  }
};

const createCommentOnNews = async (req, res, next) => {
  try {
    const { news_id } = req.params;
    const { name, email, comment } = req.body;

    const news = await News.findByPk(news_id);
    if (!news) {
      return res.status(404).json({ error: "News not found" });
    }

    const newComment = await Comments.create({
      name,
      email,
      comment,
      news_id: news_id,
    });

    res.status(201).json(newComment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Internal Server Error: ${error}` });
  }
};

const editComment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, email, comment } = await req.body;

    if (!name || !email || !comment) {
      return res.status(400).json({error:'Name, Email, and Comment must be provided'});
    }

    const updatedComment = await Comments.update(
      {
        name,
        email,
        comment,
      },
      {
        where: {
          id: id,
        },
      }
    );

    if (updatedComment[0] === 1){
      return res.status(200).json({message: "Comment updated successfully"});
    }else{
      return res.status(404).json({error: `Comment not found: ${error}`});
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Internal Server Error: ${error}` });
  }
};

const deleteComment = async (req, res, next) => {
  try {
    
  } catch (error) {
    
  }
};

module.exports = {
  getAllComments,
  getAllCommentsByIdNews,
  createCommentOnNews,
  editComment,
  deleteComment,
};
