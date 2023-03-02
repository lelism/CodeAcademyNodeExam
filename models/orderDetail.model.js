const sql = require("../config/db.js");

const OrderDetail = function(id, orderBasket) {        
  this.orderID = id,
  this.orderBasket = orderBasket
}

// POST - create new orderDetail entry
OrderDetail.create = async (newOrderDetail, result) => {
    newOrderDetail.orderBasket.forEach( async (basketItem) => {
      const inputValues = { "orderID" : newOrderDetail.orderID, ...basketItem};
      await sql.query("INSERT INTO orderDetails SET ?", inputValues, (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }
        console.log("New row at orderDetails table: ", inputValues);
      });
    });
    await result(null, newOrderDetail);
  };

  module.exports = OrderDetail;