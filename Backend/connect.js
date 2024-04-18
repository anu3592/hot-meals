const mongoose = require('mongoose');

const saveSchema = mongoose.Schema({
    name:String,
    email:String,
    address: String,
    password:String
});

module.exports = mongoose.model('users', saveSchema);