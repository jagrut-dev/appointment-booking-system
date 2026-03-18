const express = require("express");
const router = express.Router();
const pool = require("../lib/db");

// Register User
router.post("/register", async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const newUser = await pool.query(
      "INSERT INTO users (name, email, password, role) VALUES ($1,$2,$3,$4) RETURNING *",
      [name, email, password, role]
    );

    res.json(newUser.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Error registering user");
  }
});

module.exports = router;