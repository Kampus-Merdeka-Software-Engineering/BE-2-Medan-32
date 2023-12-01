// const http = require("http");
const express = require("express");
const mainRouter = require("./routes/routes");

const app = express();
const PORT = 4000;
//coba komen
app.use(mainRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
