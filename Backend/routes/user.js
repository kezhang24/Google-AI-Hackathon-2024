const express = require("express");

const router = express.Router();

const {signupUser, loginUser, refreshToken, getUser} = require("../controllers/userController");
const authenticateToken = require("../middleware/auth");

router.post("/login", loginUser);

router.post("/signup", signupUser);

router.post("/refreshToken", refreshToken);

router.get("/current-user", authenticateToken, getUser);

module.exports = router;