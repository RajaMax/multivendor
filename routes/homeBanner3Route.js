const express = require('express');
var router = express.Router();
var multer = require('multer');
const path = require('path');

router.use(express.static(path.join(__dirname, '/public')));

const checkAuth = require('../middleware/check-auth')
const homeBanner3Controller = require('../controller/homeBanner3Controller')


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/home-banner3');
    },
    filename: function (req, file, cb) {
        // cb(null , file.originalname);
        cb(null, file.originalname);
    }
});

var upload = multer({ storage: storage })


//Fetch All home banner3 Data
router.get("/fetch-all-home-banner3-data", homeBanner3Controller.fetch_all_home_banner3_data);

//Save home banner3 Data
router.post("/save-home-banner3-data",   upload.single('uploadFile'), homeBanner3Controller.fetch_save_home_banner3_data);

//Fetch home banner3 Data by Id
router.get("/fetch-home-banner3-data-by-id/:id",  homeBanner3Controller.fetch_home_banner3_data_by_id);

//Update home banner3 Data by Id
router.put("/update-home-banner3-data-by-id",  upload.single('uploadFile'), homeBanner3Controller.update_home_banner3_data_by_id);

//Deletehome banner3 Data by Id
router.delete("/delete-home-banner3-data-by-id/:id",  homeBanner3Controller.delete_home_banner3_data_by_id);


//update-home-banner3-status-data
router.put("/update-home-banner3-status-data/:id", homeBanner3Controller.update_home_banner3_status_data_by_id);

//Fetch All active home-banner3 Data
router.get("/fetch-all-active-home-banner3-data", homeBanner3Controller.fetch_all_active_home_banner3_data);

//update-status-data
router.put("/update-home_banner3-status-data/:id", homeBanner3Controller.update_home_banner3_status_data_by_id);



module.exports = router;