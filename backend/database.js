const { createPool } = require('mysql')

const pool = createPool({
    host: "localhost",
    user: "root",
    password: "Jega@2004",
    database: "ecommerce",
    connectionLimit: 10
   
})

pool.query(`select * from product `, function(err, result, fields) {
    if (err) {
        return console.log(err);
    }
    return console.log(result);
})