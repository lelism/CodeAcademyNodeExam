const Employee = require("../models/employee.model.js");

// Create and Save a new Employee
exports.create = (req, res) => {
  // Validate request
//   if (!req.body) {
//     res.status(400).send({
//       message: "Content can not be empty!"
//     });
//   }

  // Create a employee
  const newEmployeeEntry = new Employee({
    lastName : req.body.lastName,
    firstName : req.body.firstName,
    title : req.body.title,
    titleOfCourtesy : req.body.titleOfCourtesy,
    birthDate : req.body.birthDate,
    hireDate : req.body.hireDate,
    address : req.body.address,
    city : req.body.city,
    // employeeName : req.body.employeeName || `Dummy employee name ${Math.floor(Math.random() * 1000)}`,
    // supplierID : req.body.supplierID || Math.floor(Math.random() * 1000),
    // categoryID : req.body.categoryID || Math.floor(Math.random() * 1000),
    // quantityPerUnit : req.body.quantityPerUnit || 1,
    // unitPrice : req.body.unitPrice || Number((Math.random() * 100).toFixed(2))
  });

  // Save Tutorial in the database
  Employee.create(newEmployeeEntry, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while writting employee data to DB."
      });
    else res.send(data);
  });
};



// Retrieve all Employees from the database (with condition).
exports.findAll = (req, res) => {
    const nameFragment = req.query.nameFragment;
    console.log(nameFragment);
  
    Employee.getAll(nameFragment, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving employees."
        });
      else res.send(data);
    });
  };

// Retrieve selected Employee by ID
exports.findByID = (req, res) => {
  const id = req.params.id;
  Employee.getEmployeeByID(id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Employee with id ${id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Employee with id " + id
        });
      }
    } else res.send(data);
  });
};

// Update a employee identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // console.log(req.body);
  const id = req.params.id;
  Employee.updateById(
    id,
    new Employee(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Employee with id ${id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating employee with id " + id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  Employee.remove(id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Prduct with id ${id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Employee with id " + id
        });
      }
    } else res.send({ message: `Employee was deleted successfully!` });
  });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  Employee.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Employees."
      });
    else res.send({ message: `All Employees were deleted successfully!` });
  });
};