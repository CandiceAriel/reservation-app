const express = require('express');
const router = express.Router();
const pool = require('../db');

router.post('/', async (req, res) => {
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
      VALUES ($1, $2, $3, $4, $5)
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
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Failed to create reservation',
    });
  }
});

module.exports = router;