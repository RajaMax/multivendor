const express = require('express');
var router = express.Router();
const checkAuth = require('../middleware/check-auth')
const modelTypeController = require('../controller/modelTypeController')

//Fetch All modeltype Data
router.get("/fetch-all-modeltype-data", modelTypeController.fetch_all_modeltype_data);

//Save modeltype Data
router.post("/save-modeltype-data", modelTypeController.fetch_save_modeltype_data);

//Fetch modeltype Data by Id
router.get("/fetch-modeltype-data-by-id/:id", modelTypeController.fetch_modeltype_data_by_id);

//Update modeltype Data by Id
router.put("/update-modeltype-data-by-id", modelTypeController.update_modeltype_data_by_id);

//Delete modeltype Data by Id
router.delete("/delete-modeltype-data-by-id/:id", modelTypeController.delete_modeltype_data_by_id);
//update-status-data
router.put("/update-modeltype-status-data/:id", modelTypeController.update_modeltype_status_data_by_id);


module.exports = router;