const express = require("express");
const pool = require("../db");
const router = express.Router();
const bodyParser = require("body-parser");
const multer = require("multer");


router.use(bodyParser.json());

// Configure multer middleware outside the route handler
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});

const upload = multer({ storage: storage }).single("image");

// POST endpoint to handle adding car data
router.post("/addcar", async (req, res) => {
  
  try {

    // Call the multer middleware to handle file upload
    upload(req, res, async (err) => {
      if (err) {
        // Multer error occurred
        console.error("Multer error:", err);
        return res.status(400).send("File upload error");
      }
      const imageUrl = `http://localhost:5000/uploads/${req.file.filename}`;
      console.log("File uploaded:", req.file);
      const {
        brand,
        name,
        model,
        year,
        fuelEfficiency,
        comfortLevel,
        price,
        description,
      } = req.body;
     

      // Insert data into PostgreSQL database
      const queryText =
        "INSERT INTO cars (brand, name, model, year, fuelEfficiency, comfortLevel, price, image, description) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)";
      const values = [
        brand,
        name,
        model,
        year,
        fuelEfficiency,
        comfortLevel,
        price,
        imageUrl,
        description,
      ];
      await pool.query(queryText, values);

      res.status(200).send("Car added successfully");
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Failed to add car" + error.message);
  }
});

module.exports = router;
