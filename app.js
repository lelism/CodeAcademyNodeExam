const express = require("express");
require("dotenv").config();
require("./config/db");

const {startProductRoutes} = require("./routes/product.routes.js");
const {startEmployeeRoutes} = require("./routes/employee.routes.js");
const {startShipperRoutes} = require("./routes/shipper.routes.js");
const {startOrderRoutes} = require("./routes/order.routes.js");

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());

startProductRoutes(app);
startEmployeeRoutes(app);
startShipperRoutes(app);
startOrderRoutes(app);

app.listen(port, () => {
    console.log("Server is listening at port " + port);
});

// connection.end(function(err) {
//     if (err) {
//       return console.log('error:' + err.message);
//     }
//     console.log('Close the database connection.');
//   });