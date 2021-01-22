const express = require('express');
var router = express.Router();
var multer = require('multer');
const path = require('path');

router.use(express.static(path.join(__dirname, '/public')));

const checkAuth = require('../middleware/check-auth')
const homeBanner2Controller = require('../controller/homeBanner2Controller')


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/home-banner2');
    },
    filename: function (req, file, cb) {
        // cb(null , file.originalname);
        cb(null, file.originalname);
    }
});

var upload = multer({ storage: storage })


//Fetch All home banner2 Data
router.get("/fetch-all-home-banner2-data", homeBanner2Controller.fetch_all_home_banner2_data);

//Save home banner2 Data
router.post("/save-home-banner2-data",  upload.single('uploadFile'), homeBanner2Controller.fetch_save_home_banner2_data);

//Fetch home banner2 Data by Id
router.get("/fetch-home-banner2-data-by-id/:id",  homeBanner2Controller.fetch_home_banner2_data_by_id);

//Update home banner2 Data by Id
router.put("/update-home-banner2-data-by-id",  upload.single('uploadFile'), homeBanner2Controller.update_home_banner2_data_by_id);

//Deletehome banner2 Data by Id
router.delete("/delete-home-banner2-data-by-id/:id",  homeBanner2Controller.delete_home_banner2_data_by_id);


//update-home-banner2-status-data
router.put("/update-home-banner2-status-data/:id", homeBanner2Controller.update_home_banner2_status_data_by_id);

//Fetch All active home-banner2 Data
router.get("/fetch-all-active-home-banner2-data", homeBanner2Controller.fetch_all_active_home_banner2_data);

//update-status-data
router.put("/update-home_banner2-status-data/:id", homeBanner2Controller.update_home_banner2_status_data_by_id);


module.exports = router;