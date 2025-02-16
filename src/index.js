const express = require("express");
const bodyparser = require("body-parser");

const app = express();
const { PORT } = require("./config/serverConfig");
const { sendBasicEmail } = require("./service/email-service");
const job = require("./utils/job");
const TicketController = require("./controllers/ticket-controller");

const setupAndStartServer = () => {
  app.use(bodyparser.json());
  app.use(bodyparser.urlencoded({ extended: true }));

  app.post("/api/v1/tickets", TicketController.create);

  app.listen(PORT, async () => {
    console.log(`server started at port ${PORT}`);

    job();
    // sendBasicEmail(
    //   "support@gmail.com",
    //   "xyz@gmail.com",
    //   "This is a test email",
    //   "Hey, how are you, I hope you like the support"
    // );
  });
};

setupAndStartServer();
