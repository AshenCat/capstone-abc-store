const express = require('express');
//const app = express();
const server = express.Router();

const mongoose = require('mongoose');

let Model = require('../model/models');


/*******************************************************************
 * 
 * User
 * 
 *******************************************************************/


/**********************************
 * 
 * LOGIN
 * 
 **********************************/

server.route('/user/login').post((req, res) => {
    Model.userModel().findOne({
        username: req.body.username
    }).then((user)=>{
        console.log(user);
        return res.json(user)
    })
})

/**********************************
 * 
 * Register
 * 
 **********************************/

 server.route('/user/add-user').post((req,res,next)=> {
     Model.userModel().create(req.body, (error, data)=> {
         if(error) return next(error)
         else {
             res.json(data)
             console.log('Successfully added to the database: \n ' + data)
         }
     })
 })

/********************************************************************
 * 
 * Item
 * 
 ********************************************************************/

 server.route('/item/get-items').get((req,res,next)=>{
     Model.itemModel().find({}, (err, data) => {
        if(err){
            res.send('Something went wrong...');
        }
        else{
            res.json(data);
            console.log(data)
        }
     })
 })

 /**********************************
 * 
 * Add item
 * 
 **********************************/

 server.route('/item/add-item').post((req,res,next)=> {
    Model.itemModel().create(req.body, (error, data)=> {
        if(error) return next(error)
        else {
            res.json(data)
            console.log('Successfully added to the database: \n ' + data)
        }
    })
})

 /**********************************
 * 
 * Edit item
 * 
 **********************************/

 server.route('/item/edit-item/:id').put((req,res,next)=>{
     const id = mongoose.Types.ObjectId(req.params.id)
     console.log(id)
     console.log(req.body)
    Model.itemModel().findByIdAndUpdate(id, req.body, {new:true}, (err,data)=> {
        if(err) {
            console.log("update error: "+ err)
            return next(err)
        }
        else {
            console.log("update success: " + data)
            return res.json(data)
        }
    })
 })

 module.exports = server;

// .findByIdAndUpdate(req.param._id, req.body, {new: true}, (err, data)=> {
//     if (err) {
//         console.log("update error: " + err)
//         return next(err)
//     }
//     else{
//         console.log("update success: " + data);
//         return res.json(data);
//     }
// })