const fs = require("fs");

// fs.mkdir("./new", (err) => {
//   if (err) throw err;
//   console.log("Directory created successfully!");
// });

if (!fs.existsSync("./new")) {
  fs.mkdir("./new", (err) => {
    if (err) throw err;
    console.log("Directory created successfully!");
  });
}

if (fs.existsSync("./new")) {
  fs.rmdir("./new", (err) => {
    if (err) throw err;
    console.log("Directory deleted successfully!");
  });
}
