const sql = require("../config/db.js");
const mysql = require("mysql");
const { OrderDetails } = require("../commons/constructors");


const Order = function(order) {
  this.customerID = order.customerID,
  this.shipperID = order.shipperID,
  this.orderDate = order.orderDate
}

// POST - create new order entry
Order.create = (newOrder, result) => {
    sql.query("INSERT INTO orders SET ?", newOrder, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      console.log("New row at orders table: ", { orderID: res.insertId, ...newOrder });
      result(null, { orderID: res.insertId, ...newOrder });
    });
  };

// GET - get all orders entries
Order.getAll = (condition, result) => {
    let query = "SELECT * FROM orders";
    if (Object.keys(condition).length) {
      query += ' WHERE ? LIKE "%?%"';
      query = mysql.format(query, 
        [String(Object.keys(condition)[0]), Object.values(condition)[0]]).replace(/'/g, "");
    }
  
    sql.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }      
      if (res.length == 0) {
        console.log("No entries found");
        result(null, null);
        return;
      }
      console.log("Retrieved order list: ", res);
      result(null, res);
    });
  };  

// GET - get order by id
Order.getOrderByID = (id, result) => {
  const selectOrderById = require("../migrations/004_1_select_all_order_details");
  sql.query(selectOrderById, id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (!res.length) {
      // product with selected id not found
      result({ message: "order not_found" }, null);
      return;
    }
    
    const orderBasket = [];
    res.forEach(orderItem => {
      orderBasket.push(
        {
          "productID" : orderItem.productID,
          "productName" : orderItem.productName,
          "product_category" : orderItem.categoryID,
          "unitPrice" : orderItem.unitPrice,
          "quantity" : orderItem.quantity,
          "discount" : orderItem.discount,
          "cost" : Number((orderItem.unitPrice * orderItem.quantity * (100-orderItem.discount) * 0.01).toFixed(2))
        });
    });
    const formatedOrder = new OrderDetails (res, orderBasket);
 
    console.log("found order: ", formatedOrder);
    result(null, formatedOrder);    
  });
};

// PUT - update order
Order.updateById = (id, newData, result) => {
  sql.query(
    "UPDATE orders SET customerID = ?, shipperID = ?, orderDate = ? WHERE orderID = ?",
    [newData.customerID, newData.shipperID, newData.orderDate, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Order with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated order: ", { orderID: id, ...newData });
      result(null, { orderID: id, ...newData });
    }
  );
};

// DELETE - delete single Order by ID
Order.remove = (id, result) => {
  sql.query("DELETE FROM orders WHERE orderID = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result( err, null );
      return;
    }

    if (res.affectedRows == 0) {
      // Order with selected ID did not exist
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted order with id: ", id);
    result(null, res);
  });
};

// DELETE - delete all Order records
Order.removeAll = result => {
  sql.query("DELETE FROM orders", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log(`deleted ${res.affectedRows} orders`);
    result(null, res);
  });
};

  module.exports = Order;