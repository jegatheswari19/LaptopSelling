const { createPool } = require('mysql')

const pool = createPool({
    host: "localhost",
    user: "root",
    password: "Jega@2004",
    database: "ecommerce",
   
})

pool.query(`select * from product where brand_name=?`,['dell'], function(err, result, fields) {
    if (err) {
        return console.log(err);
    }
    return console.log(result);
})