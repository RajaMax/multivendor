const express = require('express');
var router = express.Router();
const checkAuth = require('../middleware/check-auth')
const vedorRengeController = require('../controller/vedorRengeController')
const { connection } = require('../db/db.js');

//Select All Data by id
router.get("/range/:vendor_range_id", vedorRengeController.range);
//delete All Data by id
//add row Data
router.post("/AddRange/", vedorRengeController.AddRange);


module.exports = router;