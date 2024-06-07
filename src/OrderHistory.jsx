import React, { useState, useEffect } from 'react';
import axios from 'axios';

function OrderHistory({ userId }) {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetchOrders();
    }, [userId =1]); // userId should be in the dependency array

    const fetchOrders = () => {
        axios.get(`http://localhost:5000/api/orders`, {
            params: { userId }
        })
        .then(response => {
            setOrders(response.data);
        })
        .catch(error => {
            console.error('Error fetching orders:', error);
        });
    };

    return (
        <div style={styles.orderHistoryContainer}>
            <h2 style={styles.heading}>Order History</h2>
            <table style={styles.table}>
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Total Amount</th>
                        <th>Address</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order, index) => (
                        <tr key={order.order_id} style={index === 0 ? styles.tableRow : {...styles.tableRow, marginTop: '15px'}}>
                            <td>{order.order_id}</td>
                            <td>{order.amount}</td>
                            <td>{order.address}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

const styles = {
    orderHistoryContainer: {
        marginTop: '20px',
        textAlign: 'center'
    },
    heading: {
        fontSize: '24px',
        marginBottom: '10px',
        color: 'black'
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        color: 'black'
    },
    tableRow: {
        borderBottom: '1px solid #ccc',
    },
    tableCell: {
        padding: '20px',
    },
};

export default OrderHistory;
