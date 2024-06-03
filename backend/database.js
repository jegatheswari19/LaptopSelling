const express = require('express');
const { createPool } = require('mysql');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());

// Set up MySQL connection pool
const pool = createPool({
    host: "localhost",
    user: "root",
    password: "Jega@2004",
    database: "ecommerce",
    connectionLimit: 10
});

// Serve static files from the "images" directory
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

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
