const Product = require("../models/product.model.js");
const { testInputValidity, createJsonMessage, randomMaxInt, randomMaxFloat} 
  = require("../commons/functions");

// Create and Save a new Product
exports.create = (req, res) => {
  try {
    //read inputs
    let receivedInputs = req.body;
    
    //  //Uncoment this section to fill up input by dummy values    
    // receivedInputs = {                             
    //   productName : req.body.productName          || `Dummy name ${randomMaxInt(1000)}`,
    //   supplierID : req.body.supplierID            || randomMaxInt(10),
    //   categoryID : req.body.categoryID            || randomMaxInt(10),
    //   quantityPerUnit : req.body.quantityPerUnit  || randomMaxInt(50),
    //   unitPrice : req.body.unitPrice              || randomMaxFloat(1000)
    // }

    // input validation
    const requiredInputKeys = [
      "productName",
      "supplierID",
      "categoryID",
      "quantityPerUnit",
      "unitPrice"
    ];
    const invalidInputs = testInputValidity(receivedInputs, requiredInputKeys);
    if (invalidInputs) {
        const response = createJsonMessage(`Bad inputs for: ${invalidInputs}.`);
        return res.status(422).send(response);
    };

    // Save product row in the database
    const newProductEntry = new Product(receivedInputs);

    Product.create(newProductEntry, (err, result) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while writting product data to DB."
        });
      else res.status(201).send(result);
    });

  } catch (error) {
    console.error(error);
    return res.status(400).send(error);
  }  
};



// Retrieve all Products from the database (with condition).
exports.findAll = (req, res) => {
  try {
    const condition = req.body;
    if (Object.keys(condition).length > 1) {
        return res.status(400).send(createJsonMessage(`Bad search condition`));
    }
    Product.getAll(condition, (err, result) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving products."
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

// Retrieve selected Product by ID
exports.findByID = (req, res) => {
  try {
    const id = req.params.id;
    Product.getProductByID(id, (err, result) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Product with id ${id}.`
          });
        } else {
          res.status(500).send({
            message: err.message || "Error retrieving Product with id " + id
          });
        }
      } else res.status(200).send(result);
    });
  } catch (error) {
    console.error(error);
    return res.status(400).send(error);
  }
};

// Update a product identified by the id in the request
exports.update = (req, res) => {
  try {
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        message: "Please provide inputs for update!"
      });
    }

    const id = req.params.id;
    Product.updateById( id, new Product(req.body), (err, result) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Product with id ${id}.`
            });
          } else {
            res.status(500).send({
              message: err.message ||"Error updating product with id " + id
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

// Delete a product with the specified id in the request
exports.delete = (req, res) => {
  try {
    const id = req.params.id;
    Product.remove(id, (err, result) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Prduct with id ${id}.`
          });
        } else {
          res.status(500).send({
            message: err.message || "Could not delete Product with id " + id
          });
        }
      } else res.status(200).send({ message: `Product was deleted successfully!` });
    });
  } catch (error) {
    console.error(error);
    return res.status(400).send(error);
  }
};