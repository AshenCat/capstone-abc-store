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
        enum: ['departmentManager', 'warehouseAssociate', 'clerk'],
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



//let items = new Schema

module.exports = {
    userModel() {
        return mongoose.model('User', User)
    }
}