const cron = require("node-cron");
const fs = require("fs");
const path = require("path");

const archive = require("./data/archive.json");

const houseKeepingTask = () => {
  console.log("Running housekeeping task: ", new Date());

  try {
    archive.map((item, index) => {
      const presentDate = new Date().getTime();
      const recordDate = new Date(item.date).getTime();

      console.log(
        "The number of days: ",
        Math.floor((presentDate - recordDate) / (1000 * 60 * 60 * 24))
      );

      if (
        Math.floor((presentDate - recordDate) / (1000 * 60 * 60 * 24)) > 180
      ) {
        archive.splice(index, 1);

        fs.writeFileSync(
          path.join(__dirname, "./data/archive.json"),
          JSON.stringify(archive),
          "utf-8"
        );
      }
    });
  } catch (error) {
    console.log("Error: ", error);
  }
  console.log("Housekeeping task completed.");
};

cron.schedule("*/5 * * * * *", houseKeepingTask);
