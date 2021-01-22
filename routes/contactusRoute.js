const express = require('express');
var router = express.Router();
const checkAuth = require('../middleware/check-auth')
const contactusController = require('../controller/contactusController')
const { connection } = require('../db/db.js');

//Select All Data
router.get("/contactus", contactusController.contactus);
//delete All Data by id
router.delete("/contactdelete/:id", contactusController.contactdelete);
//Select All Data by id
router.get("/ContactDetail/:id", contactusController.ContactDetail);
//add row Data
router.post("/AddContact/", contactusController.AddContact);
//Update  Data by id
router.put("/Updatecontact/", contactusController.Updatecontact);
//Update status by id
router.put("/UpdateContactUsStatus/", contactusController.UpdateContactUsStatus);

//update-status-data
router.put("/update-contact-status-data/:id", contactusController.update_contact_status_data_by_id);

module.exports = router;