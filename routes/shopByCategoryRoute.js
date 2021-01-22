const express = require('express');
var router = express.Router();
const checkAuth = require('../middleware/check-auth')
const shopByCategoryController = require('../controller/shopByCategoryController');


//get product ratings
router.post("/fetch_shop_by_category",shopByCategoryController.fetch_shop_by_category);



module.exports = router;