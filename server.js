const express = require("express");
const DB = require("./config/connection");
const routes = require('./routes')
const app = express();
const PORT = 3001;
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(routes)
DB.once("open", () => {
  app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
  });
});