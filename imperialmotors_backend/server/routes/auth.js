const express = require("express");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");
const JWT_SECRET = "Neeerajisafullstackdeveloper";
const pool = require("../db");

//Create a User : POST Method "/api/auth/createuser" No login required
router.post(
  "/createuser",
  body("name", "Enter a valid name").isLength({ min: 3 }),
  body("email", "Enter a valid email").isEmail(),
  body("password", "Password must be atleast 8 character long").isLength({
    min: 5,
  }),
  async (req, res) => {
    let success = false;

    //If there are errors, return bad request and the errors
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.send({ success, errors: result.array() });
    }

    const salt = await bcrypt.genSalt(10);
    secPass = await bcrypt.hash(req.body.password, salt);

    //check whether user email already
    try {
      const userQuery = "SELECT * FROM users WHERE email = $1";
      const userResult = await pool.query(userQuery, [req.body.email]);
      const existingUser = userResult.rows[0];

      if (existingUser) {
        return res
          .status(400)
          .json({ success, error: "This email already exists" });
      }

      const insertQuery =
        "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id";
      const insertValues = [req.body.name, req.body.email, secPass];
      const insertResult = await pool.query(insertQuery, insertValues);
      const userId = insertResult.rows[0].id;

      const data = { user: { id: userId } };
      const authtoken = jwt.sign(data, JWT_SECRET);

      success = true;
      res.json({ success, authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

//Login a User : POST Method "/api/auth/login" No login required
router.post(
  "/login",
  body("email", "Enter a valid email").isEmail(),
  body("password", "Password must be atleast 8 character long").exists(),
  async (req, res) => {
    let success = false;
    //If there are errors, return bad request and the errors
    const result = validationResult(req);
    if (result.isEmpty() === false) {
      return res.send({ errors: result.array() });
    }
    const { email, password } = req.body;
    try {
      const userQuery = "SELECT * FROM users WHERE email = $1";
      const userResult = await pool.query(userQuery, [req.body.email]);
      const existingUser = userResult.rows[0];

      if (!existingUser) {
        return res
          .status(400)
          .json({ success, error: "Please enter valid credentials" });
      }

      const passwordcompare = await bcrypt.compare(
        password,
        existingUser.password
      );

      if (!passwordcompare) {
        return res
          .status(400)
          .json({ success, error: "Please enter valid credentials" });
      }

      const data = {
        user: {
          id: existingUser.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({ success, authtoken: authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

//Get user data : POST Method "/api/auth/getuser" Login required
router.post("/getuser", fetchuser, async (req, res) => {
  try {
    userId = req.user.id;
    const getUserQuery = "SELECT id, name, email FROM users WHERE id = $1";
    const getUserResult = await pool.query(getUserQuery, [userId]);
    const user = getUserResult.rows[0];
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
