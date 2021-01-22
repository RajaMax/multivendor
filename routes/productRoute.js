const express = require('express');
var router = express.Router();
const checkAuth = require('../middleware/check-auth')
const productController = require('../controller/productController')
const path = require('path');

var multer = require('multer');
router.use(express.static(path.join(__dirname, '/public')));


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/product-images');
    },
    filename: function (req, file, cb) {
        // cb(null , file.originalname);
        // cb(null, Date.now() + '-' + file.originalname);
        cb(null, file.originalname);
    }
});

var upload = multer({ storage: storage })

//Fetch All Product Data
router.get("/fetch-all-product-details-data", productController.fetch_all_product_data);

// Save Category Data
router.post("/save-product-details-data", upload.any(), productController.save_product_data);

//update-product-status-data
router.put("/update-product-status-data/:id", productController.update_product_status_data_by_id);

//Fetch Category Data by Id
router.get("/fetch-product-data-by-id/:id", productController.fetch_product_data_by_id);

//Update Category Data by Id
router.put("/update-product-details-data-by-id", upload.any(), productController.update_product_details_data_by_id);

//Delete sub Product Option Data by Id
router.delete("/delete-sub-product-option-data/:id", productController.delete_sub_product_option_data);

//Delete sub Product discount Data by Id
router.delete("/delete-sub-product-discount-data/:id", productController.delete_sub_product_discount_data);

//Delete sub Product special Data by Id
router.delete("/delete-sub-product-special-data/:id", productController.delete_sub_product_special_data);

//Delete sub Product images Data by Id
router.delete("/delete-sub-product-sub-images-data/:id", productController.delete_sub_product_images_data);


//delete-product-details-data-by-id
router.delete("/delete-product-details-data-by-id/:id", productController.delete_product_details_data_by_id);

// //Fetch All Active Category Data
// router.get("/fetch-all-active-category-data", categoryController.fetch_all_active_category_data);


//Fetch All Active Product Data
router.get("/fetch-all-active-product-details-data", productController.fetch_all_active_product_details_data);

//fetch-all-active-product-data
router.get("/fetch-all-active-product-data", productController.fetch_all_active_product_data);

// fetch-product-unit-data
router.post("/fetch-product-unit-data", productController.fetch_product_unit_data);

// fetch-product-sub-unit-data
router.post("/fetch-product-sub-unit-data", productController.fetch_product_sub_unit_data);

// fetch-product-unit-value-data
router.post("/fetch-product-unit-value-data", productController.fetch_product_unit_value_data);


// fetch-sub-unit-value-id-by-using-option-id
router.get("/fetch-sub-unit-value-id-by-using-option-id/:id", productController.fetch_sub_unit_value_id_by_using_option_id);




// Save Category Data
router.post("/save-vendor-product-details-data", upload.any(), productController.save_vendor_product_data);

// show-products-by-categories
router.post("/show-products-by-categories", productController.show_products_by_categories);

// save-vendor-products-deatils-data
router.post("/save-vendor-products-deatils-data", upload.any(), productController.save_vendor_products_deatils_data);

//fetch-vendor-product-data-by-id
router.get("/fetch-vendor-product-data-by-id/:id", productController.fetch_vendor_product_data_by_id);

// update-vendor-product-details-data-by-id

router.put("/update-vendor-product-details-data-by-id", upload.any(), productController.update_vendor_product_details_data_by_id);

//fetch-all-vendor-product-details-data
router.get("/fetch-all-vendor-product-details-data", productController.fetch_all_vendor_product_details_data);

//fetch-all-vendor-product-details-data
router.get("/fetch-all-active-vendor-product-details-data", productController.fetch_all_active_vendor_product_details_data);


// update-vendor-product-status-data
router.put("/update-vendor-product-status-data/:id", productController.update_vendor_product_status_data_by_id);

// delete-vendor-product-details-data-by-id
router.delete("/delete-vendor-product-details-data-by-id/:id", productController.delete_vendor_product_details_data_by_id);

// fetch-all-active-vendor-data
router.get("/fetch-all-active-vendor-data", productController.fetch_all_active_vendor_data);

// fetch-all-active-model-types-data
router.post("/fetch-all-active-model-types-data", productController.fetch_all_active_model_types_data);

//fetch-all-active-thickness-dimension-data
router.post("/fetch-all-active-thickness-dimension-data", productController.fetch_all_active_thickness_dimension_data);


//fetch-all-active-color-data
router.post("/fetch-all-active-color-data", productController.fetch_all_active_color_data);

//fetch-product-detail-by-id
router.post("/get-product-detail-by-id", productController.get_product_detail_by_id);

module.exports = router;