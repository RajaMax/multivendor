const express = require('express');
var router = express.Router();
const checkAuth = require('../middleware/check-auth')
const helpController = require('../controller/helpController')
const { connection } = require('../db/db.js');

//Select All Data
router.get("/helpEnquiry", helpController.helpEnquiry);
//Select All Data by id
router.get("/helpEnquiryDetail/:id", helpController.helpEnquiryDetail);
//delete All Data by id
router.delete("/helpEnquerydelete/:id", helpController.helpEnquerydelete);
//add row Data
router.post("/AddHelpEnquery/", helpController.AddHelpEnquery);
//Update  Data by id
router.put("/UpdateHelpEnquery/", helpController.UpdateHelpEnquery);
//Update status by id
router.put("/UpdateHelpEnqueryStatus/", helpController.UpdateHelpEnqueryStatus);


module.exports = router;