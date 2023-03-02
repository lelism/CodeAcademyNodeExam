const initEmployeesTable = 
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

module.exports = initEmployeesTable;
