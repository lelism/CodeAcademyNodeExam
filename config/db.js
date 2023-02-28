const mysql = require("mysql");
const HOST = process.env.DB_HOST;
const DB_PORT = process.env.DB_PORT;
const USER = process.env.DB_USER;
const PASSWORD = process.env.DB_PASSWORD;
const DBName = process.env.DB_NAME;
const initialise = require("../migrations/initialiseDB");

const connection = mysql.createConnection({
    host: HOST,
    port: DB_PORT,
    user: USER,
    password: PASSWORD
});

connection.connect((err) => {
    if (err) {
        throw err
    }
    console.log("Connected to MySQL Server!");
    initialise.createDB(connection);
    initialise.selectDB(connection);
    initialise.createProductsTable(connection);
    initialise.createEmployeesTable(connection);
    initialise.createShippersTable(connection);
    initialise.createOrdersTable(connection);
    initialise.createOrderDetailsTable(connection);
});

module.exports = connection;