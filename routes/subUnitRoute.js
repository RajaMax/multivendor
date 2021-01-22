const express = require('express');
var router = express.Router();
const checkAuth = require('../middleware/check-auth')
const subUnitController = require('../controller/subUnitController')

//Fetch All sub unit Data
router.get("/fetch-all-sub-unit-data", subUnitController.fetch_all_sub_unit_data);

//Save sub unit Data
router.post("/save-sub-unit-data", subUnitController.fetch_save_sub_unit_data);

//Fetch sub unit Data by Id
router.get("/fetch-sub-unit-data-by-id/:id", subUnitController.fetch_sub_unit_data_by_id);

//Update sub unit Data by Id
router.put("/update-sub-unit-data-by-id", subUnitController.update_sub_unit_data_by_id);

//Delete sub unit Data by Id
router.delete("/delete-sub-unit-data-by-id/:id", subUnitController.delete_sub_unit_data_by_id);

//Fetch sub unit Data by Unit Id
router.get("/fetch-all-sub-unit-data-by-unit-id/:id", subUnitController.fetch_all_sub_unit_data_by_unit_id);

//update-status-data
router.put("/update-sub-unit-status-data/:id", subUnitController.update_sub_unit_status_data_by_id);


module.exports = router;