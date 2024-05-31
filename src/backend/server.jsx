const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Jega@2004",
    database: "ecommerce"
});

db.connect(err => {
    if (err) {
        console.error('Error connecting to the database:', err);
    } else {
        console.log('Connected to the database');
    }
});

app.get('/products', (req, res) => {
    const query = "SELECT * FROM product";
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err });
        }
        return res.json(results);
    });
});

app.get('/checkdb', (req, res) => {
    db.ping(err => {
        if (err) {
            return res.status(500).json({ connected: false, error: err });
        }
        return res.json({ connected: true });
    });
});

app.listen(8801, () => {
    console.log("Server is listening on port 5174");
});
