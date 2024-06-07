import React from 'react';
import pic from './assets/cart1.jpeg';

const CartIconWithBadge = ({ totalQuantity }) => {
    return (
        <div style={styles.container}>
            <img src={pic} alt="Cart" style={styles.icon} />
            {totalQuantity >= 0 && <span style={styles.badge}>{totalQuantity}</span>}
        </div>
    );
};

const styles = {
    container: {
        position: 'relative',
        display: 'inline-block',
    },
    icon: {
        width: '50px',
        height: '30px',
    },
    badge: {
        position: 'absolute',
        top: '-10px',
        right: '-10px',
        backgroundColor: 'red',
        color: 'white',
        borderRadius: '50%',
        padding: '5px 10px',
        fontSize: '12px',
    },
};

export default CartIconWithBadge;
