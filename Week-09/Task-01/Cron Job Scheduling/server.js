const express = require("express");
const dotenv = require("dotenv").config();
const port = process.env.PORT || 5000;

const app = express();
app.use(express.json());

require("./schedular3");

app.listen(port, () => {
  console.log("Server running on port:", port);
});
