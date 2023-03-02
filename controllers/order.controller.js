const Order = require("../models/order.model.js");
const OrderDetail = require("../models/orderDetail.model.js");
const { testInputValidity, createJsonMessage, randomMaxInt, randomMaxFloat} = require("../commons/functions");


// Create and Save a new Order
exports.create = (req, res) => {
  try {
    //read inputs
    let receivedInputs = req.body;

    // //Uncoment this section to fill up input by dummy values    
    // receivedInputs = {
    //   customerID : req.body.customerID    || randomMaxInt(10),
    //   shipperID : req.body.shipperID      || randomMaxInt(10),
    //   orderDate : req.body.orderDate      || "1900-01-01",
    //   orderBasket : req.body.orderBasket  || [{ productID : randomMaxInt(10), 
    //                                             unitPrice : randomMaxFloat(100), 
    //                                             quantity : randomMaxInt(10), 
    //                                             discount : randomMaxInt(1000)
    //                                           },
    //                                           { productID : randomMaxInt(10), 
    //                                             unitPrice : randomMaxFloat(100), 
    //                                             quantity : randomMaxInt(10), 
    //                                             discount : randomMaxInt(1000)
    //                                           }]
    // };

    // input validation
    const requiredInputKeys = [
      "customerID",
      "shipperID",
      "orderDate",
      "orderBasket"
    ];
    const invalidInputs = testInputValidity(receivedInputs, requiredInputKeys);
    if (invalidInputs) {
        const response = createJsonMessage(`Bad inputs for: ${invalidInputs}.`);
        return res.status(422).send(response);
    };

    // Save Order in the database
    const newOrderEntry = new Order(receivedInputs);

    Order.create(newOrderEntry, (err, orderData) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while writting order data to DB."
        });
      else {
        const newOrderDetailEntry = new OrderDetail(orderData.orderID, receivedInputs.orderBasket);
        OrderDetail.create(newOrderDetailEntry, (detailsErr, orderDetailsData) => {
          if (detailsErr)
            res.status(500).send({
              message:
                detailsErr.message || "Some error occurred while writting order details data to DB."
            });
          else {
            console.log("result: ", {...orderData, ...orderDetailsData});
            res.status(201).send({...orderData, ...orderDetailsData});
          }
        });
      }    
    });

  } catch (error) {
    console.error(error);
    return res.status(400).send(error);
  }  
};

// Retrieve all Orders from the database (with condition).
exports.findAll = (req, res) => {
  try {
    const condition = req.body;
    if (Object.keys(condition).length > 1) {
        return res.status(400).send(createJsonMessage(`Bad search condition`));
    }
    Order.getAll(condition, (err, result) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving orders."
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

// Retrieve selected Order by ID
exports.findByID = (req, res) => {
  try {
    const id = req.params.id;
    Order.getOrderByID(id, (err, result) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Order with id ${id}.`
          });
        } else {
          res.status(500).send({
            message: err.sqlMessage || "Error retrieving Order with id " + id
          });
        }
      } else res.status(200).send(result);
    });
  } catch (error) {
    console.error(error);
    return res.status(400).send(error);
  }
};

// Update a order identified by the id in the request
exports.update = (req, res) => {
  try {
    //Validate Request
    if (!req.body) {
      res.status(400).send({
        message: "Please provide inputs for update!"
      });
    }

    const id = req.params.id;
    Order.updateById( id, new Order(req.body), (err, result) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Order with id ${id}.`
            });
          } else {
            res.status(500).send({
              message: err.message || "Error updating order with id " + id
            });
          }
        } else res.status(201).send(result);
      }
    );
  } catch (error) {
    console.error(error);
    return res.status(400).send(error);
  }
};

// Delete a Order with the specified id in the request
exports.delete = (req, res) => {
  try {
    const id = req.params.id;
    Order.remove(id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Prduct with id ${id}.`
          });
        } else {
          res.status(500).send({
            message: err.message || "Could not delete Order with id " + id
          });
        }
      } else res.status(200).send({ message: `Order was deleted successfully!` });
    });
  } catch (error) {
    console.error(error);
    return res.status(400).send(error);
  }
};

// Delete all Order records from the database.
exports.deleteAll = (req, res) => {
  try {
    Order.removeAll((err, result) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all Orders."
        });
      else res.status(200).send({ message: `All Orders were deleted successfully!` });
    });
  } catch (error) {
    console.error(error);
    return res.status(400).send(error);
  }  
};