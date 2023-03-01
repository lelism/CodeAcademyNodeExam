const Order = require("../models/order.model.js");
const OrderDetail = require("../models/orderDetail.model.js");

const startOrderRoutes = (app) => {
  const orders = require("../controllers/order.controller.js");

  var router = require("express").Router();

  // Create a new Order entry
  router.post("/", orders.create);

  // Retrieve all Orders
  router.get("/", orders.findAll);

  // Retrieve a single Order with id
  router.get("/:id", orders.findByID);

  // Update a Order with id
  router.put("/:id", orders.update);

  // Delete a Order with id
  router.delete("/:id", orders.delete);
  
  // Delete all Orders
  router.delete("/", orders.deleteAll);

  app.use('/api/orders', router);
}

module.exports = {
  startOrderRoutes
}