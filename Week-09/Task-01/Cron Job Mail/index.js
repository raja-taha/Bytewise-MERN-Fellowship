const express = require("express");
const mongoose = require("mongoose");
const emailCron = require("./cron.js");

const app = express();

mongoose.connect("mongodb://localhost:27017/users", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});

emailCron.sendMailAllUser();
