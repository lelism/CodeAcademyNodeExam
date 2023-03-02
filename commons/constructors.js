const OrderDetails = function(data, orderBasket) {
    this.orderID = data[0].orderID,
    this.customerFirstName = data[0].firstName,
    this.customerLastName = data[0].lastName,
    this.customerAddress = data[0].address,
    this.customerCity = data[0].city,
    this.orderBasket = orderBasket,
    this.shipperName = data[0].shipperName,
    this.shipperPhone = data[0].shipperPhone
  }

module.exports = { OrderDetails }