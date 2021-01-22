const express = require('express');
var router = express.Router();
const checkAuth = require('../middleware/check-auth')
const ratingAndFeedbackController = require('../controller/ratingAndFeedbackController')
const { connection } = require('../db/db.js');


//Select All Data by product id
router.get("/ratingAndFeedbackList/:id", ratingAndFeedbackController.ratingAndFeedbackList);


module.exports = router;