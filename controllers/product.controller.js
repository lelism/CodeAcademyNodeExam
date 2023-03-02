const Product = require("../models/product.model.js");

// Create and Save a new Product
exports.create = (req, res) => {
  // TO DO validate inputs

  // Create a product
  const newData = {                             // dummy values for DB fill up
    productName : req.body.productName          || `Dummy product name ${Math.floor(Math.random() * 1000)}`,
    supplierID : req.body.supplierID            || Math.floor(Math.random() * 1000),
    categoryID : req.body.categoryID            || Math.floor(Math.random() * 1000),
    quantityPerUnit : req.body.quantityPerUnit  || 1,
    unitPrice : req.body.unitPrice              || Number((Math.random() * 100).toFixed(2))
  }

  const newProductEntry = new Product(newData);

  // Save Tutorial in the database
  Product.create(newProductEntry, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while writting product data to DB."
      });
    else res.send(data);
  });
};



// Retrieve all Products from the database (with condition).
exports.findAll = (req, res) => {
    console.log("testas12345");
    console.log(req.body);
    const nameFragment = req.query.nameFragment;
  
    Product.getAll(nameFragment, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving products."
        });
      else res.send(data);
    });
  };

// Retrieve selected Product by ID
exports.findByID = (req, res) => {
  const id = req.params.id;
  console.log("testas: "+req.body);
  Product.getProductByID(id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Product with id ${id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Product with id " + id
        });
      }
    } else res.send(data);
  });
};

// Update a product identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // console.log(req.body);
  const id = req.params.id;
  Product.updateById(
    id,
    new Product(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Product with id ${id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating product with id " + id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  Product.remove(id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Prduct with id ${id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Product with id " + id
        });
      }
    } else res.send({ message: `Product was deleted successfully!` });
  });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  Product.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Products."
      });
    else res.send({ message: `All Products were deleted successfully!` });
  });
};