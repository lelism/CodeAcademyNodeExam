const initProductsTable = 
    `CREATE TABLE IF NOT EXISTS products(
            productID INT AUTO_INCREMENT,
            productName VARCHAR(255) NOT NULL,
            supplierID INT NOT NULL,
            categoryID INT NOT NULL,
            quantityPerUnit INT NOT NULL DEFAULT 1,
            unitPrice FLOAT NOT NULL,
            PRIMARY KEY (productID)
            )`;

module.exports = initProductsTable;
