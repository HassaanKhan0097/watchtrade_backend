const fs        = require("fs")
const Test   = require('../models/test');
const jwt 	    = require('jsonwebtoken');


exports.index = function (req, res) {
    
    console.log("asdasds");
    let images = [];
    var test = new Test();
    // test.userId          = req.user._id
    test.name            = req.body.name
    test.xHistory      = []
    test.save(function (err, test) {
        // if (err)
        //     res.statusCode = 400;
        //     res.json(err);
        // res.json({
        //     statusCode: 200,
        //     message: "test has been created, it is now in reveiw process!",
        //     data: test
        // });
        res.json("Successs");
    });
  

};