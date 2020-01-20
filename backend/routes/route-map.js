const express = require('express');
//const app = express();
const server = express.Router();

let Model = require('../model/models');

/**********************************
 * 
 * LOGIN
 * 
 **********************************/

server.route('/login').post((req, res) => {
    Model.userModel().findOne({
        username: req.body.username
    }).then((user)=>{
        //console.log(user);
        if(!user) {
            return res.status(404).json({error: 'Auth Failed'});
        }
        else if (user.password === req.body.password) {
            return res.json(user)
        }
        else
            return res.status(404).json({error: 'Auth Failed'});
    })
})

/**********************************
 * 
 * Register
 * 
 **********************************/

 server.route('/add-user').post((req,res,next)=> {
     Model.userModel().create(req.body, (error, data)=> {
         if(error) return next(error)
         else {
             res.json(data)
             console.log('Successfully added to the database: \n ' + data)
         }
     })
 })



 module.exports = server;