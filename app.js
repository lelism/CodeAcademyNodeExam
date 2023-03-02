const express = require("express");
const { error } = require("console"); 
require("dotenv").config();
require("./config/db");

const port = process.env.PORT || 4000;

const {startProductRoutes} = require("./routes/product.routes.js");
const {startEmployeeRoutes} = require("./routes/employee.routes.js");
const {startShipperRoutes} = require("./routes/shipper.routes.js");
const {startOrderRoutes} = require("./routes/order.routes.js");

console.clear();
const app = express();
app.use(express.json());

startProductRoutes(app);
startEmployeeRoutes(app);
startShipperRoutes(app);
startOrderRoutes(app);


// Version route
app.get("/version", (req, res) => {
    res.json({ version: "v0.1.3" });
  });

app.listen(port, () => {
    console.log("Server is listening at port " + port);
});