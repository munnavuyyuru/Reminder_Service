const express = require("express");
const bodyparser = require("body-parser");

const app = express();
const { PORT } = require("./config/serverConfig");
const { sendBasicEmail } = require("./service/email-service");
var cron = require("node-cron");

const setupAndStartServer = () => {
  app.use(bodyparser.json());
  app.use(bodyparser.urlencoded({ extended: true }));

  app.listen(PORT, async () => {
    console.log(`server started at port ${PORT}`);

    // sendBasicEmail(
    //   "support@gmail.com",
    //   "xyz@gmail.com",
    //   "This is a test email",
    //   "Hey, how are you, I hope you like the support"
    // );

    cron.schedule("* * * * *", () => {
      console.log("running a task every minute");
    });
  });
};

setupAndStartServer();
