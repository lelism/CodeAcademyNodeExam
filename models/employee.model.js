const sql = require("../config/db.js");

const Employee = function(employee) {                    //dummy values to fill up DB
    this.lastName = employee.lastName                || `Dummy FirstName ${Math.floor(Math.random() * 1000)}`;
    this.firstName = employee.firstName              || `Dummy LastName ${Math.floor(Math.random() * 1000)}`;
    this.title = employee.title                      || `title ${Math.floor(Math.random() * 1000)}`;
    this.titleOfCourtesy = employee.titleOfCourtesy  || `Ttl${Math.floor(Math.random() * 100)}`;
    this.birthDate = employee.birthDate              || "2000-01-01";
    this.hireDate = employee.hireDate                || "2001-01-01";
    this.address = employee.address                  || `street ${Math.floor(Math.random() * 100)}`;
    this.city = employee.city                        || `city ${Math.floor(Math.random() * 100)}`;
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
      console.log(res);
      result(null, { employeeID: res.insertId, ...newEmployee });
    });
  };

// GET - get all employee entries
Employee.getAll = (employeeNameFragment, result) => {
    let query = "SELECT * FROM employees";
  
    if (employeeNameFragment) {
      query += ` WHERE lastName LIKE '%${employeeNameFragment}%'`;
    }
  
    sql.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("Employee list: ", res);
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

    if (res.length) {
      console.log("found employee: ", res[0]);
      result(null, res[0]);
      return;
    }

    // employee with selected id not found
    result({ message: "employee not_found" }, null);
  });
};

// PATCH - update employee
Employee.updateById = (id, newData, result) => {
  sql.query(
    "UPDATE employees SET lastName = ?, firstName = ?, title = ?, titleOfCourtesy = ?, birthDate = ?, hireDate = ?, address = ?, city = ? WHERE employeeID = ?",
    [newData.lastName, newData.firstName, newData.title, newData.titleOfCourtesy, newData.birthDate, newData.hireDate, newData.address, newData.city, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
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
      result(null, err);
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

// DELETE - delete all employees
Employee.removeAll = result => {
  sql.query("DELETE FROM employees", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} employees`);
    result(null, res);
  });
};

  module.exports = Employee;