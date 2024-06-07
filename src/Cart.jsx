// Cart.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Alert from './Alert';
import { useNavigate } from 'react-router-dom';

function Cart() {
    const [cart, setCart] = useState([]);
    const [alertMessage, setAlertMessage] = useState('');
    const loggedIn = sessionStorage.getItem('loggedIn') === 'true';
    const [totalPayment, setTotalPayment] = useState(0);
    const navigate = useNavigate();
   
    useEffect(() => {
        if (!loggedIn) {
            setCart([]);
            return;
        }
    
        const userId = sessionStorage.getItem('userId'); // Get userId from sessionStorage
        axios.post('http://localhost:5000/api/carts', { userId }, { withCredentials: true })
            .then(response => {
                setCart(response.data);
                calculateTotalPayment(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the cart!", error);
            });
    }, []);
    

    const calculateTotalPayment = (cartItems) => {
        let total = 0;
        cartItems.forEach(item => {
            total += item.price;
        });
        setTotalPayment(total);
    };

    const handleQuantityChange = (userId, productId, delta, unitPrice) => {
        const item = cart.find(item => item.product_id === productId);
        if (!item) return;

        const newQuantity = item.quantity + delta;
        if (newQuantity < 1) return;

        const newPrice = unitPrice * newQuantity;
      
        axios.post('http://localhost:5000/api/update-cart-quantity',  {
         userId :sessionStorage.getItem('userId'),// Get userId from sessionStorage
     
            productId ,
            quantity: newQuantity // Ensure quantity is a valid number
        })
        .then(response => {
            const updatedCart = cart.map(cartItem => 
                cartItem.product_id === productId 
                    ? { ...cartItem, quantity: newQuantity, price: newPrice }
                    : cartItem
            );
            setCart(updatedCart);
            calculateTotalPayment(updatedCart);
        })
        .catch(error => {
            console.error("There was an error updating the quantity!", error);
        });
    };

    const handleRemove = (userId, productId) => {
        axios.post('http://localhost:5000/api/remove-cart', {
            userId:sessionStorage.getItem('userId'),

            productId,
        })
        .then(response => {
            const updatedCart = cart.filter(item => item.product_id !== productId);
            setCart(updatedCart);
            calculateTotalPayment(updatedCart);
            setAlertMessage('Product Removed from Cart!');
        })
        .catch(error => {
            console.error("There was an error removing the product from the cart!", error);
        });
    };

    const closeAlert = () => {
        setAlertMessage('');
    };

    const handleProceedToPayment = () => {
        navigate('/Payment');
    };

    return (
        <div style={styles.container}>
            {alertMessage && <Alert message={alertMessage} onClose={closeAlert} />}
            <div style={styles.cartHeader}>
                <h1>Your Cart</h1>
            </div>
            {cart.map(item => (
                <div key={item.product_id} style={styles.card}>
                    <img 
                        src={`data:image/jpeg;base64,${item.image_url}`} 
                        alt={item.model_name} 
                        style={styles.image} 
                        loading="lazy" 
                    />
                    <div style={styles.info}>
                        <h2 style={styles.title}>{item.model_name}</h2>
                        <p><strong>Brand:</strong> {item.brand_name}</p>
                        <p><strong>Description:</strong> {item.descriptions}</p>
                        <p><strong>Quantity:</strong> {item.quantity}</p>
                    </div>
                    <div style={styles.quantity}>
                        <button onClick={() => handleQuantityChange(item.user_id, item.product_id, -1, item.price / item.quantity)} style={styles.button} type="button">-</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => handleQuantityChange(item.user_id, item.product_id, 1, item.price / item.quantity)} style={styles.button} type="button">+</button>
                    </div>
                    <div style={styles.price}>Rs {item.price}</div>
                    <button onClick={() => handleRemove(item.user_id, item.product_id)} style={styles.removeButton} type="button">Remove</button>
                </div>
            ))}
            <div style={styles.totalPayment}>
                <p>Total Amount: Rs {totalPayment}</p>
                <button onClick={handleProceedToPayment} style={styles.proceedButton} disabled={cart.length === 0} type="button">Proceed to Payment</button>
            </div>
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
    cartHeader: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        maxWidth: '800px',
        marginBottom: '20px',
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
        width: '200px',
        height: '200px',
        objectFit: 'cover',
        marginRight: '20px',
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
    },
    totalPayment: {
        marginTop: '20px',
        textAlign: 'right',
        width: '100%',
        maxWidth: '800px',
    },
    proceedButton: {
        padding: '10px 20px',
        backgroundColor: '#4CAF50',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    }
};

export default Cart;
