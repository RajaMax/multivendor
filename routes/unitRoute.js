const express = require('express');
var router = express.Router();
const checkAuth = require('../middleware/check-auth')
const unitController = require('../controller/unitController')

//Fetch All Unit Data
router.get("/fetch-all-unit-data", unitController.fetch_all_unit_data);

//Save Unit Data
router.post("/save-unit-data", unitController.fetch_save_unit_data);

//Fetch Unit Data by Id
router.get("/fetch-unit-data-by-id/:id", unitController.fetch_unit_data_by_id);

//Update Unit Data by Id
router.put("/update-unit-data-by-id", unitController.update_unit_data_by_id);

//Delete Unit Data by Id
router.delete("/delete-unit-data-by-id/:id", unitController.delete_unit_data_by_id);

//Fetch All Active Unit Data
router.get("/fetch-all-active-unit-data", unitController.fetch_all_active_unit_data);

//update-status-data
router.put("/update-unit-status-data/:id", unitController.update_unit_status_data_by_id);


module.exports = router;