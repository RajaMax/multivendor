const express = require('express');
var router = express.Router();
const checkAuth = require('../middleware/check-auth')
const productTypeController = require('../controller/productTypeController')

//main offer
router.post("/add_productType",productTypeController.add_productType);

router.get("/get_productType",productTypeController.get_productType);


router.get("/edit_productType/:product_type_id",productTypeController.edit_productType);
router.put("/update_productType",productTypeController.update_productType);

router.delete("/delete_productType/:product_type_id",productTypeController.delete_productType);

//Select All Active Data
router.get("/fetch_all_active_product_type_data", productTypeController.fetch_all_active_product_type_data);

//update-status-data
router.put("/update-product-type-status-data/:id", productTypeController.update_product_type_status_data_by_id);

module.exports = router;