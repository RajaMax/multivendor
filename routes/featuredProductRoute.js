const express = require('express');
var router = express.Router();
const checkAuth = require('../middleware/check-auth')
const featuredProductController = require('../controller/featuredProductController');


//get product ratings
router.get("/featured_product",featuredProductController.get_featured_product);



module.exports = router;