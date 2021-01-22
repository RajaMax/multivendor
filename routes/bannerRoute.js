const express = require('express');
var router = express.Router();
var multer = require('multer');
const path = require('path');

router.use(express.static(path.join(__dirname, '/public')));

const checkAuth = require('../middleware/check-auth')
const bannerController = require('../controller/bannerController')


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/banner');
    },
    filename: function (req, file, cb) {
        // cb(null , file.originalname);
        cb(null, file.originalname);
    }
});

var upload = multer({ storage: storage })


//Fetch All sub Category Data
router.get("/fetch-all-banner-data", checkAuth, bannerController.fetch_all_banner_data);

//Save sub Category Data
router.post("/save-banner-data",  checkAuth,  upload.single('uploadFile'), bannerController.fetch_save_banner_data);

//Fetch sub Category Data by Id
router.get("/fetch-banner-data-by-id/:id", checkAuth, bannerController.fetch_banner_data_by_id);

//Update sub Category Data by Id
router.put("/update-banner-data-by-id", checkAuth, upload.single('uploadFile'), bannerController.update_banner_data_by_id);

//Delete sub category Data by Id
router.delete("/delete-banner-data-by-id/:id", checkAuth, bannerController.delete_banner_data_by_id);



module.exports = router;