// npm i nodemon -g
// npm init
// npm i date-fns
// npm i nodemon -D
// npm i uuid
// npm rm nodemon -D

// console.log("Testing");

const { format } = require("date-fns");
const { v4: uuid } = require("uuid");

const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");

const logEvents = async (message, logName) => {
  const dateTime = `${format(new Date(), "yyyy-MM-dd\tHH:mm:ss")}`;
  const logItem = `${dateTime}\t${uuid()}\t${message}`;
  console.log(logItem);

  try {
    if (!fs.existsSync(path.join(__dirname, "logs"))) {
      await fsPromises.mkdir(path.join(__dirname, "logs"));
    }
    await fsPromises.appendFile(
      path.join(__dirname, "logs", logName),
      `${logItem}\n`
    );
  } catch (err) {
    console.error(err);
  }
};

module.exports = logEvents;
