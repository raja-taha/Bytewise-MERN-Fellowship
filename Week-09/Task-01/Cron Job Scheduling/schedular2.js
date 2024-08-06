const cron = require("node-cron");
const fs = require("fs");
const path = require("path");

const invoices = require("./data/invoice.json");

const archiveInvoicesTask = () => {
  console.log("Running archive invoices task: ", new Date());

  try {
    const paidInvoices = invoices.filter((item) => {
      return item.status === "paid";
    });

    if (paidInvoices.length > 0) {
      paidInvoices.forEach((item) => {
        invoices.splice(
          invoices.findIndex((e) => e.status === item.status),
          1
        );
      });
      fs.writeFileSync(
        path.join(__dirname, "./data/invoice.json"),
        JSON.stringify(invoices),
        "utf-8"
      );
      fs.writeFileSync(
        path.join(__dirname, "./data/archive.json"),
        JSON.stringify(paidInvoices),
        "utf-8"
      );
    }
  } catch (error) {
    console.log("Error: ", error);
  }
  console.log("Archive invoices task completed.");
};

cron.schedule("*/5 * * * * *", archiveInvoicesTask);
