const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Users = require("../users/users-model");
const { validateUser } = require("../users/users-helpers");

// Register User
router.post("/register", (req, res) => {
  let user = req.body;

  const validateResult = validateUser(user);
    console.log(user)
  if (validateResult.isSuccessful === true) {
    
    const hash = bcrypt.hashSync(user.password, 12);
    user.password = hash;

    Users.add(user)
      .then(result => {
        res
          .status(201)
          .json(`${result.username} has been successfully created.`);
      })
      .catch(error => {
        res.status(500).json(`There was an error with registration: ${error}.`);
      });
  } else {
    res.status(400).json({
      messsage: "Invalid credentials for account creation.",
      errors: validateResult.errors
    });
  }
});

// Login User
router.post("/login", (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = getJwtToken(user.username);
        res
          .status(200)
          .json({ message: `Welcome back ${user.username}!`, token, id: `${user.id}` });
      } else {
        res.status(401).json({ message: "Invalid user credentials, unauthorized." });
      }
    })
    .catch(error => {
      res.status(500).json({ message: `There was an error: ${error}.` });
    });
});

// jwtToken Request
function getJwtToken(username) {
  const payload = {
    username
  };

  const secret = process.env.JWT_SECRET || "token safe, token secret";

  const options = {
    expiresIn: "8h"
  };

  return jwt.sign(payload, secret, options);
}

module.exports = router;