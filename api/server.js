const express = require("express");
const helmet = require("helmet");
const cors = require("cors");


const authLogReg = require("../auth/auth-log-reg");
const lists = require("../lists/lists-router");
const authenticate = require("../auth/auth-middleware");
const users = require("../users/users-router");

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use("/api/auth", authLogReg);
server.use("/api/lists", authenticate, lists);
server.use("/api/users", authenticate, users);

server.get("/", (req, res) => {
  res.send(`<h1>Reddit predictor - Backend</h1>`);
});

module.exports = server;