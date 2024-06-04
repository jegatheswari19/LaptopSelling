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
<<<<<<< HEAD
app.post('/api/add-to-cart', (req, res) => {
    const { userId, productId } = req.body;
    if (!userId || !productId) {
        return res.status(400).json({ error: 'User ID and Product ID are required' });
    }
    const query = 'INSERT INTO cart (user_id, product_id) VALUES (?, ?)';
    pool.query(query, [userId, productId], (err, result) => {
        if (err) {
            console.error('Error adding to cart:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        res.status(201).json({ message: 'Product added to cart successfully' });
    });
});


app.get('/api/carts', (req, res) => {
    const query = `
        SELECT c.user_id, c.product_id, p.model_name, p.brand_name, p.image, p.descriptions, p.price 
        FROM cart c 
        JOIN product p ON c.product_id = p.product_id
    `;
    pool.query(query, (err, result) => {
        if (err) {
            console.error('Error retrieving cart:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }

        try {
            // Convert image to Base64 string for display
            const products = result.map(product => ({
                ...product,
                image_url: product.image ? Buffer.from(product.image).toString('base64') : null
            }));

            res.json(products);
        } catch (error) {
            console.error('Error processing cart:', error);
            res.status(500).json({ error: 'Error processing cart' });
        }
    });
});



=======
<<<<<<< HEAD
=======
>>>>>>> a60f7a390a72f83aa1de8edcf38a1e79dac7308c
>>>>>>> 9f0c803ff6cc253307b2f4f1caceaa6e6d0f1f61
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

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
