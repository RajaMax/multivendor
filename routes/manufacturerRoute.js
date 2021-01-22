const express = require('express');
var router = express.Router();
const checkAuth = require('../middleware/check-auth')
const manufacturerController = require('../controller/manufacturerController')
var multer = require('multer');
const path = require('path');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/manufacturerImages');
    },
    filename: function (req, file, cb) {
        // cb(null , file.originalname);
        cb(null, file.originalname);
    }
});
var upload = multer({ storage: storage })

router.post("/add_manufacturer",upload.single('uploadFile'),manufacturerController.add_manufacturer);

router.get("/get_manufacturer",manufacturerController.get_manufacturer);


router.get("/edit_manufacturer/:manufacturer_id",manufacturerController.edit_manufacturer);
router.put("/update_manufacturer",upload.single('uploadFile'),manufacturerController.update_manufacturer);

router.delete("/delete_manufacturer/:manufacturer_id",manufacturerController.delete_manufacturer);

//update-status-data
router.put("/update-manufacturer-status-data/:id", manufacturerController.update_manufacturer_status_data_by_id);


module.exports = router;