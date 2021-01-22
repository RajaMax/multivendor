

const express = require('express');
var router = express.Router();
const checkAuth = require('../middleware/check-auth')
const bankDetailsController = require('../controller/bankDetailsController')
var multer = require('multer');
const path = require('path');

router.use(express.static(path.join(__dirname, '/public')));


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/bankDetailsImages');
    },
    filename: function (req, file, cb) {
        // cb(null , file.originalname);
        cb(null, file.originalname);
    }
});
var upload = multer({ storage: storage })


router.post("/add_bank_details",upload.single('uploadFile'),bankDetailsController.add_bank_details);
router.get("/get_bank_details",bankDetailsController.get_bank_details);
//edit 
router.get("/get_bank_details_by_id/:bank_details_id",bankDetailsController.get_bank_details_by_id);
//delete
router.delete("/delete_bank_details/:bank_details_id",bankDetailsController.delete_bank_details);


//Update Data by Id
router.put("/update_bank_details_data_by_id",  upload.single('uploadFile'), bankDetailsController.update_bank_details_data_by_id);

//Fetch All active Data
router.get("/fetch_all_active_bank_details_data", bankDetailsController.fetch_all_active_bank_details_data);


module.exports = router;