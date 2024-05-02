/* Routes for Auth */
const express = require("express");
const router = express.Router();


//Add a new user
router.post("/register", async (req, res) => {
    try {
        const { username, password } = req.body;

        // validate input GÖR BÄTTRE!
        if (!username || !password) {
            return res.status(400).json({ error: "Invalid input, send username and password" });
        }

        // Correct - save user
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
        if (username === "Jonas" && password === "password") {
            res.status(200).json({ message: "Login successful" })
        } else {
            res.status(401).json({ error: "Invalid username/password" });
        }

        // Correct - save user
        res.status(201).json({ message: "User created" });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
})

module.exports = router;