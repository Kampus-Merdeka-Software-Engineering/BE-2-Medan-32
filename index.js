const express = require("express");
const news = require("./src/models/news");
const comments = require("./src/models/comments");
const path = require("path");
const cors = require("cors");
require("dotenv").config();

const PORT = process.env.PORT || 4000;

const app = express();
app.use(cors());

const newsRouter = require("./src/routes/news");
const commentRouter = require("./src/routes/comments");
const dbConnection = require("./src/config/database");
const feedBackController = require("./src/routes/feedBack");
// const usersRouter = require("./src/routes/users");

app.use(express.json());

app.get("/", (req, res, next) => {
  res.send("Hello World!");
});

app.use(newsRouter);
app.use(commentRouter);
app.use(feedBackController);
// app.use(usersRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

comments.belongsTo(news, {
  foreignKey: "news_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
news.hasMany(comments, {
  foreignKey: "news_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

dbConnection
  .sync({ alter: true })
  .then(() => {
    console.log("Database connected");
    console.log(PORT);

    app.listen(PORT, () => {
      console.log(`Server running on port http://localhost:${PORT}`);
    });
  })
  .catch((error) => console.log(`Unable to connect to databse: ${error}`));
// "0.0.0.0"
