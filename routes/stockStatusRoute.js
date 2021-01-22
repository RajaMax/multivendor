const express = require('express');
var router = express.Router();
var multer = require('multer');
const path = require('path');

router.use(express.static(path.join(__dirname, '/public')));

const checkAuth = require('../middleware/check-auth')
const stockStatusController = require('../controller/stockStatusController')



//Fetch All stock status Data
router.get("/fetch-all-stock-status-data", stockStatusController.fetch_all_stock_status_data);





module.exports = router;