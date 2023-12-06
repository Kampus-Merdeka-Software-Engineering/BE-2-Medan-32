const express = require("express");
const path = require('path');
const cors = require('cors');
const PORT = process.env.PORT || 4000;

const app = express();

const newsRouter = require('./src/routes/news');
const commentRouter = require("./src/routes/comments");
const usersRouter = require("./src/routes/users");

app.use(express.json());
app.use(cors());

app.use(newsRouter);
app.use(commentRouter);
app.use(usersRouter);

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});

// "0.0.0.0"