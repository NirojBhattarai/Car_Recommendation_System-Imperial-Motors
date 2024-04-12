const express = require("express");
const pool = require("../db");
const router = express.Router();
const bodyParser = require("body-parser");

router.use(bodyParser.json());

function cosineSimilarity(car1, car2) {
  if (!car1.price || !car2.price) {
  return 0;
  }
  car1.price = parseFloat(car1.price);
  car2.price = parseFloat(car2.price);
  car1.fuelEfficiency = parseInt(car1.fuelEfficiency);
  car2.fuelEfficiency = parseInt(car2.fuelEfficiency);
  car1.comfortLevel = parseInt(car1.comfortLevel);
  car2.comfortLevel = parseInt(car2.comfortLevel);
  car1.year = parseInt(car1.year);
  car2.year = parseInt(car2.year);

  // Calculate dot product
  let dotProduct = 0;
  let magnitude1 = 0;
  let magnitude2 = 0;

  const numericAttributes = ["price", "fuelEfficiency", "comfortLevel", "year"];

  for (const attribute of numericAttributes) {
    dotProduct += car1[attribute] * car2[attribute];
    magnitude1 += car1[attribute] * car1[attribute];
    magnitude2 += car2[attribute] * car2[attribute];
  }

  magnitude1 = Math.sqrt(magnitude1);
  magnitude2 = Math.sqrt(magnitude2);

  // Calculate cosine similarity
  const similarity = dotProduct / (magnitude1 * magnitude2);
  return similarity;
 
}

router.get("/:carId", async (req, res) => {
  try {
    const carId = req.params.carId;

    // Fetch features of the selected car from the database
    const selectedCarQuery = "SELECT * FROM cars WHERE car_id = $1";
    const selectedCarResult = await pool.query(selectedCarQuery, [carId]);
    const selectedCar = selectedCarResult.rows[0];

    // Fetch all cars from the database
    const allCarsQuery = "SELECT * FROM cars";
    const allCarsResult = await pool.query(allCarsQuery);
    const allCars = allCarsResult.rows;

    // Calculate similarity between the selected car and all other cars
    const similarities = allCars.map((cars) => ({
      id: cars.car_id,
      similarity: cosineSimilarity(selectedCar, cars),
      details: cars, // Include all car details
    }));

    // Sort cars by similarity in descending order
    similarities.sort((a, b) => b.similarity - a.similarity);

    // Return top 5 recommended cars (excluding the selected car itself)
    const recommendedCars = similarities.slice(1, 6);

    res.json(recommendedCars);
  } catch (error) {
    console.error("Error fetching content-based recommendations:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
