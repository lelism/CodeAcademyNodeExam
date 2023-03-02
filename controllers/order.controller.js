const Order = require("../models/order.model.js");
const OrderDetail = require("../models/orderDetail.model.js");


// Create and Save a new Order
exports.create = (req, res) => {
  // Validate request
//   if (!req.body) {
//     res.status(400).send({
//       message: "Content can not be empty!"
//     });
//   }

  // Create a product
  // const newProductEntry = new Product({
  //   productName : req.body.productName || `Dummy product name ${Math.floor(Math.random() * 1000)}`,
  //   supplierID : req.body.supplierID || Math.floor(Math.random() * 1000),
  //   categoryID : req.body.categoryID || Math.floor(Math.random() * 1000),
  //   quantityPerUnit : req.body.quantityPerUnit || 1,
  //   unitPrice : req.body.unitPrice || Number((Math.random() * 100).toFixed(2))
  // });
  const newOrderEntry = new Order({
    // productName : req.body.productName,
    customerID : req.body.customerID,
    shipperID : req.body.shipperID,
    orderDate : req.body.orderDate
  });

  // Save Order in the database
  Order.create(newOrderEntry, (err, orderData) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while writting order data to DB."
      });
    else {
      console.log("reading new order details data:");
      const newOrderDetailEntry = new OrderDetail({
        orderID : orderData.orderID,
        // productID : req.body.productID,
        // unitPrice : req.body.unitPrice,
        // quantity : req.body.quantity,
        // discount : req.body.discount
        orderBasket : orderData.orderBasket
      });
      OrderDetail.create(newOrderDetailEntry, (detailsErr, orderDetailsData) => {
        if (detailsErr)
          res.status(500).send({
            message:
              err.message || "Some error occurred while writting order details data to DB."
          });
        else console.log("all good");
      });
      res.send(orderData);    
    }    
  });
};



// Retrieve all Orders from the database (with condition).
exports.findAll = (req, res) => {
    const idFragment = req.query.idFragment;
  
    Order.getAll(idFragment, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving orders."
        });
      else res.send(data);
    });
  };

// Retrieve selected Order by ID
exports.findByID = (req, res) => {
  const id = req.params.id;
  Order.getOrderByID(id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Order with id ${id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Order with id " + id
        });
      }
    } else res.send(data);
  });
};

// Update a order identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // console.log(req.body);
  const id = req.params.id;
  Order.updateById(
    id,
    new Order(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Order with id ${id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating order with id " + id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  Order.remove(id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Prduct with id ${id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Order with id " + id
        });
      }
    } else res.send({ message: `Order was deleted successfully!` });
  });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  Order.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Orders."
      });
    else res.send({ message: `All Orders were deleted successfully!` });
  });
};