var cron = require("node-cron");

const sender = require("../config/emailConfig");
const emailService = require("../service/email-service");

const setupJobs = () => {
  cron.schedule("*/2 * * * *", async () => {
    // console.log("Running a job every 2 minutes")
    const respone = await emailService.fetchPendingEmail();
    respone.forEach((email) => {
      sender.sendMail(
        {
          from: "RemainderService@airline.com",
          to: email.recipientEmail,
          subject: email.subject,
          text: email.content,
        },
        async (err, data) => {
          if (err) {
            console.log(err);
          } else {
            console.log(data);
            await emailService.updateTicket(email.id, { status: "SUCCESS" });
          }
        }
      );
    });
    console.log(respone);
  });
};

module.exports = setupJobs;
