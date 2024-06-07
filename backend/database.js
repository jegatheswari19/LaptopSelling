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
    password: "Jega@2004",
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

app.post('/api/add-to-cart', (req, res) => {
    const { userId, productId, Price } = req.body;

    const query = 'INSERT INTO cart (user_id, product_id, price, quantity) VALUES (?, ?, ?,1)';

    pool.query(query, [userId, productId, Price], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'There was an error adding the product to the cart.' });
        }
        res.status(200).json({ message: 'Product added to cart successfully!' });
    });
});

app.post('/api/remove-cart', (req, res) => {
    const { userId, productId } = req.body;
    if (!userId || !productId) {
        return res.status(400).json({ error: 'User ID and Product ID are required' });
    }
    const query = 'DELETE FROM cart where user_id=? and product_id=?';
    pool.query(query, [userId, productId], (err, result) => {
        if (err) {
            console.error('Error adding to cart:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        res.status(201).json({ message: 'Product DELETED successfully' });
    });
});

app.post('/api/update-cart-quantity', (req, res) => {
    const { userId, productId, quantity } = req.body;
    if (!userId || !productId || quantity === undefined) {
        return res.status(400).json({ error: 'User ID, Product ID, and quantity are required' });
    }
    const query = 'UPDATE cart SET quantity = ? WHERE user_id = ? AND product_id = ?';
    pool.query(query, [quantity, userId, productId], (err, result) => {
        if (err) {
            console.error('Error updating cart quantity:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        res.status(200).json({ message: 'Quantity updated successfully' });
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
