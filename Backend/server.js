const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/user");
require('dotenv').config();

const app = express();
app.use(express.json())
const PORT = 4000;

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

//routes
app.use("/api/user", userRoutes);
// Test endpoint to see if server is up
app.get('/health', (req, res) => {
    res.send('Server is running!');
  });

// connect to db (need to get url has not been put in .env yet)
mongoose
    .connect(
        process.env.MONGO_URI
    )
    .then(() => {
        // listen for requests
        app.listen(PORT, () => {
            console.log("connected to db & listening on port", PORT);
        });
    })
    .catch((error) => {
        console.log(error);
    });
