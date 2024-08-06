const User = require("./models/userModel");
const cron = require("node-cron");
const nodemailer = require("nodemailer");
const config = require("./config/config");

const setMailToAllUsers = async (emails) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    requireTLS: true,
    auth: {
      user: config.emailUser,
      pass: config.emailPassword,
    },
  });

  const mailOptions = {
    from: "Cron Project",
    to: emails,
    subject: "Cron Test Main",
    text: "Cron Project Test",
    html: "<p>Cron Project Test</p>",
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending mail: ", error);
    } else {
      console.log("Email sent: ", info.response);
    }
  });
};

const sendMailAllUser = async () => {
  try {
    cron.schedule("*/10 * * * * *", async () => {
      const users = await User.find({});

      if (users.length > 0) {
        const emails = users.map((user) => user.email);
        setMailToAllUsers(emails);
      }
    });
  } catch (error) {
    console.error("Error: ", error);
  }
};

module.exports = { sendMailAllUser };
