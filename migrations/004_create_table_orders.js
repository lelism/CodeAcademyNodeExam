const initOrdersTable = 
    `CREATE TABLE IF NOT EXISTS orders(
        orderID INT AUTO_INCREMENT,
        customerID INT NOT NULL,
        shipperID INT NOT NULL,
        orderDate DATE NOT NULL,
        PRIMARY KEY (orderID),
        CONSTRAINT fk_orders_employees FOREIGN KEY (customerID) REFERENCES employees(employeeID),
        CONSTRAINT fk_orders_shippers FOREIGN KEY (shipperID) REFERENCES shippers(shipperID)
    )`;

module.exports = initOrdersTable;
