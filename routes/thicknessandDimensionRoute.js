const express = require('express');
var router = express.Router();
const checkAuth = require('../middleware/check-auth')
const thicknessandDimensionController = require('../controller/thicknessandDimensionController')

//Fetch All thickeness-and-dimension Data
router.get("/fetch-all-thickeness-and-dimension-data", thicknessandDimensionController.fetch_all_thickeness_and_dimension_data);

//Save thickeness-and-dimension Data
router.post("/save-thickeness-and-dimension-data", thicknessandDimensionController.fetch_save_thickeness_and_dimension_data);

//Fetch thickeness-and-dimension Data by Id
router.get("/fetch-thickeness-and-dimension-data-by-id/:id", thicknessandDimensionController.fetch_thickeness_and_dimension_data_by_id);

//Update thickeness-and-dimension Data by Id
router.put("/update-thickeness-and-dimension-data-by-id", thicknessandDimensionController.update_thickeness_and_dimension_data_by_id);

//Delete thickeness-and-dimension Data by Id
router.delete("/delete-thickeness-and-dimension-data-by-id/:id", thicknessandDimensionController.delete_thickeness_and_dimension_data_by_id);

//update-status-data
router.put("/update-thickeness-and-dimension-status-data/:id", thicknessandDimensionController.update_thickeness_and_dimension_status_data_by_id);


module.exports = router;