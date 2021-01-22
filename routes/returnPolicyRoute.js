const express = require('express');
var router = express.Router();
var multer = require('multer');
const checkAuth = require('../middleware/check-auth')
const returnPolicyController = require('../controller/returnPolicyController')
const { connection } = require('../db/db.js');
const path = require('path');


var storage = multer.diskStorage({
    destination: function (req, file, callback) {
     console.log(file.originalname);

      if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg' ) {

        callback(null, 'public/return_policy');
      }  else {
        //console.log(file.mimetype,"hiii")
        callback({ error: 'Mime type not supported' })
      }
      
    },
    filename: function (req, file, callback) {
     // console.log(file);
      callback(null,file.originalname);
    }
  });
  
var upload_images = multer({ storage: storage })




//Select All Data
router.get("/returnPolicy", returnPolicyController.returnPolicy);
//Select All Data by id
router.get("/returnPolicyDetail/:id", returnPolicyController.returnPolicyDetail);
//delete All Data by id
router.delete("/reurnPolicydelete/:id", returnPolicyController.reurnPolicydelete);
//add row Data
router.post("/AddReturnPolicy",upload_images.array('uploadFile'), returnPolicyController.AddReturnPolicy);
//Update  Data by id
router.put("/UpdateReturnPolicy",upload_images.array('uploadFile'), returnPolicyController.UpdateReturnPolicy);
//Update status by id
router.put("/UpdatereturnPolicyStatus/", returnPolicyController.UpdatereturnPolicyStatus);

//update-status-data
router.put("/update-return-policy-status-data/:id", returnPolicyController.update_return_policy_status_data_by_id);


module.exports = router;