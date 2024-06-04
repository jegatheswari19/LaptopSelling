const express = require('express');
const { createPool } = require('mysql');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const pool = createPool({
    host: "localhost",
    user: "root",
    password: "rajukalai23",
    database: "ecommerce",
    connectionLimit: 10
});

app.use('/images', express.static(path.join(__dirname, 'images')));

app.get('/api/products', (req, res) => {
    pool.query('SELECT *,TO_BASE64(image) AS image_url FROM product', (err, result) => {
        if (err) {
            console.error('Error retrieving products:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }

        try {
            res.json(result);
        } catch (error) {
            console.error('Error processing products:', error);
            res.status(500).json({ error: 'Error processing products' });
        }
    });
});

<<<<<<< HEAD
=======
// API endpoint to insert user data
app.post('/api/users', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }
    const query = 'INSERT INTO users (email, password) VALUES (?, ?)';
    pool.query(query, [email, password], (err, result) => {
        if (err) {
            console.error('Error inserting user:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        res.status(201).json({ message: 'User created successfully', userId: result.insertId });
    });
});

// API endpoint for user login
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }
    const query = 'SELECT * FROM users WHERE email = ? AND password = ?';
    pool.query(query, [email, password], (err, results) => {
        if (err) {
            console.error('Error retrieving user:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        if (results.length > 0) {
            res.status(200).json({ message: 'Login successful' });
        } else {
            res.status(401).json({ error: 'Invalid email or password' });
        }
    });
});
>>>>>>> 4aed3e5c1effefcc218064eaddce014a092557b0

const PORT = 5001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
