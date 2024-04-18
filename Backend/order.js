const mongoose = require('mongoose');

const OrderSchema = mongoose.Schema({
    orderId: String,
    date: String,
    name: String,
    address: String,
    resturant: String,
    price: String
})

module.exports = mongoose.model("orders",OrderSchema);