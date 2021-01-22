const express = require('express');
var router = express.Router();
const checkAuth = require('../middleware/check-auth')
const searchBarController = require('../controller/searchBarController')
const { connection } = require('../db/db.js');

//Select All Product,Category,subcategory Data
router.post("/fetch-search-product-data", searchBarController.fetch_search_product_data);

//Select All Brand Data
router.post("/fetch-search-Brand-data", searchBarController.fetch_search_brand_data);

//Select All voice Search Data
router.post("/fetch-voice-search-data", searchBarController.fetch_voice_search_data);


module.exports = router;