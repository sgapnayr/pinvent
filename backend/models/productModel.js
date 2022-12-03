const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Product = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    Name: {
        type: String,
        required: [true, 'Please Add a Name.'],
        trim: true
    },
    Sku: {
        type: String,
        required: true,
        default: "SKU",
        trim: true
    },
    Category: {
        type: String,
        required: [true, 'Please Add a Category.'],
        trim: true
    },
    Quantity: {
        type: Number,
        required: [true, 'Please Add a Quantity.'],
        trim: true
    },
    Price: {
        type: Number,
        required: [true, 'Please Add a Price.'],
        trim: true
    },
    Description: {
        type: String,
        required: [true, 'Please Add a Description.'],
        trim: true
    },
    image: {
        type: Object,
        default: {}
    }
}, { timestamps: true })

module.exports = mongoose.model('Product', Product)