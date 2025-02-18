const express = require("express");
const bodyparser = require("body-parser");

const app = express();
const { PORT } = require("./config/serverConfig");

const { sendBasicEmail } = require("./service/email-service");
const job = require("./utils/job");

const { subscribeMessage, createChannel } = require("./utils/messageQueue");
const { REMINDER_BINDING_KEY } = require("./config/serverConfig");

const TicketController = require("./controllers/ticket-controller");
const EmailService = require("./service/email-service");

const setupAndStartServer = async () => {
  app.use(bodyparser.json());
  app.use(bodyparser.urlencoded({ extended: true }));

  app.post("/api/v1/tickets", TicketController.create);

  const channel = await createChannel();
  subscribeMessage(channel, EmailService.testingQueue, REMINDER_BINDING_KEY);

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
