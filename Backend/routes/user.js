const express = require("express");

const router = express.Router();

const {signupUser, loginUser, refreshToken} = require("../controllers/userController");

router.post("/login", loginUser);

router.post("/signup", signupUser);

router.post("/refreshToken", refreshToken);

module.exports = router;