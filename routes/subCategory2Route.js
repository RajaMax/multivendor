const express = require('express');
var router = express.Router();
const checkAuth = require('../middleware/check-auth')
const subCategory2Controller = require('../controller/subCategory2Controller')

//Fetch All Data
router.get("/fetch-all-sub-category2-data", subCategory2Controller.fetch_all_sub_category2_data);

//Save Data
router.post("/save-sub-category2-data", subCategory2Controller.fetch_save_sub_category2_data);

//Fetch Data by Id
router.get("/fetch-sub-category2-data-by-id/:id", subCategory2Controller.fetch_sub_category2_data_by_id);

//Update Data by Id
router.put("/update-sub-category2-data-by-id", subCategory2Controller.update_sub_category2_data_by_id);

//Delete Data by Id
router.delete("/delete-sub-category2-data-by-id/:id", subCategory2Controller.delete_sub_category2_data_by_id);

//Fetch Data by Id
router.post("/fetch-sub-category2-data-by-id-onchange", subCategory2Controller.fetch_all_sub_category2_data_by_subcategory_id);

//Fetch Data producttype by subcategory2_id
router.post("/fetch-productype-data-by-id", subCategory2Controller.fetch_all_producttype_data_by_subcategory2_id);

//Select All Active Data
router.get("/fetch_all_active_sub_category2_data", subCategory2Controller.fetch_all_active_sub_category2_data);


//Select All brand by producttype id
router.post("/fetch_all_brand_data_by_product_type_id", subCategory2Controller.fetch_all_brand_data_by_product_type_id);


//Select All modeltype by brand id
router.post("/fetch_all_modeltype_data_by_brand_id", subCategory2Controller.fetch_all_modeltype_data_by_brand_id);

//update-status-data
router.put("/update-subcategory2-status-data/:id", subCategory2Controller.update_subcategory2_status_data_by_id);


module.exports = router;