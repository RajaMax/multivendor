const express = require('express');
var router = express.Router();
var multer = require('multer');
const path = require('path');

router.use(express.static(path.join(__dirname, '/public')));

const checkAuth = require('../middleware/check-auth')
const unitValueController = require('../controller/unitValueController')



//Fetch All unit Value Data
router.get("/fetch-all-unit-value-data", unitValueController.fetch_all_unit_value_data);

//Save unit Value Data
router.post("/save-unit-value-data", unitValueController.fetch_save_unit_value_data);

//Fetch unit Value Data by Id
router.get("/fetch-unit-value-data-by-id/:id", unitValueController.fetch_unit_value_data_by_id);

//Update unit Value Data by Id
router.put("/update-unit-value-data-by-id", unitValueController.update_unit_value_data_by_id);

//Delete unit Value Data by Id
router.delete("/delete-unit-value-data-by-id/:id", unitValueController.delete_unit_value_data_by_id);

//Fetch unit value Data by sub unit Id
router.get("/fetch-all-unit-value-data-by-sub-unit-id/:id", unitValueController.fetch_all_unit_value_data_by_sub_unit_id);

//update-status-data
router.put("/update-unit-value-status-data/:id", unitValueController.update_unit_value_status_data_by_id);


module.exports = router;