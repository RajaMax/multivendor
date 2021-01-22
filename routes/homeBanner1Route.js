const express = require('express');
var router = express.Router();
var multer = require('multer');
const path = require('path');

router.use(express.static(path.join(__dirname, '/public')));

const checkAuth = require('../middleware/check-auth')
const homeBanner1Controller = require('../controller/homeBanner1Controller')


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/home-banner1');
    },
    filename: function (req, file, cb) {
        // cb(null , file.originalname);
        cb(null, file.originalname);
    }
});

var upload = multer({ storage: storage })


//Fetch All home-banner1 Data
router.get("/fetch-all-home-banner1-data", homeBanner1Controller.fetch_all_home_banner1_data);

//Save home-banner1 Data
router.post("/save-home-banner1-data",upload.single('uploadFile'), homeBanner1Controller.fetch_save_home_banner1_data);

//Fetch home-banner1 Data by Id
router.get("/fetch-home-banner1-data-by-id/:id",  homeBanner1Controller.fetch_home_banner1_data_by_id);

//Update home-banner1 Data by Id
router.put("/update-home-banner1-data-by-id",  upload.single('uploadFile'), homeBanner1Controller.update_home_banner1_data_by_id);

//Delete home-banner1 Data by Id
router.delete("/delete-data-by-id/:id",  homeBanner1Controller.delete_home_banner1_data_by_id);



//update-home-banner1-status-data
router.put("/update-home-banner1-status-data/:id", homeBanner1Controller.update_home_banner1_status_data_by_id);

//Fetch All active home-banner1 Data
router.get("/fetch-all-active-home-banner1-data", homeBanner1Controller.fetch_all_active_home_banner1_data);

//update-status-data
router.put("/update-home_banner1-status-data/:id", homeBanner1Controller.update_home_banner1_status_data_by_id);


module.exports = router;