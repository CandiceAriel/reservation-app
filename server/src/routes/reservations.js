const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get("/", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM reservations ORDER BY created_at DESC"
    );

    res.json(result.rows);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const {
      customer_name,
      phone,
      reservation_date,
      reservation_time,
      guests,
    } = req.body;

    const result = await pool.query(
      `
      INSERT INTO reservations
      (
        customer_name,
        phone,
        reservation_date,
        reservation_time,
        guests
      )
      VALUES ($1,$2,$3,$4,$5)
      RETURNING *
      `,
      [
        customer_name,
        phone,
        reservation_date,
        reservation_time,
        guests,
      ]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await pool.query(
      "DELETE FROM reservations WHERE id = $1",
      [req.params.id]
    );

    res.json({
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

module.exports = router;