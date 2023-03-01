const sql = require("../config/db.js");

const Shipper = function(shipper) {                    //dummy values for DB fill up 
    this.companyName = shipper.companyName          || `Dummy shipper name ${Math.floor(Math.random() * 1000)}`;
    this.phone = shipper.phone                      || Math.floor(Math.random() * 100000000);
}

// Number((Math.random() * 100).toFixed(2))

// POST - create new shipper entry
Shipper.create = (newShipper, result) => {
    sql.query("INSERT INTO shippers SET ?", newShipper, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      console.log("shipper added to the DB: ", { shipperID: res.insertId, ...newShipper });
      console.log(res);
      result(null, { shipperID: res.insertId, ...newShipper });
    });
  };

// GET - get all shippers entries
Shipper.getAll = (shipperNameFragment, result) => {
    let query = "SELECT * FROM shippers";
  
    if (shipperNameFragment) {
      query += ` WHERE companyName LIKE '%${shipperNameFragment}%'`;
    }
  
    sql.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("Shipper list: ", res);
      result(null, res);
    });
  };  

// GET - get shipper by id
Shipper.getShipperByID = (id, result) => {
  sql.query(`SELECT * FROM shippers WHERE shipperID = ?`, id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found shipper: ", res[0]);
      result(null, res[0]);
      return;
    }

    // shipper with selected id not found
    result({ message: "shipper not_found" }, null);
  });
};

// PUT - update shipper
Shipper.updateById = (id, newData, result) => {
  sql.query(
    "UPDATE shippers SET companyName = ?, phone = ? WHERE shipperID = ?",
    [newData.companyName, newData.phone, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Shipper with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated shipper: ", { shipperID: id, ...newData });
      result(null, { shipperID: id, ...newData });
    }
  );
};

// DELETE - delete single Shipper by ID
Shipper.remove = (id, result) => {
  sql.query("DELETE FROM shippers WHERE shipperID = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // Shipper with selected ID did not exist
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted shipper with id: ", id);
    result(null, res);
  });
};

// DELETE - delete all tutorials
Shipper.removeAll = result => {
  sql.query("DELETE FROM shippers", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} shippers`);
    result(null, res);
  });
};

  module.exports = Shipper;