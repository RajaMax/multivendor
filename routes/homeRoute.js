const express = require('express');
var router = express.Router();
// const checkAuth = require('../middleware/check-auth')
const homeController = require('../controller/homeController')



//Fetch All Product Data
router.get("/fetch-all-mbl-home-screen-api-details", homeController.fetch_all_mbl_home_screen_api_details);


module.exports = router;
