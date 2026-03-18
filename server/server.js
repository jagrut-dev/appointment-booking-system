require("dotenv").config();
const express = require("express");
const pool = require("./lib/db");

const app = express();

pool.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.error("Database connection error:", err.message);
  } else {
    console.log("Database connected:", res.rows[0]);
  }
});

app.listen(process.env.PORT, () => {
  console.log("Server running on port", process.env.PORT);
});
