/* Routes for Auth */
require("dotenv").config();
const express = require("express");
const router = express.Router();
const sqlite3 = require("sqlite3").verbose();
const bcrypt = require("bcrypt");

//connect to database
const db = new sqlite3.Database(process.env.DATABASE);


//Add a new user
router.post("/register", async (req, res) => {
    try {
        const { username, password } = req.body;

        // validate input GÖR BÄTTRE!
        if (!username || !password) {
            return res.status(400).json({ error: "Invalid input, send username and password" });
        }

        // Check if user already exists?

        // Hash password
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        // Correct - save user
        const sql = `INSERT INTO users(username, password) VALUES(?,?)`;
        db.run(sql, [username, hashedPassword], (err) => {
            if (err) {
                res.status(400).json({ message: "Error creating user..." })
            } else {
                res.status(201).json({ message: "User created" });
            }


        });



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

        // check if user exists
        const sql = `SELECT * FROM users WHERE username=?`;
        db.get(sql, [username], async (err, row) => {
            if (err) {
                res.status(400).json({ message: "Error authenticating..." });
            } else if (!row) {
                res.status(401).json({ message: "Incorrect username/password!" });
            } else {
                //user exists - check username/password
                const passwordMatch = await bcrypt.compare(password, row.password);

                if (!passwordMatch) {
                    res.status(401).json({ message: "Incorrect username/password!" });
                } else {
                    //correct login
                    res.status(200).json({ message: "correct login!" });
                }
            }
        });

    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
})

module.exports = router;