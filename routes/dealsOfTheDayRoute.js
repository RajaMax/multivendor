const express = require('express');
var router = express.Router();
const checkAuth = require('../middleware/check-auth')
const dealsOfTheDayController = require('../controller/dealsOfTheDayController');


//get product ratings
router.get("/getdealsOfTheDay",dealsOfTheDayController.get_deals_of_the_day);



module.exports = router;