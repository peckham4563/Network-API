const express = require("express");
const DB = require("./config/connection");
const app = express();
const PORT = 3001;
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
DB.once("open", () => {
  app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
  });
});
