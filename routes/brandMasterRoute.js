const express = require('express');
var router = express.Router();
const checkAuth = require('../middleware/check-auth')
const brandMasterController = require('../controller/brandMasterController')
const { connection } = require('../db/db.js');

//Select All Data
router.get("/brandList", brandMasterController.brandList);
//Select All Data by id
router.get("/brandDetail/:id", brandMasterController.brandDetail);
//delete All Data by id
router.delete("/brandDelete/:id", brandMasterController.brandDelete);
//add row Data
router.post("/AddBrand", brandMasterController.AddBrand);
//Update  Data by id
router.put("/UpdateBrand", brandMasterController.UpdateBrand);
//Update status by id
router.put("/UpdateStatus/", brandMasterController.UpdateStatus);

//Select All Active Data
router.get("/fetch_all_active_brand_data", brandMasterController.fetch_all_active_brand_data);

//get category
router.get("/fetch_category", brandMasterController.fetch_category);

//get sucategory by id
router.get("/fetch_subCategory/:id", brandMasterController.fetch_subCategory);

//get product type name by id
router.post("/fetch_productTypeName", brandMasterController.fetch_productTypeName);

//update-status-data
router.put("/update-brand-status-data/:id", brandMasterController.update_brand_status_data_by_id);


module.exports = router;