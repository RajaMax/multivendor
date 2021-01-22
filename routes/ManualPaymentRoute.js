const express = require('express');
var multer = require('multer');
var router = express.Router();
const checkAuth = require('../middleware/check-auth')
const ManualPaymentController = require('../controller/ManualPaymentController')
const { connection } = require('../db/db.js');


var storage = multer.diskStorage({
    destination: function (req, file, callback) {
     console.log(file.originalname);

      if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg' ) {

        callback(null, 'public/manual_payment');
      } else if (file.mimetype === 'video/mp4') {
        
            callback({ error: 'Mime type not supported' })
      }
      
    },
    filename: function (req, file, callback) {
     
      callback(null, Date.now()+ '-' + file.originalname);
    }
  });
  
var upload_images = multer({ storage: storage })



 router.post("/AddManualPaymentData/", upload_images.array('images', 12),ManualPaymentController.AddManualPaymentData);
 router.get("/manualPaymentList/",ManualPaymentController.manualPaymentList);
router.get("/manualPaymentListById/:id",ManualPaymentController.manualPaymentListById);



module.exports = router;