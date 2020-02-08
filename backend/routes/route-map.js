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
 * Get user list
 * 
 **********************************/

server.route('/user/get-users').get((req,res) => {
    Model.userModel().find({}, (err, data)=>{
        if(err) console.log(`Failed to load all users : ${err}`);
        else res.json(data)
    })
})

/**********************************
 * 
 * delete user
 * 
 **********************************/

server.route('/user/delete-user/:id').delete((req,res,next)=>{
    const id = mongoose.Types.ObjectId(req.params.id)
    Model.userModel().findByIdAndDelete(id, (err, doc)=> {
        if(err) {
            console.log("del err: " + err)
            return next(err)
        }
        else {
            console.log("del success: " + id)
            return res.json(doc)
        }
    })
 })

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
     console.log(req.body)
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

 server.route('/item/add-item').put((req,res,next)=> {
    console.log(req.body)
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
    //  console.log(id)
    //  console.log(req.body)
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

  /**********************************
 * 
 * Delete item
 * 
 **********************************/

 server.route('/item/delete-item/:id').delete((req,res,next)=>{
    const id = mongoose.Types.ObjectId(req.params.id)
    Model.itemModel().findByIdAndDelete(id, (err, doc)=> {
        if(err) {
            console.log("del err: " + err)
            return next(err)
        }
        else {
            console.log("del success: " + id)
            return res.json(doc)
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