const sql = require("../config/db.js");
const mysql = require("mysql");

const Shipper = function(shipper) {
    this.companyName = shipper.companyName,
    this.phone = shipper.phone
}

// POST - create new shipper entry
Shipper.create = (newShipper, result) => {
  sql.query("INSERT INTO shippers SET ?", newShipper, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("shipper added to the DB: ", { shipperID: res.insertId, ...newShipper });
    result(null, { shipperID: res.insertId, ...newShipper });
  });
};

// GET - get all shippers entries
Shipper.getAll = (condition, result) => {
  let query = "SELECT * FROM shippers";
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
    console.log("Retrieved shipper list: ", res);
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

    if (!res.length) {
        // shipper with selected id not found
        result({ message: "shipper not_found" }, null);
      return;
    }

    console.log("found shipper: ", res[0]);
    result(null, res[0]);
  });
};

// PUT - update shipper
Shipper.updateById = (id, newData, result) => {
  sql.query(
    `UPDATE shippers 
     SET companyName = ?, phone = ? WHERE shipperID = ?`,
      [
        newData.companyName, 
        newData.phone, 
        id
      ],
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
      result(err, null);
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

  module.exports = Shipper;