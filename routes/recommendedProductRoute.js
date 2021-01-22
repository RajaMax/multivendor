const express = require('express');
var router = express.Router();
const checkAuth = require('../middleware/check-auth')
const recommendedProductController = require('../controller/recommendedProductController');


//get product ratings
router.get("/recommended_product",recommendedProductController.get_recommended_product);



module.exports = router;