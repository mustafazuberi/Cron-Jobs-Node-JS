const express = require("express");
const dotenv = require("dotenv");
const port = process.env.PORT || 5001;
require('./scheduelar1.js')
require('./scheduelar2.js')
const app = express();
app.use(express.json());

app.listen(port, () => {
  console.log("Server is running at port :", port);
});
