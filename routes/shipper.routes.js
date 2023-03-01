const Shipper = require("../models/shipper.model.js");

const startShipperRoutes = (app) => {
  const shippers = require("../controllers/shipper.controller.js");

  var router = require("express").Router();

  // Create a new Shipper entry
  router.post("/", shippers.create);

  // Retrieve all Shippers
  router.get("/", shippers.findAll);

  // Retrieve a single Shipper with id
  router.get("/:id", shippers.findByID);

  // Update a Shipper with id
  router.put("/:id", shippers.update);

  // Delete a Shipper with id
  router.delete("/:id", shippers.delete);
  
  // Delete all Shippers
  router.delete("/", shippers.deleteAll);

  app.use('/api/shippers', router);
}

module.exports = {
  startShipperRoutes
}