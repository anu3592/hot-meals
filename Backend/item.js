const mongoose = require('mongoose');

const itemSchema = mongoose.Schema({
    name:String,
    price:String,
    category:String,
    restor:String,
    desc:String,
    img: {
        data: Buffer,
        contentType: String,
    },
});

module.exports = mongoose.model('items',itemSchema);