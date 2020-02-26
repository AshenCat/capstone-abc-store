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

server.route('/user/get-users').get((req,res,next) => {
    Model.userModel().find({}, (err, data)=>{
        if(err) {
            //console.log(`Failed to load all users : ${err}`);
            return next(err)
        }
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
            //console.log("del err: " + err)
            return next(err)
        }
        else {
            //console.log("del success: " + id)
            return res.json(doc)
        }
    })
 })

/**********************************
 * 
 * LOGIN
 * 
 **********************************/

server.route('/user/login').post((req, res, next) => {
    Model.userModel().findOne({username: req.body.username}, (err,doc)=>{
        if (err) return next(err)
        else res.json(doc)
    })
})

/**********************************
 * 
 * Register
 * 
 **********************************/

 server.route('/user/add-user').post((req,res,next)=> {
     //console.log(req.body)
     Model.userModel().create(req.body, (error, data)=> {
         if(error) return next(error)
         else {
             res.json(data)
             //console.log('Successfully added to the database: \n ' + data)
         }
     })
 })

/********************************************************************
 * 
 * Item
 * 
 ********************************************************************/
 /**********************************
 * 
 * Get Item List
 * 
 **********************************/
 server.route('/item/get-items').get((req,res,next)=>{
     Model.itemModel().find({}, (err, data) => {
        if(err){
            res.send('Something went wrong...');
        }
        else{
            res.json(data);
            //console.log(data)
        }
     })
 })

 /**********************************
 * 
 * Add item
 * 
 **********************************/

 server.route('/item/add-item').put((req,res,next)=> {
    //console.log(req.body)
    Model.itemModel().create(req.body, (error, data)=> {
        if(error) return next(error)
        else {
            res.json(data)
            //console.log('Successfully added to the database: \n ' + data)
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
            //console.log("update error: "+ err)
            return next(err)
        }
        else {
            //console.log("update success: " + data)
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
            //console.log("del err: " + err)
            return next(err)
        }
        else {
            //console.log("del success: " + id)
            return res.json(doc)
        }
    })
 })

 /********************************************************************
 * 
 * Invoices
 * 
 ********************************************************************/

 /**********************************
 * 
 * Get Invoice List
 * 
 **********************************/

 server.route('/invoice/get-invoices').get((req,res,next) => {
     Model.invoiceModel().find({}, (err, doc) => {
        if(err) {
            //console.log("get err: " + err)
            return next(err)
        }
        else{
            //console.log("GET Invoice List...")
            return res.json(doc)
        }
     })
 })

/**********************************
 * 
 * add invoice
 * 
 **********************************/

 server.route('/invoice/add-invoice').put((req,res,next) => {
     console.log(req.body)
     Model.invoiceModel().create(req.body, (err, doc)=> {
        if (err) return next(err)
        else {
            //console.log('Successfully added to the database: \n ' + doc)
            res.json(doc)
        }
    }) 
 })

  /********************************************************************
 * 
 * SHIPMENTS?!
 * 
 ********************************************************************/
 /**********************************
 * 
 * Receive Shipment
 * 
 **********************************/

 server.route('/receive-shipment').post((req,res,next)=>{
     //console.log(req.body.vendor)
     Model.itemModel().findOne({'vendor':req.body.vendor, 'name': req.body.name}, (err,doc)=>{
         if(err) return next(err)
         else{
             //console.log(`Current Quantity: ${doc.stock}`)
             //console.log(`Current Date: ${doc.lastShipment}`)
             doc.stock = parseInt(doc.stock) + parseInt(req.body.quantity)
             doc.lastShipment = req.body.date
             doc.save((err,doc)=>{
                 if(err) {
                     console.log(`Receive Shipment error: ${err}`)
                     return next(err)
                    }
                //console.log(`New Stock Quantity: ${doc.stock}`)
                //console.log(`new date: ${doc.lastShipment}`)
                Model.shipmentModel().create(req.body, (err,doc2)=>{
                    if (err) return next(err)
                    else res.json(doc)
                })
             })
         }
     })
 })
 /********************************************************************
 * 
 * DEFECTIVES?!
 * 
 ********************************************************************/
 /**********************************
 * 
 * Return to Vendor
 * 
 **********************************/
 server.route('/return/vendor-return').put((req,res,next) => {
     console.log(req.body)
     Model.returnModel().create(req.body, (err, doc) => {
        if (err) return next(err)
        else res.json(doc)
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