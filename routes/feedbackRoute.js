const express = require('express');
var router = express.Router();
const checkAuth = require('../middleware/check-auth')
const productFeedbackController = require('../controller/productFeedbackController');
const appFeedbackController = require('../controller/appFeedbackController');
var multer = require('multer');
const path = require('path');

router.use(express.static(path.join(__dirname, '/public')));


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/product_feedback_images');
    },
    filename: function (req, file, cb) {
        // cb(null , file.originalname);
        cb(null, file.originalname);
    }
});

var upload = multer({ storage: storage })



//get product ratings
router.get("/get_product_ratings",productFeedbackController.get_product_ratings);


//add product ratings
router.post("/save_product_rating", upload.single('uploadFile'),productFeedbackController.save_product_rating);

//edit product ratings
router.get("/get_product_ratings_by_id/:product_feedback_id",productFeedbackController.get_product_ratings_by_id);
router.put("/update_product_rating", upload.single('uploadFile'),productFeedbackController.update_product_rating);

//delete product ratings
router.delete("/delete_product_rating/:product_feedback_id",productFeedbackController.delete_product_rating);

///////////////////////////////

//get app ratings
router.get("/get_app_ratings",checkAuth,appFeedbackController.get_app_ratings);


//add app ratings
router.post("/save_app_rating",checkAuth,appFeedbackController.save_app_rating);

//edit app ratings
router.get("/get_app_ratings_by_id/:app_feedback_id",checkAuth,appFeedbackController.get_app_ratings_by_id);
router.put("/update_app_rating",appFeedbackController.update_app_rating);

//delete app ratings
router.delete("/delete_app_rating/:app_feedback_id",checkAuth,appFeedbackController.delete_app_rating);


module.exports = router;