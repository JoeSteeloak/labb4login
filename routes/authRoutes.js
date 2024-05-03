/* Routes for Auth */
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("dotenv").config();

//connect to mongodb
mongoose.set("strictQuery", false);
mongoose.connect(process.env.DATABASE).then(() => {
    console.log("Connected to MongoDb");
}).catch((error) => {
    console.error("Error connecting to database...");
});

//User model
const User = require("../models/User");

//Add a new user
router.post("/register", async (req, res) => {
    try {
        const { username, password } = req.body;

        // validate input GÖR BÄTTRE!
        if (!username || !password) {
            return res.status(400).json({ error: "Invalid input, send username and password" });
        }

        // Correct - save user
        const user = new User({username, password});
        await user.save();

        res.status(201).json({ message: "User created" });

    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
})

//Login user
router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;

        // validate input GÖR BÄTTRE!
        if (!username || !password) {
            return res.status(400).json({ error: "Invalid input, send username and password" });
        }

        // check credentials
        const user = await User.findOne({username});
        if(!user) {
            return res.status(401).json({erro: "Incorrect username/password!"});
        }

        //check password
        const isPasswordMatch = await user.comparePassword(password);
        if(!isPasswordMatch) {
            return res.status(401).json({erro: "Incorrect username/password!"});
        } else {
            // create JWT
            const payload = { username: username };
            const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {expiresIn: '1h'});
            const response = {
                message: "User logged in!",
                token: token,
            }
            res.status(200).json({ response });
        }
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
})

module.exports = router;