const express = require('express');
var router = express.Router();

const checkAuth = require('../middleware/check-auth')
const crudController = require('../controller/crudController')

const path = require('path');

var multer = require('multer');
router.use(express.static(path.join(__dirname, '/public')));



var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // console.log('req');
        // console.log(req.body);
        // console.log('req.body.fieldname');
        // console.log(req.body.fieldname);
        // console.log('file');
        // console.log(file.fieldname);
        if (file.fieldname == "avatar") {
            cb(null, './public/crud1');

        }
        if (file.fieldname == "gallery") {
            cb(null, './public/crud2');

        }
        // cb(null, './public/crud1');
    },
    filename: function (req, file, cb) {
        // cb(null , file.originalname);
        cb(null, file.originalname);
    }
});

var upload = multer({ storage: storage })

//Select All Data
var cpUpload = upload.fields([{ name: 'avatar', maxCount: 2 }, { name: 'gallery', maxCount: 2 }])

router.post("/fetch-register-data", cpUpload, crudController.fetch_register_data);
router.post("/save-register-data", checkAuth, crudController.save_register_data);



module.exports = router;