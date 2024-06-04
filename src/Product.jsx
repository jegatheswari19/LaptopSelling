import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Product() {
    const [products, setProducts] = useState([]);
    const userId = 1; // Replace with actual user ID logic

    useEffect(() => {
        axios.get('http://localhost:5000/api/products')
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the products!", error);
            });
    }, []);

    const handleAddToCart = (product) => {
        axios.post('http://localhost:5001/api/add-to-cart', {
            userId: userId,
            productId: product.product_id
        })
        .then(response => {
            console.log(response.data.message);
            // Optionally show a success message or update the UI
        })
        .catch(error => {
            console.error("There was an error adding the product to the cart!", error);
        });
    };

    return (
        <div style={styles.container}>
            {products.map(product => (
                <div key={product.product_id} style={styles.card}>
                    <img 
                        src={`data:image/jpeg;base64,${product.image_url}`} 
                        alt={product.model_name} 
                        style={styles.image} 
                        loading="lazy" 
                    />
                    <div style={styles.info}>
                        <h2 style={styles.title}>{product.model_name}</h2>
                        <p><strong>Brand:</strong> {product.brand_name}</p>
                        <p><strong>Product ID:</strong> {product.product_id}</p>
                        <p><strong>Model ID:</strong> {product.modelid}</p>
                        <p><strong>Description:</strong> {product.descriptions}</p>
                        <p><strong>Price:</strong> Rs {product.price}</p>
                        <button style={styles.button} onClick={() => handleAddToCart(product)}>Add to Cart</button>
                    </div>
                </div>
            ))}
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '20px',
        padding: '20px'
    },
    card: {
        border: '1px solid #ccc',
        borderRadius: '8px',
        overflow: 'hidden',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        maxWidth: '300px',
        textAlign: 'center',
        background: 'white'
    },
    image: {
        width: '100%',
        height: '200px',
        objectFit: 'cover'
    },
    info: {
        padding: '20px'
    },
    title: {
        fontSize: '1.5em',
        margin: '10px 0'
    },
    button: {
        backgroundColor: '#4CAF50',
        color: 'white',
        border: 'none',
        padding: '10px 20px',
        textAlign: 'center',
        textDecoration: 'none',
        display: 'inline-block',
        fontSize: '16px',
        margin: '10px 0',
        borderRadius: '5px',
        cursor: 'pointer'
    }
};

export default Product;
 