const express = require('express');
var router = express.Router();
const checkAuth = require('../middleware/check-auth')
const customerEditProfileController = require('../controller/customerEditProfileController')
const path = require('path');

var multer = require('multer');
router.use(express.static(path.join(__dirname, '/public')));


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/customer_profile_images');
    },
    filename: function (req, file, cb) {
        // cb(null , file.originalname);
        cb(null, file.originalname);
    }
});

var upload = multer({ storage: storage })

//Fetch Category Data by Id
router.get("/fetch-customer-profile-data-by-id/:id", customerEditProfileController.fetch_customer_profile_data_by_id);

//Update Category Data by Id
router.put("/update-customer-profile-data-by-id", upload.single('uploadFile'),customerEditProfileController.update_customer_profile_data_by_id);



module.exports = router;