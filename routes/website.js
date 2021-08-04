
var express 					= require('express');
var router 						= express.Router();
var productsController 	        = require('../controllers/productsController')
var leadsController 	        = require('../controllers/leadsController')
var sellController 	            = require('../controllers/sellController')

router.route('/products')               .get(productsController.index)
router.route('/leads/create')           .post(leadsController.create)

router.route('/sell/create')            .post(sellController.create)

module.exports = router;
