const express = require('express');
var router = express.Router();
const checkAuth = require('../middleware/check-auth')
const categoryController = require('../controller/categoryController')
const path = require('path');

var multer = require('multer');
router.use(express.static(path.join(__dirname, '/public')));


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/category-images');
    },
    filename: function (req, file, cb) {
        // cb(null , file.originalname);
        cb(null, file.originalname);
    }
});

var upload = multer({ storage: storage })

//Fetch All Category Data
router.get("/fetch-all-active-category-data", categoryController.fetch_all_active_category_data);


//Fetch All Category Data
router.get("/fetch-all-category-data", categoryController.fetch_all_category_data);

//Save Category Data
router.post("/save-category-data", upload.single('uploadFile'), categoryController.fetch_save_category_data);

//Fetch Category Data by Id
router.get("/fetch-category-data-by-id/:id", categoryController.fetch_category_data_by_id);

//Update Category Data by Id
router.put("/update-category-data-by-id", upload.single('uploadFile'),categoryController.update_category_data_by_id);

//Delete category Data by Id
router.delete("/delete-category-data-by-id/:id", categoryController.delete_category_data_by_id);

//Fetch All Active Category Data
router.get("/fetch-all-active-category-data", categoryController.fetch_all_active_category_data);

//update-status-data
router.put("/update-category-status-data/:id", categoryController.update_category_status_data_by_id);


module.exports = router;