const express = require('express');
var router = express.Router();
const checkAuth = require('../middleware/check-auth')
const uploadListController = require('../controller/uploadListController')
var multer = require('multer');
const path = require('path');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/customerUploadList');
    },
    filename: function (req, file, cb) {
        // cb(null , file.originalname);
        cb(null, file.originalname);
    }
});
var upload = multer({ storage: storage })


router.post("/uploadList",upload.array('uploadFile'),uploadListController.uploadList);
router.get("/get_upload_list",uploadListController.get_upload_list);
//edit 
router.get("/get_upload_list_by_id/:customer_id",uploadListController.get_upload_list_by_id);
//delete
router.delete("/delete_uploadList/:customer_id",uploadListController.delete_uploadList);


module.exports = router;