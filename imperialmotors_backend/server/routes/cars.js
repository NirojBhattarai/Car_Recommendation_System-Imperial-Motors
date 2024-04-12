// cars.js

const express = require('express');
const pool = require("../db"); // Assuming this is your database connection pool

const router = express.Router();

// GET endpoint to fetch all cars
router.get("/sendcar", async (req, res) => {
  try {
    // Query database for all cars
    const { rows } = await pool.query('SELECT * FROM cars');

    // Send retrieved car data as JSON response
    res.json(rows);
  } catch (error) {
    console.error('Error fetching cars:', error);
    res.status(500).json({ error: 'Failed to fetch cars' });
  }
});

router.get("/sendcar/:car_id", async (req, res) => {
  const { car_id } = req.params;

  try {
    // Query database for the car with the specified ID
    const { rows } = await pool.query('SELECT * FROM cars WHERE car_id = $1', [car_id]);

    // Check if a car with the specified ID exists
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Car not found' });
    }

    // Send retrieved car data as JSON response
    res.json(rows[0]); // Assuming there's only one car with the specified ID
  } catch (error) {
    console.error('Error fetching car details:', error);
    res.status(500).json({ error: 'Failed to fetch car details' });
  }
});

module.exports = router;
