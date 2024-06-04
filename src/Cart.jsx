import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Cart() {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5001/api/carts') // Adjust port if necessary
            .then(response => {
                setCart(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the cart!", error);
            });
    }, []);

    const handleRemove = (productId) => {
        // Add your logic for removing the item from the cart
        const updatedCart = cart.filter(item => item.productid !== productId);
        setCart(updatedCart);
    };

    const handleQuantityChange = (productId, amount) => {
        const updatedCart = cart.map(item => {
            if (item.productid === productId) {
                return { ...item, quantity: item.quantity + amount };
            }
            return item;
        }).filter(item => item.quantity > 0);
        setCart(updatedCart);
    };

    return (
        <div style={styles.container}>
            {cart.map(item => (
                <div key={item.productid} style={styles.card}>
                    {item.image_url && (
                        <img 
                            src={`data:image/jpeg;base64,${item.image_url}`} 
                            alt={item.model_name} 
                            style={styles.image} 
                            loading="lazy" 
                        />
                    )}
                    <div style={styles.info}>
                        <h2 style={styles.title}>{item.model_name}</h2>
                        <p><strong>Brand:</strong> {item.brand_name}</p>
                        <p><strong>Description:</strong> {item.descriptions}</p>
                    </div>
                    <div style={styles.quantity}>
                        <button onClick={() => handleQuantityChange(item.productid, -1)} style={styles.button} type="button">-</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => handleQuantityChange(item.productid, 1)} style={styles.button} type="button">+</button>
                    </div>
                    <div style={styles.price}>Rs {item.price}</div>
                    <button onClick={() => handleRemove(item.productid)} style={styles.removeButton} type="button">Remove</button>
                </div>
            ))}
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        padding: '20px',
        boxSizing: 'border-box'
    },
    card: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        maxWidth: '800px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        marginBottom: '20px',
        overflow: 'hidden',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    },
    image: {
        width: '150px',
        height: '150px',
        objectFit: 'cover',
        flexShrink: 0,
    },
    info: {
        display: 'flex',
        flexDirection: 'column',
        padding: '20px',
        textAlign: 'left',
        flexGrow: 1,
    },
    title: {
        fontSize: '1.5em',
        marginBottom: '10px',
    },
    quantity: {
        display: 'flex',
        alignItems: 'center',
        padding: '0 20px',
    },
    button: {
        padding: '5px 10px',
        margin: '0 5px',
        cursor: 'pointer',
    },
    price: {
        padding: '0 20px',
        fontWeight: 'bold',
    },
    removeButton: {
        padding: '10px 20px',
        backgroundColor: '#f44336',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        marginLeft: '20px'
    }
};

export default Cart;
