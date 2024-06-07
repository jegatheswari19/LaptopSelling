import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Payment() {
 
    const [orderStatus, setOrderStatus] = useState('');
    const[paymentMethod,setpaymentMethod] = useState('');
    const [totalAmount, setTotalAmount] = useState(0);
    const [address, setAddress] = useState('');

    const userId= sessionStorage.getItem('userId');

    useEffect(() => {
        fetchCartItems();
    }, []);
    const fetchCartItems = () => {
        const userId = sessionStorage.getItem('userId'); // Get userId from sessionStorage
        if (!userId) {
            console.error('User ID not found in sessionStorage');
            return;
        }
    
        axios.post('http://localhost:5000/api/carts', { userId }, { withCredentials: true })
            .then(response => {
                const cartItems = response.data;
                const amount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
                setTotalAmount(amount);
                setpaymentMethod('Cash on Delivery');
            })
            .catch(error => {
                console.error('Error fetching cart items:', error);
            });
    };
    

    const handleOrderPlacement = () => {
        const orderDetails = {
            userId ,
            paymentMethod,
            totalAmount,
            address
        };

        axios.post('http://localhost:5000/api/place-order', orderDetails)
            .then(response => {
                setOrderStatus('Order placed successfully!');
                // Optionally, you can clear the cart or redirect the user after order placement
            })
            .catch(error => {
                console.error('There was an error placing the order!', error);
            });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        handleOrderPlacement();
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.header}>Payment</h1>
            <form style={styles.form} onSubmit={handleSubmit}>
                <p>Payment Method: {paymentMethod}</p>
                <p>Total Amount: Rs. {totalAmount}</p>
                <input
                    type="text"
                    placeholder="Enter your address"
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                />
                <button type="submit" style={styles.button}>Place Order</button>
            </form>
            {orderStatus && <p style={styles.status}>{orderStatus}</p>}
        </div>
    );
}




const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#f7f7f7',
        padding: '20px',
    },
    header: {
        marginBottom: '20px',
        color: '#333',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        width: '300px',
    },
    button: {
        width: '100%',
        padding: '10px 20px',
        backgroundColor: '#4CAF50',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '16px',
    },
    status: {
        marginTop: '20px',
        fontSize: '18px',
        color: '#f44336',
    },
};

export default Payment;
