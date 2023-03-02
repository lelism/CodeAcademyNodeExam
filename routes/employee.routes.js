const Employee = require("../models/employee.model.js");

const startEmployeeRoutes = (app) => {
  const employees = require("../controllers/employee.controller.js");

  var router = require("express").Router();

  // Create a new Employee entry
  router.post("/", employees.create);

  // Retrieve all Employees
  router.get("/", employees.findAll);

  // Retrieve a single Employee with id
  router.get("/:id", employees.findByID);

  // Update a Employee with id
  router.put("/:id", employees.update);

  // Delete a Employee with id
  router.delete("/:id", employees.delete);

  app.use('/api/employees', router);
}

module.exports = {
  startEmployeeRoutes
}