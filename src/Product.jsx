import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Product() {
    const [products, setProducts] = useState([]);
  
    useEffect(() => {
        axios.get('http://localhost:5000/api/products')
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the products!", error);
            });
    }, []);

    return (
        <div>
            <h1>Products</h1>
            <table>
                <thead>
                    <tr>
                        <th>Brand Name</th>
                        <th>Product ID</th>
                        <th>Model ID</th>
                        <th>Model Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Image</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product.product_id}>
                            <td>{product.brand_name}</td>
                            <td>{product.product_id}</td>
                            <td>{product.modelid}</td>
                            <td>{product.model_name}</td>
                            <td>{product.descriptions}</td>
                            <td>{product.price}</td>
                            <td><img src={product.image} alt={product.model_name} loading="lazy" /></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Product;
