const sql = require("../config/db.js");

const OrderDetail = function(orderDetail) {                             //dummy values for DB fill up 
  this.orderID = orderDetail.orderID                          || 1+Math.floor(Math.random() * 10);
  // this.shipperID = order.shipperID                         || Math.floor(Math.random() * 10);
  // this.orderDate = order.orderDate                         || "2000-01-01";
  // this.productID = orderDetail.productID                      || Math.floor(Math.random() * 10);
  // this.unitPrice = orderDetail.unitPrice                      || Number((Math.random() * 100).toFixed(2));
  // this.quantity = orderDetail.quantity                        || Math.floor(Math.random() * 50);
  // this.discount = orderDetail.discount                        || Math.floor(Math.random() * 100);
  this.orderBasket = orderDetail.orderBasket                  || [{ "productID" : 1+Math.floor(Math.random() * 10),
                                                                    "unitPrice" : Number((Math.random() * 100).toFixed(2)),
                                                                    "quantity" : Math.floor(Math.random() * 50),
                                                                    "discount" : Math.floor(Math.random() * 100)
                                                                  },
                                                                  { "productID" : 1+Math.floor(Math.random() * 10),
                                                                    "unitPrice" : Number((Math.random() * 100).toFixed(2)),
                                                                    "quantity" : Math.floor(Math.random() * 50),
                                                                    "discount" : Math.floor(Math.random() * 100)
                                                                  }
                                                                ]
}


// Number((Math.random() * 100).toFixed(2))

// POST - create new orderDetail entry
OrderDetail.create = (newOrderDetail, result) => {
    newOrderDetail.orderBasket.forEach( (basketItem, indx) => {
      console.log("testas["+indx+"]");
      const inputValues = { "orderID" : newOrderDetail.orderID, ...basketItem};
      console.log(inputValues);
      sql.query("INSERT INTO orderDetails SET ?", inputValues, (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }
        console.log("orderDetail added to the DB: ", inputValues);
        // console.log(res);
        result(null, { inputValues });
      });
    });
  };

// GET - get all orderDetails entries
OrderDetail.getAll = (orderIDFragment, result) => {
    let query = "SELECT * FROM orderDetails";
  
    if (orderIDFragment) {
      query += ` WHERE orderID LIKE '%${orderIDFragment}%'`;
    }
  
    sql.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("OrderDetail list: ", res);
      result(null, res);
    });
  };  

// GET - get orderDetail by id
OrderDetail.getOrderDetailByID = (id, result) => {
  sql.query(`SELECT * FROM orderDetails WHERE orderID = ?`, id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found orderDetail: ", res[0]);
      result(null, res[0]);
      return;
    }

    // orderDetail with selected id not found
    result({ message: "orderDetail not_found" }, null);
  });
};

// PUT - update orderDetail
OrderDetail.updateById = (id, newData, result) => {
  sql.query(
    "UPDATE orderDetails SET orderID = ?, productID = ?, unitPrice = ?, quantity = ?, discount = ? WHERE orderID = ?",
    [newData.orderID, newData.productID, newData.unitPrice, newData.quantity, newData.discount, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found OrderDetail with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated orderDetail: ", { newData });
      result(null, { newData });
    }
  );
};

// DELETE - delete single OrderDetail by ID
OrderDetail.remove = (id, result) => {
  sql.query("DELETE FROM orderDetails WHERE orderID = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // OrderDetail with selected ID did not exist
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted orderDetail with id: ", id);
    result(null, res);
  });
};

// DELETE - delete all tutorials
OrderDetail.removeAll = result => {
  sql.query("DELETE FROM orderDetails", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} orderDetails`);
    result(null, res);
  });
};

  module.exports = OrderDetail;