const sql = require("../config/db.js");

const Order = function(order) {                             //dummy values for DB fill up 
  this.customerID = order.customerID                    || 1+Math.floor(Math.random() * 10);
  this.shipperID = order.shipperID                      || 1+Math.floor(Math.random() * 10);
  this.orderDate = order.orderDate                      || "2000-01-01";
  // this.productID = order.productID                      || Math.floor(Math.random() * 10);
  // this.unitPrice = order.unitPrice                      || Number((Math.random() * 100).toFixed(2));
  // this.quantity = order.quantity                        || Math.floor(Math.random() * 50);
  // this.discount = order.discount                        || Math.floor(Math.random() * 100);
}


// Number((Math.random() * 100).toFixed(2))

// POST - create new order entry
Order.create = (newOrder, result) => {
    sql.query("INSERT INTO orders SET ?", newOrder, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      console.log("order added to the DB: ", { orderID: res.insertId, ...newOrder });
      // console.log(res);
      result(null, { orderID: res.insertId, ...newOrder });
    });
  };

// GET - get all orders entries
Order.getAll = (orderIDFragment, result) => {
    let query = "SELECT * FROM orders";
  
    if (orderIDFragment) {
      query += ` WHERE orderID LIKE '%${orderIDFragment}%'`;
    }
  
    sql.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("Order list: ", res);
      result(null, res);
    });
  };  

// GET - get order by id
Order.getOrderByID = (id, result) => {
  sql.query(`SELECT * FROM orders WHERE orderID = ?`, id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found order: ", res[0]);
      result(null, res[0]);
      return;
    }

    // order with selected id not found
    result({ message: "order not_found" }, null);
  });
};

// PUT - update order
Order.updateById = (id, newData, result) => {
  sql.query(
    "UPDATE orders SET customerID = ?, employeeID = ?, orderDate WHERE orderID = ?",
    [newData.customerID, newData.employeeID, newData.orderDate, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
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
      result(null, err);
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

// DELETE - delete all tutorials
Order.removeAll = result => {
  sql.query("DELETE FROM orders", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} orders`);
    result(null, res);
  });
};

  module.exports = Order;