const Badge = ({ count }) => {
    return (
        <div style={badgeStyles.container}>
            {count}
        </div>
    );
};

const badgeStyles = {
    container: {
        display: 'inline-block',
        padding: '5px 10px',
        borderRadius: '15px',
        background: '#f44336',
        color: 'white',
        fontWeight: 'bold',
        fontSize: '14px',
        position: 'absolute',
        top: '10px',
        right: '10px',
    },
};
  export default Badge;