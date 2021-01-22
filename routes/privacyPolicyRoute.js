const express = require('express');
var router = express.Router();
const checkAuth = require('../middleware/check-auth')
const privacyPolicy = require('../controller/privacyPolicyController')
const { connection } = require('../db/db.js');

//Select All Data
router.get("/fetch-privacy-policy-data", privacyPolicy.fetch_privacy_policy_data);
//Select All Data by id
router.get("/fetch-privacy-policy-data_by-id/:id", privacyPolicy.fetch_privacy_policy_data_by_id);
//delete All Data by id
router.delete("/delete-privacy-policy/:id", privacyPolicy.delete_privacy_policy);
//add row Data
router.post("/save-privacy-policy", privacyPolicy.save_privacy_policy);
//Update  Data by id
router.put("/update_privacy_policy", privacyPolicy.update_privacy_policy);
//Fetch All Active Data
router.get("/fetch-all-active-privacy-policy-data", privacyPolicy.fetch_all_active_privacy_policy_data);
//Update status by id
router.put("/update-privacy-policy-status/:id", privacyPolicy.update_privacy_policy_status);


module.exports = router;