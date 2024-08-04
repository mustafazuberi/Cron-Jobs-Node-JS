const cron = require("node-cron");
const fs = require("fs");
const path = require("path");

const invoices = require("./data/invoice.json");

const archiveInvoicesTask = () => {
  console.log("running archive invoice task");
  try {
    const paidInvoices = invoices.filter((item) => item.status === "paid");

    if (paidInvoices.length) {
      paidInvoices.forEach((item) => {
        const invoiceIndexInAllInvoices = invoices.findIndex(
          (e) => e.id === item.id
        );
        invoices.splice(invoiceIndexInAllInvoices, 1);
      });

      fs.writeFileSync(
        path.join(__dirname, "./", "data", "invoice.json"),
        JSON.stringify(invoices),
        "utf-8"
      );

      let existingArchivedInvoices = [];
      const archiveFilePath = path.join(
        __dirname,
        "./",
        "data",
        "archive.json"
      );
	  
      if (fs.existsSync(archiveFilePath)) {
        const archiveData = fs.readFileSync(archiveFilePath, "utf-8");
        const parsedArchiveData = JSON.parse(archiveData);

        if (Array.isArray(parsedArchiveData) && parsedArchiveData.length) {
          existingArchivedInvoices = JSON.parse(archiveData);
        }
      }

      const updatedArchivedInvoices = [
        ...existingArchivedInvoices,
        ...paidInvoices,
      ];

      fs.writeFileSync(
        archiveFilePath,
        JSON.stringify(updatedArchivedInvoices),
        "utf-8"
      );
    }
  } catch (error) {
    console.log(error);
  }
};

cron.schedule("*/30 * * * * *", archiveInvoicesTask);
