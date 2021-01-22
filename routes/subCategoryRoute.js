const express = require('express');
var router = express.Router();
const checkAuth = require('../middleware/check-auth')
const subCategoryController = require('../controller/subCategoryController')

const path = require('path');

var multer = require('multer');
router.use(express.static(path.join(__dirname, '/public')));


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/sub-category-images');
    },
    filename: function (req, file, cb) {
        // cb(null , file.originalname);
        cb(null, file.originalname);
    }
});

var upload = multer({ storage: storage })

//Fetch All sub Category Data
router.get("/fetch-all-sub-category-data", subCategoryController.fetch_all_sub_category_data);

//Save sub Category Data
router.post("/save-sub-category-data", upload.single('uploadFile'), subCategoryController.fetch_save_sub_category_data);

//Fetch sub Category Data by Id
router.get("/fetch-sub-category-data-by-id/:id" ,subCategoryController.fetch_sub_category_data_by_id);

//Update sub Category Data by Id
router.put("/update-sub-category-data-by-id", upload.single('uploadFile'), subCategoryController.update_sub_category_data_by_id);

//Delete sub category Data by Id
router.delete("/delete-sub-category-data-by-id/:id", subCategoryController.delete_sub_category_data_by_id);

//Fetch sub Category Data by category Id
router.get("/fetch-all-sub-category-data-by-category-id/:id", subCategoryController.fetch_all_sub_category_data_by_category_id);

//Select All Active Data
router.get("/fetch_all_active_sub_category_data", subCategoryController.fetch_all_active_sub_category_data);

//update-status-data
router.put("/update-sub-category-status-data/:id", subCategoryController.update_sub_category_status_data_by_id);


module.exports = router;