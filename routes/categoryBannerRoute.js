const express = require('express');
var multer = require('multer');
var router = express.Router();
//const checkAuth = require('../middleware/check-auth')
const categoryBannerController = require('../controller/categoryBannerController')
const { connection } = require('../db/db.js');
const checkAuth = require('../middleware/check-auth')


var storage = multer.diskStorage({
    destination: function (req, file, callback) {
     //console.log(file.originalname);

      if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {

        callback(null, 'public/category_banner');
      } else {
        //console.log(file.mimetype,"hiii")
        callback({ error: 'file type not supported' })
      }
      
    },
    filename: function (req, file, callback) {
     // console.log(file);
      callback(null, Date.now()+ '-' + file.originalname);
    }
  });
  
var upload_images = multer({ storage: storage })

router.post("/uploadBanner/", upload_images.array('images', 12),categoryBannerController.uploadBanner);
//list 
router.get("/categoryBanner/",categoryBannerController.categoryBanner);
 router.get("/singleBannerDetail/:id",categoryBannerController.singleBannerDetail);


//delete All Data by id
router.delete("/deleteBanner/:id", categoryBannerController.deleteBanner);

//update data
router.put("/updateBanner/",upload_images.array('images', 12), categoryBannerController.updateBanner);
//status update
router.put("/updateBannerStatus/", categoryBannerController.updateBannerStatus);
var router = express.Router();
var multer = require('multer');
const path = require('path');

router.use(express.static(path.join(__dirname, '/public')));



var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/category-banner');
    },
    filename: function (req, file, cb) {
        // cb(null , file.originalname);
        cb(null, file.originalname);
    }
});

var upload = multer({ storage: storage })


//Fetch All sub Category Data
router.get("/fetch-all-category-banner-data", categoryBannerController.fetch_all_category_banner_data);

//Save sub Category Data
router.post("/save-category-banner-data",  upload.single('uploadFile'), categoryBannerController.fetch_save_category_banner_data);

//Fetch sub Category Data by Id
router.get("/fetch-category-banner-data-by-id/:id", categoryBannerController.fetch_category_banner_data_by_id);

//Update sub Category Data by Id
router.put("/update-category-banner-data-by-id", upload.single('uploadFile'), categoryBannerController.update_category_banner_data_by_id);

//Delete sub category Data by Id
router.delete("/delete-category-banner-data-by-id/:id", categoryBannerController.delete_category_banner_data_by_id);

//update-status-data
router.put("/update-category_banner-status-data/:id", categoryBannerController.update_category_banner_status_data_by_id);


module.exports = router;