const cron = require("node-cron");

const task = () => {
  console.log("Running a schedueled task at :", new Date());
};

// minute | hour | day of month | month | day of week
cron.schedule("*/5 * * * * *", task);
