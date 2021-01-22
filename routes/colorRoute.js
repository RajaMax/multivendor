const express = require('express');
var router = express.Router();
const checkAuth = require('../middleware/check-auth')
const colorController = require('../controller/colorController')

//Fetch All color Data
router.get("/fetch-all-color-data", colorController.fetch_all_color_data);

//Save color Data
router.post("/save-color-data", colorController.fetch_save_color_data);

//Fetch color Data by Id
router.get("/fetch-color-data-by-id/:id", colorController.fetch_color_data_by_id);

//Update color Data by Id
router.put("/update-color-data-by-id", colorController.update_color_data_by_id);

//Delete color Data by Id
router.delete("/delete-color-data-by-id/:id", colorController.delete_color_data_by_id);

//update-status-data
router.put("/update-color-status-data/:id", colorController.update_color_status_data_by_id);


module.exports = router;