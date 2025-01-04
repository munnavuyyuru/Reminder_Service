const express = require("express");
const bodyparser = require("body-parser");

const app = express();
const { PORT } = require("./config/serverConfig");

const setupAndStartServer = () => {
  app.use(bodyparser.json());
  app.use(bodyparser.urlencoded({ extended: true }));

  app.listen(PORT, async () => {
    console.log(`server started at port ${PORT}`);
  });
};

setupAndStartServer();
