const express = require('express');
var router = express.Router();
var multer = require('multer');
const path = require('path');

router.use(express.static(path.join(__dirname, '/public')));

const checkAuth = require('../middleware/check-auth')
const homeBanner4Controller = require('../controller/homeBanner4Controller')


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/home-banner4');
    },
    filename: function (req, file, cb) {
        // cb(null , file.originalname);
        cb(null, file.originalname);
    }
});

var upload = multer({ storage: storage })


//Fetch All home banner4 Data
router.get("/fetch-all-home-banner4-data",  homeBanner4Controller.fetch_all_home_banner4_data);

//Save home banner4 Data
router.post("/save-home-banner4-data",   upload.single('uploadFile'), homeBanner4Controller.fetch_save_home_banner4_data);

//Fetch home banner4 Data by Id
router.get("/fetch-home-banner4-data-by-id/:id",  homeBanner4Controller.fetch_home_banner4_data_by_id);

//Update home banner4 Data by Id
router.put("/update-home-banner4-data-by-id",  upload.single('uploadFile'), homeBanner4Controller.update_home_banner4_data_by_id);

//Deletehome banner4 Data by Id
router.delete("/delete-home-banner4-data-by-id/:id",  homeBanner4Controller.delete_home_banner4_data_by_id);


//update-home-banner4-status-data
router.put("/update-home-banner4-status-data/:id", homeBanner4Controller.update_home_banner4_status_data_by_id);

//Fetch All active home-banner4 Data
router.get("/fetch-all-active-home-banner4-data", homeBanner4Controller.fetch_all_active_home_banner4_data);

//update-status-data
router.put("/update-home_banner4-status-data/:id", homeBanner4Controller.update_home_banner4_status_data_by_id);


module.exports = router;