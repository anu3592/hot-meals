const mongoose = require('mongoose');

const restSchema = mongoose.Schema({
    name:String,
    address: String,
    owner: String,
    contact: String,
    email: String,
    moto: String,
    password:String,
    image: {
        data: Buffer,
        contentType: String
    },
})

module.exports = mongoose.model('resturants', restSchema);