const DBName = process.env.DB_NAME;

function createDB(connection) {
    const sqlQuery = `CREATE DATABASE IF NOT EXISTS ${DBName}`;
    connection.query(sqlQuery, function (err, result) {
        if (err) throw err;
        console.log("Database praparation stage 1 of 2 is completed");
      });    
}

function selectDB(connection) {
    connection.changeUser({ database: DBName }, function (err, result) {
        if (err) throw err;
        console.log("Database praparation stage 2 of 2 is completed");
    });
}

function createProductsTable(connection) {
    const sqlQuery = 
        `CREATE TABLE IF NOT EXISTS products(
            productID INT AUTO_INCREMENT,
            productName VARCHAR(255) NOT NULL,
            supplierID INT NOT NULL,
            categoryID INT NOT NULL,
            quantityPerUnit INT NOT NULL DEFAULT 1,
            unitPrice FLOAT NOT NULL,
            PRIMARY KEY (productID)
        )`;
    connection.query(sqlQuery, function (err, result) {
        if (err) throw err;
        console.log("Products table is ready to be used");
      });    
}

function createEmployeesTable(connection) {
    const sqlQuery = 
        `CREATE TABLE IF NOT EXISTS employees(
            employeeID INT AUTO_INCREMENT,
            lastName VARCHAR(50) NOT NULL,
            firstName VARCHAR(50) NOT NULL,
            title VARCHAR(50) NOT NULL,
            titleOfCourtesy VARCHAR(5) NOT NULL,
            birthDate DATE,
            hireDate DATE NOT NULL,
            address VARCHAR(100) NOT NULL,
            city VARCHAR(15) NOT NULL,
            PRIMARY KEY (employeeID)
        )`;
    connection.query(sqlQuery, function (err, result) {
        if (err) throw err;
        console.log("Employees table is ready to be used");
      });    
}

function createShippersTable(connection) {
    const sqlQuery = 
        `CREATE TABLE IF NOT EXISTS shippers(
            shipperID INT AUTO_INCREMENT,
            companyName VARCHAR(50) NOT NULL,
            phone INT NOT NULL,
            PRIMARY KEY (shipperID)
        )`;
    connection.query(sqlQuery, function (err, result) {
        if (err) throw err;
        console.log("Shippers table is ready to be used");
      });    
}

function createOrdersTable(connection) {
    const sqlQuery = 
        `CREATE TABLE IF NOT EXISTS orders(
            orderID INT AUTO_INCREMENT,
            customerID INT NOT NULL,
            shipperID INT NOT NULL,
            orderDate DATE NOT NULL,
            PRIMARY KEY (orderID),
            CONSTRAINT fk_orders_employees FOREIGN KEY (customerID) REFERENCES employees(employeeID),
            CONSTRAINT fk_orders_shippers FOREIGN KEY (shipperID) REFERENCES shippers(shipperID)
        )`;
    connection.query(sqlQuery, function (err, result) {
        if (err) throw err;
        console.log("Orders table is ready to be used");
      });    
}

function createOrderDetailsTable(connection) {
    const sqlQuery = 
        `CREATE TABLE IF NOT EXISTS orderDetails(
            orderID INT NOT NULL,
            productID INT NOT NULL,
            unitPrice FLOAT NOT NULL,
            quantity INT NOT NULL,
            discount INT DEFAULT 0,
            CONSTRAINT fk_orderDetails_orders FOREIGN KEY (orderID) REFERENCES orders(orderID),
            CONSTRAINT fk_orderDetails_products FOREIGN KEY (productID) REFERENCES products(productID)
        )`;
    connection.query(sqlQuery, function (err, result) {
        if (err) throw err;
        console.log("Orders Details table is ready to be used");
      });    
}

module.exports = {createDB, selectDB, createProductsTable, createEmployeesTable, createShippersTable, createOrdersTable, createOrderDetailsTable};
