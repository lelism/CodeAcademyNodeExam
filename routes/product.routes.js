const Product = require("../models/product.model.js");

const startProductRoutes = (app) => {
  const products = require("../controllers/product.controller.js");

  var router = require("express").Router();

  // Create a new Product entry
  router.post("/", products.create);

  // Retrieve all Products
  router.get("/", products.findAll);

  // Retrieve a single Product with id
  router.get("/:id", products.findByID);

  // Update a Product with id
  router.put("/:id", products.update);

  // Delete a Product with id
  router.delete("/:id", products.delete);

  app.use('/api/products', router);
}

module.exports = { startProductRoutes }