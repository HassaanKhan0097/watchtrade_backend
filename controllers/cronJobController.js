const User      = require('../models/user');
const Product   = require('../models/product');
const bcrypt    = require("bcrypt")
const jwt 	    = require('jsonwebtoken');
const nodemailer= require('nodemailer');

function generateAccessToken(userObj) {
    // > console.log(Buffer.from("Hello World").toString('base64'));
    // SGVsbG8gV29ybGQ=
    // > console.log(Buffer.from("SGVsbG8gV29ybGQ=", 'base64').toString('ascii'))
    // Hello World
	return Buffer.from(jwt.sign(userObj, process.env.TOKEN_SECRET)).toString('base64');
}

// Email Configuration  
var hostEmail = process.env.EMAIL;
var transport = nodemailer.createTransport({
	host: process.env.EMAIL_HOST,
	port: process.env.EMAIL_PORT,
    secure: true, // use SSL
	auth: {
		user: process.env.EMAIL,
		pass: process.env.EMAIL_PASSWORD
	}
});

exports.index = async function () {

    let products = await Product.find({
        $and: [
            {status: "live"},
            {auctionExpireAt: {$lt: new Date()}}
            // { $or: [{a: 1}, {b: 1}] },
            // { $or: [{c: 1}, {d: 1}] }
        ]
    })//.populate('user')

    products.forEach(async (product) => {

        let index           = product.bidHistory.length-1
        let winner          = product.bidHistory[index]
        let user            = await User.findOne({_id: winner.userId})

        //Set product status to finished (awaiting to sold or remain finished if not sold)
        product.status = "finished";
        
        //Set product bid history status to win
        product.bidHistory[index].status = "win";

        //Save the product now with updated statuse
        product.save(function (err) {
            if (err)
            {
                console.log("product status updation err->", err)

            } else {

                //Set user bid history to win
                let index = user.bidsList.findIndex( bid => bid.productId.equals(product._id) );
                user.bidsList[index].status = "win";

                //add notification
                user.notiList.push({
                    productId       : product._id,
                    productFullname : product.brand + ': ' + product.name + ' - ' + product.modelNo,
                    productImage    : product.images[0],
                    text            : "You just won a bid.",
                    time            : new Date(),
                    status          : "unread",
                })

                user.save(function(err2){
                    if (err) {
                        console.log("product status updation success but user bidsList status or notiList updation failed ->", err2)
                    } else {
                        console.log("Success -->", index);
                    }
                })
      
            }
        });














        // let confirmationCode= generateAccessToken({userId: user._id, productId: product._id})
        // const message = {
        // 	from: hostEmail,
        // 	to: user.email, // Receiver Email
        // 	subject: 'Congratulation! You Win The Auction',
        // 	html: ` <h4><b>Confirmation Email</b></h4>
        //             <p> 
        //                 Your Confirmation URL is: 
        //                 <a href="`+process.env.BASE_URL+confirmationCode+`">Click Here</a>
        //             </p>
        //             <br><br>
        //             <p>Watch Trade</p>`
        // };
        // transport.sendMail(message, async function(err, info) {
        // 	if (err) {
        //         console.log(err)
        // 	} else {
        //         let _product = await Product.findOne({_id: product._id})
        //         _product.confirmationCode = confirmationCode
        //         _product.save(function (err, product) {
        //             if (err)
        //                 console.log(err);
        //         });
        //         console.log(info)
        // 	}
        // });

    });

    console.log("working on These Products ---- -------  -- ");
    console.log(products);

};