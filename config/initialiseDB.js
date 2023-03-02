let tableQueries = {};
tableQueries.products = require ("../migrations/001_create_table_products");
tableQueries.employees = require ("../migrations/002_create_table_employees");
tableQueries.shippers = require ("../migrations/003_create_table_shippers");
tableQueries.orders = require ("../migrations/004_create_table_orders");
tableQueries.orderDetails = require ("../migrations/005_create_table_orderDetails");

function selectDB(connection, DBname) {
    try {
        connection.query(`CREATE DATABASE IF NOT EXISTS ${DBname}`, (err, result) => { 
            if (err) throw err; 
        });
        connection.changeUser({ database: DBname }, (err, result) => {
            if (err) throw err;
            console.log(`${DBname} database is ready for data transmission`);
        });        
    } catch (error) {
        console.log(error);
    }  
};

function initialiseTable(connection, tableName, initialisationQuery) {
    try {
        connection.query(initialisationQuery, (err, result) => {
            if (err) throw err;
            console.log(`-- ${tableName} table OK`);
          });
    } catch (error) {
        console.log(error);
        return error;
    }   
};

function initialiseDB(connection, DBname) {
    try{
        selectDB(connection, DBname);
        Object.entries(tableQueries).forEach(([tableName, tableStructuringQuery]) =>{
            initialiseTable(connection, tableName, tableStructuringQuery);
        });
    } catch (error) {
        console.log(error);
    }
};

module.exports = initialiseDB;
