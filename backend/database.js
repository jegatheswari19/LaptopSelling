const express = require('express');
const { createPool } = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());

const pool = createPool({
    host: "localhost",
    user: "root",
    password: "Jega@2004",
    database: "ecommerce",
    connectionLimit: 10
});

app.get('/api/products', (req, res) => {
    pool.query('SELECT *, CONCAT("http://localhost:5000/images/", image) AS image FROM product', (err, result) => {
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
