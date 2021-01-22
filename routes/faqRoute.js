const express = require('express');
var router = express.Router();
const checkAuth = require('../middleware/check-auth')
const faqController = require('../controller/faqController')
const { connection } = require('../db/db.js');

//Select All Data
router.get("/faq", faqController.faq);
//delete All Data by id
router.delete("/faqdelete/:id", faqController.faqdelete);
//Select All Data by id
router.get("/faqDetail/:id", faqController.faqDetail);
//add row Data
router.post("/createFaq/", faqController.createFaq);
//Update  Data by id
router.put("/UpdateFaq/", faqController.UpdateFaq);
//Update status by id
router.put("/UpdateFaqstatus/", faqController.UpdateFaqstatus);
//update-status-data
router.put("/update-faq-status-data/:id", faqController.update_faq_status_data_by_id);


module.exports = router;