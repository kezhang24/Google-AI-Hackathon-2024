const User = require("../models/userModel");
const jwt = require('jsonwebtoken');
require("dotenv").config();
//login
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.login(email, password);


        const accessToken = jwt.sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
        res.status(200).json({ email, user, accessToken });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

//signup
const signupUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.signup(email, password);

        res.status(200).json({ email, user });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Endpoint for token refresh
const refreshToken = async (req, res) => {
    const refreshToken = req.body.refreshToken;
  
    // Verify refresh token
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      if (err) return res.sendStatus(403); // Forbidden
  
      // Generate new access token
      const accessToken = jwt.sign({ userId: user.userId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
  
      // Return new access token
      res.json({ accessToken });
    });
  };

module.exports = { signupUser, loginUser, refreshToken };
