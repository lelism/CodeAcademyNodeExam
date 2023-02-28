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
            ProductID INT AUTO_INCREMENT,
            ProductName VARCHAR(255) NOT NULL,
            SupplierID INT NOT NULL,
            CategoryID INT NOT NULL,
            QuantityPerUnit INT NOT NULL DEFAULT 1,
            UnitPrice FLOAT NOT NULL,
            PRIMARY KEY (ProductID)
        )`;
    connection.query(sqlQuery, function (err, result) {
        if (err) throw err;
        console.log("Products table is ready to be used");
      });    
}

function createEmployeesTable(connection) {
    const sqlQuery = 
        `CREATE TABLE IF NOT EXISTS employees(
            EmployeeID INT AUTO_INCREMENT,
            LastName VARCHAR(50) NOT NULL,
            FirstName VARCHAR(50) NOT NULL,
            Title VARCHAR(50) NOT NULL,
            TitleOfCourtesy VARCHAR(5) NOT NULL,
            BirthDate DATE,
            HireDate DATE NOT NULL,
            Address VARCHAR(100) NOT NULL,
            City VARCHAR(15) NOT NULL,
            PRIMARY KEY (EmployeeID)
        )`;
    connection.query(sqlQuery, function (err, result) {
        if (err) throw err;
        console.log("Employees table is ready to be used");
      });    
}

function createShippersTable(connection) {
    const sqlQuery = 
        `CREATE TABLE IF NOT EXISTS shippers(
            ShipperID INT AUTO_INCREMENT,
            CompanyName VARCHAR(50) NOT NULL,
            Phone INT NOT NULL,
            PRIMARY KEY (ShipperID)
        )`;
    connection.query(sqlQuery, function (err, result) {
        if (err) throw err;
        console.log("Shippers table is ready to be used");
      });    
}

function createOrdersTable(connection) {
    const sqlQuery = 
        `CREATE TABLE IF NOT EXISTS orders(
            OrderID INT AUTO_INCREMENT,
            CustomerID INT NOT NULL,
            ShipperID INT NOT NULL,
            OrderDate DATE NOT NULL,
            PRIMARY KEY (OrderID),
            CONSTRAINT fk_ordersTOemployees FOREIGN KEY (CustomerID) REFERENCES employees(EmployeeID),
            CONSTRAINT fk_ordersTOshippers FOREIGN KEY (ShipperID) REFERENCES shippers(ShipperID)
        )`;
    connection.query(sqlQuery, function (err, result) {
        if (err) throw err;
        console.log("Orders table is ready to be used");
      });    
}

function createOrderDetailsTable(connection) {
    const sqlQuery = 
        `CREATE TABLE IF NOT EXISTS orderDetails(
            OrderID INT NOT NULL,
            ProductID INT NOT NULL,
            UnitPrice FLOAT NOT NULL,
            Quantity INT NOT NULL,
            Discount INT DEFAULT 0,
            CONSTRAINT fk_orderDetailsTOorders FOREIGN KEY (OrderID) REFERENCES orders(OrderID),
            CONSTRAINT fk_orderDetailsTOproducts FOREIGN KEY (ProductID) REFERENCES products(ProductID)
        )`;
    connection.query(sqlQuery, function (err, result) {
        if (err) throw err;
        console.log("Orders Details table is ready to be used");
      });    
}

module.exports = {createDB, selectDB, createProductsTable, createEmployeesTable, createShippersTable, createOrdersTable, createOrderDetailsTable};
