const initOrderDetailsTable = 
    `CREATE TABLE IF NOT EXISTS orderDetails(
        orderID INT NOT NULL,
        productID INT NOT NULL,
        unitPrice FLOAT NOT NULL,
        quantity INT NOT NULL,
        discount INT DEFAULT 0,
        PRIMARY KEY (orderID, productID),
        CONSTRAINT fk_orderDetails_orders FOREIGN KEY (orderID) REFERENCES orders(orderID),
        CONSTRAINT fk_orderDetails_products FOREIGN KEY (productID) REFERENCES products(productID)
    )`;

module.exports = initOrderDetailsTable;
