const express = require("express");
require("dotenv").config();
require("./config/db");

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());


app.listen(port, () => {
    console.log("Server is listening at port " + port);
});

// connection.end(function(err) {
//     if (err) {
//       return console.log('error:' + err.message);
//     }
//     console.log('Close the database connection.');
//   });