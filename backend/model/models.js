const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let User = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    access: {
        type: String,
        enum: ['Department Manager', 'Warehouse Associate', 'Store Clerk'],
        required: true
    }
})


/**
 * ADD MORE LATER
 * 
 * 
 * 
 * 
 * 
 * 
 * **/



let Item = new Schema({
    name: {
        type: String,
        required: true
    },
    vendor: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
    },
    price: {
        type: String,
        required: true
    },
    lastShipment: {
        type: Date,
    },
    isle: {
        type: String,
    },
})

module.exports = {
    userModel() {
        return mongoose.model('User', User)
    },
    itemModel() {
        return mongoose.model('Item', Item)
    }
}