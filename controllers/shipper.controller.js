const Shipper = require("../models/shipper.model.js");

// Create and Save a new Shipper
exports.create = (req, res) => {
  // Validate request
//   if (!req.body) {
//     res.status(400).send({
//       message: "Content can not be empty!"
//     });
//   }

  // Create a shipper
  // const newShipperEntry = new Shipper({
  //   shipperName : req.body.shipperName || `Dummy shipper name ${Math.floor(Math.random() * 1000)}`,
  //   supplierID : req.body.supplierID || Math.floor(Math.random() * 1000),
  //   categoryID : req.body.categoryID || Math.floor(Math.random() * 1000),
  //   quantityPerUnit : req.body.quantityPerUnit || 1,
  //   unitPrice : req.body.unitPrice || Number((Math.random() * 100).toFixed(2))
  // });
  const newShipperEntry = new Shipper({
    companyName : req.body.companyName,
    phone : req.body.phone
  });

  // Save Tutorial in the database
  Shipper.create(newShipperEntry, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while writting shipper data to DB."
      });
    else res.send(data);
  });
};



// Retrieve all Shippers from the database (with condition).
exports.findAll = (req, res) => {
    const nameFragment = req.query.nameFragment;
  
    Shipper.getAll(nameFragment, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving shippers."
        });
      else res.send(data);
    });
  };

// Retrieve selected Shipper by ID
exports.findByID = (req, res) => {
  const id = req.params.id;
  Shipper.getShipperByID(id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Shipper with id ${id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Shipper with id " + id
        });
      }
    } else res.send(data);
  });
};

// Update a shipper identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // console.log(req.body);
  const id = req.params.id;
  Shipper.updateById(
    id,
    new Shipper(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Shipper with id ${id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating shipper with id " + id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  Shipper.remove(id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Prduct with id ${id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Shipper with id " + id
        });
      }
    } else res.send({ message: `Shipper was deleted successfully!` });
  });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  Shipper.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Shippers."
      });
    else res.send({ message: `All Shippers were deleted successfully!` });
  });
};