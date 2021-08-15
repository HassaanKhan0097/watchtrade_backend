const User = require('../models/user');

exports.index = function (req, res) {

    console.log("user controller index method called!")
    let parameters = {}
    if(Object.keys(req.body).length){
        parameters = req.body 
    }
    User.find(parameters, function (err, users) {
        if (err){
            res.statusCode = 400;
            res.json(err);
        }    
        res.send(users);
    });

};

exports.update = function (req, res) {
    User.findOne({_id: req.user._id}, function (err, users) {
        if (err)
            res.statusCode = 400;
            res.json(err);
        res.send(users);
    });
    
};
exports.delete = function (req, res) {
    
};
exports.updatePassword = function (req, res) {
    
};
exports.addToWatchList = async function (req, res) {
    let user = await User.findOne({_id: req.user._id}, function (err, users) {
        if (err)
            res.statusCode = 400;
            res.json(err);
    });
    if(user.watchList.length ==0){
        user.watchList = []
    }
    user.watchList.push(req.body.productId)
    await user.save(function (err, user) {
        if (err)
            res.statusCode = 400;
            res.json(err);
        res.json({
            statusCode: 200,
            message: "Added to Watchlist",
            watchList: user
        });
    })
};


// exports.pushNoti = async function (req, res) {

//     console.log("req.body", req.body);
//         product = await Product.findOne({_id: req.body.productId}, function (err) {
//             if (err){
//                 res.statusCode = 400;
//                 res.json({err, success: false});
//             }
//         });

//         user    = await User.findOne({_id: req.user._id}, function (err) {
//             if (err){
//                 res.statusCode = 400;
//                 res.json({err, success: false});
//             }
//         });

//         console.log("product", product);


//     product.bidHistory.push({
//         userId      : req.user._id,
//         bidAmount   : req.body.bidAmount,
//         bidTime     :  new Date(),
//         status      : "pending",
//     })
//     user.bidsList.push({
//         productId   : req.body.productId,
//         bidAmount   : req.body.bidAmount,
//         bidTime     :  new Date(),
//         status      : "pending",
//     })

//     console.log("after update -->",product)
//     console.log("after update -->",user)

//     product.save(function (err) {
//         if (err)
//         {
//             console.log("product err->",err)
//             res.statusCode = 400;
//             res.json({err, success: false});
//         } else {

//             user.save(function (_err) {
//                 if (_err){
//                     console.log("user err->",_err)
//                     res.statusCode = 400;
//                     res.json({_err, success: false});
//                 } else {
//                     res.json({
//                         statusCode: 200,
//                         message: "Bid has been submitted!",
//                         data: product
//                     });
//                 }

//             })

//         }

//     });
// };