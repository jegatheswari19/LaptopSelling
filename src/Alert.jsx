import React from 'react';

const Alert = ({ message, onClose }) => {
    return (
        <div style={styles.overlay}>
            <div style={styles.alertBox}>
                <p style={styles.message}>{message}</p>
                <button style={styles.closeButton} onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

const styles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000
    },
    alertBox: {
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
        maxWidth: '300px',
        width: '100%'
    },
    message: {
        color: 'black',
        marginBottom: '20px',
        fontSize: '16px'
    },
    closeButton: {
        backgroundColor: 'lightcoral',
        color: 'white',
        border: 'none',
        padding: '10px 20px',
        borderRadius: '5px',
        cursor: 'pointer'
    }
};

export default Alert;
