const sql = require("../config/db.js");
const mysql = require("mysql");

const Employee = function(employee) {
  this.lastName = employee.lastName,
  this.firstName = employee.firstName,
  this.title = employee.title,
  this.titleOfCourtesy = employee.titleOfCourtesy,
  this.birthDate = employee.birthDate,
  this.hireDate = employee.hireDate,                
  this.address = employee.address,
  this.city = employee.city
}

// POST - create new employee entry
Employee.create = (newEmployee, result) => {
  sql.query("INSERT INTO employees SET ?", newEmployee, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("employee added to the DB: ", { employeeID: res.insertId, ...newEmployee });
    result(null, { employeeID: res.insertId, ...newEmployee });
  });
};

// GET - get all employee entries
Employee.getAll = (condition, result) => {
  let query = "SELECT * FROM employees";  
  if (Object.keys(condition).length) {
    query += ' WHERE ? LIKE "%?%"';
    query = mysql.format(query, 
      [String(Object.keys(condition)[0]), Object.values(condition)[0]]).replace(/'/g, "");
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length == 0) {
      console.log("No entries found");
      result(null, null);
      return;
    }
    console.log("Retrieved employees list: ", res);
    result(null, res);
  });
}; 

// GET - get employee by id
Employee.getEmployeeByID = (id, result) => {
  sql.query(`SELECT * FROM employees WHERE employeeID = ?`, id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (!res.length) {
      // employee with selected id not found
      result({ message: "employee not_found" }, null);
    return;
  }

  console.log("found employee: ", res[0]);
  result(null, res[0]);
  });
};

// PUT - update employee
Employee.updateById = (id, newData, result) => {
  sql.query(
    `UPDATE employees 
     SET lastName = ?, firstName = ?, title = ?, titleOfCourtesy = ?, birthDate = ?, hireDate = ?, address = ?, city = ? 
     WHERE employeeID = ?`,
      [
        newData.lastName, 
        newData.firstName, 
        newData.title, 
        newData.titleOfCourtesy, 
        newData.birthDate,
        newData.hireDate, 
        newData.address, 
        newData.city, 
        id
      ],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Employee with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated employee: ", { employeeID: id, ...newData });
      result(null, { employeeID: id, ...newData });
    }
  );
};

// DELETE - delete single employee by ID
Employee.remove = (id, result) => {
  sql.query("DELETE FROM employees WHERE employeeID = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.affectedRows == 0) {
      // Employee with selected ID did not exist
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted employee with id: ", id);
    result(null, res);
  });
};

  module.exports = Employee;