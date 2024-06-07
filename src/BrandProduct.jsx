import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function BrandProduct() {
    const { brandName } = useParams();
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch products by brandName
        axios.get(`http://localhost:5000/api/products?brand=${brandName}`)
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => {
                setError(error.message);
            });
    }, [brandName]);

    if (error) {
        return <div>Error: {error}</div>;
    }
    return (
        <div style={styles.container}>
            <h2>Products from {brandName}</h2>
            <div style={styles.productContainer}>
                {products.map(product => (
                    <div key={product.product_id} style={styles.card}>
                        <img
                            src={`data:image/jpeg;base64,${product.image_url}`}
                            alt={product.model_name}
                            style={styles.image}
                            loading="lazy"
                        />
                        <div style={styles.info}>
                            <h3 style={styles.title}>{product.model_name}</h3>
                            <p><strong>Brand:</strong> {product.brand_name}</p>
                            <p><strong>Product ID:</strong> {product.product_id}</p>
                            <p><strong>Model ID:</strong> {product.modelid}</p>
                            <p><strong>Description:</strong> {product.descriptions}</p>
                            <p><strong>Price:</strong> Rs {product.price}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

const styles = {
    container: {
        padding: '20px'
    },
    productContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '20px'
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
    }
};

export default BrandProduct;
