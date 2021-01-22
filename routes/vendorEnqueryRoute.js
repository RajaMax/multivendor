const express = require('express');
var router = express.Router();
const checkAuth = require('../middleware/check-auth')
const VendorEnqueryController = require('../controller/vendorEnqueryController')
const { connection } = require('../db/db.js');

//Select All Data
router.get("/VendorEnquiry", VendorEnqueryController.VendorEnquiry);
//Select All Data by id
router.get("/VendorEnquiryDetail/:id", VendorEnqueryController.VendorEnquiryDetail);
//add row Data
router.post("/AddVendorEnquery", VendorEnqueryController.AddVendorEnquery);

//Delete unit Value Data by Id
router.delete("/delete-vendor-enquery-data-by-id/:id", VendorEnqueryController.delete_vendor_enquery_data_by_id);

//Update  Data by id
router.put("/update_vendor_enquery_data_by_id", VendorEnqueryController.update_vendor_enquery_data_by_id);

module.exports = router;