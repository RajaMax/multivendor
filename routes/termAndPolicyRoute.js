const express = require('express');
var router = express.Router();
const checkAuth = require('../middleware/check-auth')
const termAndPolicyController = require('../controller/termAndPolicyController')
const { connection } = require('../db/db.js');

//Select All Data
router.get("/termPolicy", termAndPolicyController.termPolicy);
//Select All Data by id
router.get("/termsAndPolicyDetail/:id", termAndPolicyController.termsAndPolicyDetail);
//delete All Data by id
router.delete("/termAndPolicydelete/:id", termAndPolicyController.termAndPolicydelete);
//add row Data
router.post("/AddTermsAndPolicy/", termAndPolicyController.AddTermsAndPolicy);
//Update  Data by id
router.put("/UpdateTermsAndCondition/", termAndPolicyController.UpdateTermsAndCondition);
//Update status by id
router.put("/UpdateTermsAndPolicyStatus/", termAndPolicyController.UpdateTermsAndPolicyStatus);
//update-status-data
router.put("/update-terms-and-condition-status-data/:id", termAndPolicyController.update_terms_and_condition_status_data_by_id);


module.exports = router;