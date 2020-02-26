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

let Invoice = new Schema({
    vendor:{
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    received: {
        type: String,
    },
    upload: {
        type: String
    }
})

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

let Shipment = new Schema({
    received: {
        type: String
    },
    date: {
        type: Date,
        required: true
    },
    name: {
        type: String,
    },
    quantity: {
        type: Number,
        required: true
    },
    vendor: {
        type: String,
        required: true
    }
})

let Return = new Schema({
    vendor: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    reason: {
        type: String,
        required: true
    },
    imei: {
        type: String,
        required: true
    }
})

module.exports = {
    userModel() {
        return mongoose.model('User', User)
    },
    itemModel() {
        return mongoose.model('Item', Item)
    },
    invoiceModel() {
        return mongoose.model('Invoice', Invoice)
    },
    shipmentModel() {
        return mongoose.model('Shipment', Shipment)
    },
    returnModel() {
        return mongoose.model('Return', Return)
    }
}