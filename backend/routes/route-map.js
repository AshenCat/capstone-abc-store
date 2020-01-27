const express = require('express');
//const app = express();
const server = express.Router();

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

 server.route('/item/get-item').get((req,res,next)=>{
     Model.itemModel().find({}, (err, data) => {
        if(err){
            res.send('Something went wrong...');
        }
        else
            res.json(data);
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
 * Add item
 * 
 **********************************/

 module.exports = server;