const fs        = require("fs")
const Sell   = require('../models/sell');
const jwt 	    = require('jsonwebtoken');



exports.index = function (req, res) {
    
    console.log("index");
    Sell.find({}, function (err, requests) {
        if (err){
            console.log("err",err)
            res.statusCode = 400;
            res.json({err, success: false});
        }
        res.send(requests);  
    })
  

};

exports.create = function (req, res) {
    
    console.log("create");
    var sell = new Sell();
    sell.firstName           = req.body.firstName
    sell.lastName            = req.body.lastName
    sell.mobileNo            = req.body.mobileNo
    sell.email               = req.body.email
    sell.country             = req.body.country
    sell.brand               = req.body.brand
    sell.modelNo             = req.body.modelNo
    sell.details             = req.body.details
    
    
    sell.save(function (err, sell) {
        if (err) {
            res.statusCode = 400;
            res.json({err, success: false});
        }
        res.json({
            statusCode: 200,
            message: "Product sell request has been submitted, one of the representative will get back to you soon!",
            data: sell
        });
    });
  

};