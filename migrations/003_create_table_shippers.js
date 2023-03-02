const initShippersTable = 
    `CREATE TABLE IF NOT EXISTS shippers(
        shipperID INT AUTO_INCREMENT,
        companyName VARCHAR(50) NOT NULL,
        phone INT NOT NULL,
        PRIMARY KEY (shipperID)
    )`;

module.exports = initShippersTable;
