const sql = require("../config/db.js");

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
      console.log("product added to the DB: ", { productID: res.insertId, ...newProduct });
      console.log(res);
      result(null, { productID: res.insertId, ...newProduct });
    });
  };

// GET - get all products entries
Product.getAll = (productNameFragment, result) => {
    let query = "SELECT * FROM products";
  
    if (productNameFragment) {
      query += ` WHERE productName LIKE '%${productNameFragment}%'`;
    }
  
    sql.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      // console.log("Product list: ", res);
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

    if (res.length) {
      console.log("found product: ", res[0]);
      result(null, res[0]);
      return;
    }

    // product with selected id not found
    result({ message: "product not_found" }, null);
  });
};

// PATCH - update product
Product.updateById = (id, newData, result) => {
  sql.query(
    "UPDATE products SET productName = ?, supplierID = ?, categoryID = ?, quantityPerUnit = ?, unitPrice = ? WHERE productID = ?",
    [newData.productName, newData.supplierID, newData.categoryID, newData.quantityPerUnit, newData.unitPrice, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
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
      result(null, err);
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

// DELETE - delete all tutorials
Product.removeAll = result => {
  sql.query("DELETE FROM products", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} products`);
    result(null, res);
  });
};

  module.exports = Product;