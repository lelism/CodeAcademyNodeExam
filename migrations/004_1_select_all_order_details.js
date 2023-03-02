const selectOrderById = 
       `SELECT 
            o.orderID, 
            e.lastName, e.firstName, e.address, e.city, 
            od.productID, p.productName, p.categoryID, od.unitPrice, od.quantity, od.discount,
            s.companyName as shipperName, s.phone as shipperPhone 
        FROM orders o
        LEFT JOIN orderDetails od ON o.orderID = od.orderID 
        LEFT JOIN products p ON od.productID = p.productID 
        LEFT JOIN employees e ON o.customerID = e.employeeID 
        LEFT JOIN shippers s ON o.shipperID = s.shipperID 
        WHERE o.orderID = ?
        `;
        
module.exports = selectOrderById;
