const sql = require("../config/db.js");
const mysql = require("mysql");

const Product = function(product) {                     
  this.productName = product.productName,          
  this.supplierID = product.supplierID,            
  this.categoryID = product.categoryID,            
  this.quantityPerUnit = product.quantityPerUnit,  
  this.unitPrice = product.unitPrice              
}

// POST - create new product entry
Product.create = (newProduct, result) => {
  sql.query("INSERT INTO products SET ?", newProduct, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("Product added to the DB: ", { productID: res.insertId, ...newProduct });
    result(null, { productID: res.insertId, ...newProduct });
  });
};

// GET - get all products entries
Product.getAll = (condition, result) => {
  let query = "SELECT * FROM products";  
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
    console.log("Retrieved product list: ", res);
    result(null, res);
  });
};  

// GET - get product by id
Product.getProductByID = (id, result) => {
  sql.query(`SELECT * FROM products WHERE productID = ?`, id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (!res.length) {
        // product with selected id not found
        result({ message: "product not_found" }, null);
      return;
    }

    console.log("found product: ", res[0]);
    result(null, res[0]);
  });
};

// PUT - update product
Product.updateById = (id, newData, result) => {
  sql.query(
    `UPDATE products 
     SET productName = ?, supplierID = ?, categoryID = ?, quantityPerUnit = ?, unitPrice = ? 
     WHERE productID = ?`,
      [
        newData.productName, 
        newData.supplierID, 
        newData.categoryID, 
        newData.quantityPerUnit, 
        newData.unitPrice, 
        id
      ],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Product with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated product: ", { productID: id, ...newData });
      result(null, { productID: id, ...newData });
    }
  );
};

// DELETE - delete single Product by ID
Product.remove = (id, result) => {
  sql.query("DELETE FROM products WHERE productID = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.affectedRows == 0) {
      // Product with selected ID did not exist
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted product with id: ", id);
    result(null, res);
  });
};

  module.exports = Product;