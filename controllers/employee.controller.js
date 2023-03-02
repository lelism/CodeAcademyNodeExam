const Employee = require("../models/employee.model.js");
const { testInputValidity, createJsonMessage, randomMaxInt, randomMaxFloat} 
  = require("../commons/functions");

// Create and Save a new Employee
exports.create = (req, res) => {
  try {
    //read inputs
    let receivedInputs = req.body;

    //  //Uncoment this section to fill up input by dummy values    
    // receivedInputs = {                             
    //   lastName : req.body.lastName                || `Dummy ${randomMaxInt(100)}`,
    //   firstName : req.body.firstName              || `Dum ${randomMaxInt(100)}`,
    //   title : req.body.title                      || `title ${randomMaxInt(10)}`,
    //   titleOfCourtesy : req.body.titleOfCourtesy  || `Ttl${randomMaxInt(10)}`,
    //   birthDate : req.body.birthDate              || "2000-01-01",
    //   hireDate : req.body.hireDate                || "2001-01-01",
    //   address : req.body.address                  || `street ${randomMaxInt(100)}`,
    //   city : req.body.city                        || `city ${randomMaxInt(100)}`
    // };

    // input validation
    const requiredInputKeys = [
      "lastName",
      "firstName",
      "title",
      "titleOfCourtesy",
      "birthDate",
      "hireDate",
      "address",
      "city"
    ];
    const invalidInputs = testInputValidity(receivedInputs, requiredInputKeys);
    if (invalidInputs) {
        const response = createJsonMessage(`Bad inputs for: ${invalidInputs}.`);
        return res.status(422).send(response);
    };
    // Save employee row in the database
    const newEmployeeEntry = new Employee(receivedInputs);

    Employee.create(newEmployeeEntry, (err, result) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while writting employee data to DB."
        });
      else res.status(200).send(result);
    });
  } catch (error) {
    console.error(error);
    return res.status(400).send(error);
  }
};

// Retrieve all Employees from the database (with condition).
exports.findAll = (req, res) => {
  try {
    const condition = req.body;
    if (Object.keys(condition).length > 1) {
        return res.status(400).send(createJsonMessage(`Bad search condition`));
    }    
    Employee.getAll(condition, (err, result) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving employees."
        });
      else {
        if (!result)
          return res.status(200).send(createJsonMessage("No entries found"));
        res.status(200).send(result);
      }
    });

  } catch (error) {
    console.error(error);
    return res.status(400).send(error);
  }
};

// Retrieve selected Employee by ID
exports.findByID = (req, res) => {
  try {
    const id = req.params.id;
    Employee.getEmployeeByID(id, (err, result) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Employee with id ${id}.`
          });
        } else {
          res.status(500).send({
            message: err.message || "Error retrieving Employee with id " + id
          });
        }
      } else res.status(200).send(result);
    });
  } catch (error) {
    console.error(error);
    return res.status(400).send(error);
  }
};

// Update a employee identified by the id in the request
exports.update = (req, res) => {
  try {
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        message: "Please provide inputs for update!"
      });
    }

    const id = req.params.id;
    Employee.updateById( id, new Employee(req.body), (err, result) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Employee with id ${id}.`
            });
          } else {
            res.status(500).send({
              message: err.message || "Error updating employee with id " + id
            });
          }
        } else res.status(200).send(result);
      }
    );
  } catch (error) {
    console.error(error);
    return res.status(400).send(error);
  }  
};

// Delete am emploee with the specified id in the request
exports.delete = (req, res) => {
  try {
    const id = req.params.id;
    Employee.remove(id, (err, result) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Prduct with id ${id}.`
          });
        } else {
          res.status(500).send({
            message: err.message || "Could not delete Employee with id " + id
          });
        }
      } else res.status(200).send({ message: `Employee was deleted successfully!` });
    });
  } catch (error) {
    console.error(error);
    return res.status(400).send(error);
  }  
};