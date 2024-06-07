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
    password: "mathu23",
    database: "ecommerce",
    connectionLimit: 10
});

app.use('/images', express.static(path.join(__dirname, 'images')));

app.get('/api/products', (req, res) => {
    const { brand } = req.query;
    let query = 'SELECT *, TO_BASE64(image) AS image_url FROM product';
    if (brand) {
        query += ` WHERE brand_name = '${brand}'`;
    }
    pool.query(query, (err, result) => {
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


app.get('/api/productsByBrand', (req, res) => {
    const { brand } = req.query;
    if (!brand) {
        return res.status(400).json({ error: 'Brand name is required' });
    }

    const query = 'SELECT *, TO_BASE64(image) AS image_url FROM product WHERE brand_name = ?';
    pool.query(query, [brand], (err, result) => {
        if (err) {
            console.error('Error retrieving products by brand:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        res.json(result);
    });
});


app.post('/api/add-to-cart', (req, res) => {
    const { userId, productId } = req.body;
    if (!userId || !productId) {
        return res.status(400).json({ error: 'User ID and Product ID are required' });
    }
    const checkQuery = 'SELECT * FROM cart WHERE user_id = ? AND product_id = ?';
    pool.query(checkQuery, [userId, productId], (err, result) => {
        if (err) {
            console.error('Error checking cart:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        if (result.length > 0) {
            return res.status(409).json({ message: 'Product is already in the cart' });
        }
        const insertQuery = 'INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, 1)';
        pool.query(insertQuery, [userId, productId], (err, result) => {
            if (err) {
                console.error('Error adding to cart:', err);
                return res.status(500).json({ error: 'Internal server error' });
            }
            res.status(201).json({ message: 'Product added to cart successfully' });
        });
    });
});

app.post('/api/remove-cart', (req, res) => {
    const { userId, productId } = req.body;
    if (!userId || !productId) {
        return res.status(400).json({ error: 'User ID and Product ID are required' });
    }
    const query = 'DELETE FROM cart WHERE user_id=? AND product_id=?';
    pool.query(query, [userId, productId], (err, result) => {
        if (err) {
            console.error('Error removing from cart:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        res.status(201).json({ message: 'Product removed from cart successfully' });
    });
});

// Update the '/api/carts' endpoint to fetch cart items for the logged-in user

app.get('/api/carts', (req, res) => {
    const query = `
        SELECT c.user_id, c.product_id, p.model_name, p.brand_name, p.image, p.descriptions, p.price, c.quantity 
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

app.post('/api/update-cart-quantity', (req, res) => {
    const { userId, productId, quantity } = req.body;
    if (!userId || !productId || quantity === undefined) {
        return res.status(400).json({ error: 'User ID, Product ID, and quantity are required' });
    }

    const checkQuery = 'SELECT * FROM cart WHERE user_id = ? AND product_id = ?';
    pool.query(checkQuery, [userId, productId], (err, results) => {
        if (err) {
            console.error('Error checking cart:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: 'Product not found in cart' });
        }

        const updateQuery = 'UPDATE cart SET quantity = ? WHERE user_id = ? AND product_id = ?';
        pool.query(updateQuery, [quantity, userId, productId], (err, result) => {
            if (err) {
                console.error('Error updating cart quantity:', err);
                return res.status(500).json({ error: 'Internal server error' });
            }

            const selectQuery = `
                SELECT c.user_id, c.product_id, p.model_name, p.brand_name, p.image, p.descriptions, p.price, c.quantity 
                FROM cart c 
                JOIN product p ON c.product_id = p.product_id
                WHERE c.user_id = ? AND c.product_id = ?
            `;
            pool.query(selectQuery, [userId, productId], (err, results) => {
                if (err) {
                    console.error('Error retrieving updated product:', err);
                    return res.status(500).json({ error: 'Internal server error' });
                }

                const updatedProduct = results[0];
                updatedProduct.image_url = updatedProduct.image ? Buffer.from(updatedProduct.image).toString('base64') : null;

                res.status(200).json({ message: 'Quantity updated successfully', updatedProduct });
            });
        });
    });
});

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


// Inside the '/api/place-order' endpoint
// Inside the '/api/place-order' endpoint
app.post('/api/place-order', (req, res) => {
    const { userId, totalAmount, address } = req.body;
    const paymentMethod = 'cashOnDelivery'; // Set payment method to cash on delivery

    // Check if userId, totalAmount, and address are provided
    if (!userId || !totalAmount || !address) {
        return res.status(400).json({ error: 'User ID, total amount, and address are required' });
    }

    const getCartItemsQuery = 'SELECT * FROM cart WHERE user_id = ?';
    pool.query(getCartItemsQuery, [userId], (err, cartItems) => {
        if (err) {
            console.error('Error retrieving cart items:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }

        if (cartItems.length === 0) {
            return res.status(400).json({ error: 'Cart is empty' });
        }

        // Proceed with the order placement logic
        // 1. Insert order details into the orders table
        const insertOrderQuery = 'INSERT INTO orders (user_id, payment_method, amount, address) VALUES (?, ?, ?, ?)';
        pool.query(insertOrderQuery, [userId, paymentMethod, totalAmount, address], (err, result) => {
            if (err) {
                console.error('Error inserting order:', err);
                return res.status(500).json({ error: 'Internal server error' });
            }

            const orderId = result.insertId;

            // 2. Insert order items into the order_items table
            const orderItems = cartItems.map(item => [orderId, item.product_id, item.quantity]);
            const insertOrderItemsQuery = 'INSERT INTO order_items (order_id, product_id, quantity) VALUES ?';
            pool.query(insertOrderItemsQuery, [orderItems], (err) => {
                if (err) {
                    console.error('Error inserting order items:', err);
                    return res.status(500).json({ error: 'Internal server error' });
                }

                // 3. Delete cart items after successful order placement
                const deleteCartItemsQuery = 'DELETE FROM cart WHERE user_id = ?';
                pool.query(deleteCartItemsQuery, [userId], (err) => {
                    if (err) {
                        console.error('Error deleting cart items:', err);
                        return res.status(500).json({ error: 'Internal server error' });
                    }

                    // Order successfully placed
                    res.status(200).json({ message: 'Order placed successfully!' });
                    console.log('Order is placed successfully');
                });
            });
        });
    });
});



const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});