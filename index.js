const express = require("express");
const path = require("path");
const cors = require("cors");
const PORT = process.env.PORT || 3000;

const app = express();

const newsRouter = require("./src/routes/news");
const commentRouter = require("./src/routes/comments");
const dbConnection = require("./src/config/database");
// const usersRouter = require("./src/routes/users");

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(newsRouter);
// app.use(commentRouter);
// app.use(usersRouter);

dbConnection
  .sync({ alter: true })
  .then(() => {
    console.log("Database connected");

    app.listen(PORT, () => {
      console.log(`Server running on port http://localhost:${PORT}`);
    });
  })
  .catch(() => console.log(`Unable to connect to databse: ${error}`));
// "0.0.0.0"
