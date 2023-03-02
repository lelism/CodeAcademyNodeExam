const Shipper = require("../models/shipper.model.js");
const { testInputValidity, createJsonMessage, randomMaxInt, randomMaxFloat} 
  = require("../commons/functions");

// Create and Save a new Shipper
exports.create = (req, res) => {
  try {
    //read inputs
    let receivedInputs = req.body;
    
    //  //Uncoment this section to fill up input by dummy values    
    receivedInputs = { 
      companyName : req.body.companyName    || `Dummy shipper ${randomMaxInt(100)}`,
      phone : req.body.phone                || randomMaxInt(10000000)
    }

    // input validation
    const requiredInputKeys = [
      "companyName",
      "phone"
    ];
    const invalidInputs = testInputValidity(receivedInputs, requiredInputKeys);
    if (invalidInputs) {
        const response = createJsonMessage(`Bad inputs for: ${invalidInputs}.`);
        return res.status(422).send(response);
    };

    // Save Tutorial in the database  
    const newShipperEntry = new Shipper(receivedInputs);

    Shipper.create(newShipperEntry, (err, result) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while writting shipper data to DB."
        });
      else res.send(result);
    });

  } catch (error) {
    console.error(error);
    return res.status(400).send(error);
  } 
};



// Retrieve all Shippers from the database (with condition).
exports.findAll = (req, res) => {
  try {
    const condition = req.body;
    if (Object.keys(condition).length > 1) {
        return res.status(400).send(createJsonMessage(`Bad search condition`));
    }
    Shipper.getAll(condition, (err, result) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving shippers."
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

// Retrieve selected Shipper by ID
exports.findByID = (req, res) => {
  try {
    const id = req.params.id;
    Shipper.getShipperByID(id, (err, result) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found shipper with id ${id}.`
          });
        } else {
          res.status(500).send({
            message: err.message || "Error retrieving shipper with id " + id
          });
        }
      } else res.status(200).send(result);
    });
  } catch (error) {
    console.error(error);
    return res.status(400).send(error);
  }
};

// Update a shipper identified by the id in the request
exports.update = (req, res) => {
  try {
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        message: "Please provide inputs for update!"
      });
    }

    const id = req.params.id;
    Shipper.updateById( id, new Shipper(req.body), (err, result) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Shipper with id ${id}.`
            });
          } else {
            res.status(500).send({
              message: err.message ||"Error updating shipper with id " + id
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

// Delete a Shipper with the specified id in the request
exports.delete = (req, res) => {
  try {
    const id = req.params.id;
    Shipper.remove(id, (err, result) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Prduct with id ${id}.`
          });
        } else {
          res.status(500).send({
            message: err.message || "Could not delete Shipper with id " + id
          });
        }
      } else res.status(200).send({ message: `Shipper was deleted successfully!` });
    });
  } catch (error) {
    console.error(error);
    return res.status(400).send(error);
  }
};