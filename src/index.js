const express = require("express");
const bodyparser = require("body-parser");

const app = express();
const { PORT } = require("./config/serverConfig");
const { sendBasicEmail } = require("./service/email-service");

const setupAndStartServer = () => {
  app.use(bodyparser.json());
  app.use(bodyparser.urlencoded({ extended: true }));

  app.listen(PORT, async () => {
    console.log(`server started at port ${PORT}`);

    sendBasicEmail(
      "support@gmail.com",
      "xyz@gmail.com",
      "This is a test email",
      "Hey, how are you, I hope you like the support"
    );
  });
};

setupAndStartServer();
