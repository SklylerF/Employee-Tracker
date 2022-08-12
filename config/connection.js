const mysql = require("mysql2");

// create connection to daabase
const sqlData = mysql.createConnection(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        // Database location
        host: 'localhost',
        dialect: 'mysql',
        port: 3001,
    },
);

module.exports = sqlData;