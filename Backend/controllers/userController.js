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

        const accessToken = jwt.sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
        res.status(200).json({ email, user, accessToken });
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

// Uses token to find current user information
const getUser = async (req, res) => {
    try {
        const { userId } = req.user;

        const user = await User.findById(userId);

        if(!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({ user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal error' });
    }
}

module.exports = { signupUser, loginUser, refreshToken, getUser };
