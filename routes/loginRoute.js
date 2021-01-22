const express = require('express');
var router = express.Router();
const checkAuth = require('../middleware/check-auth')
const customerLoginController = require('../controller/customerLoginController')
const vendorLoginController = require('../controller/vendorLoginController')
const adminLoginController = require('../controller/adminLoginController')
var multer = require('multer');
const path = require('path');

router.use(express.static(path.join(__dirname, '/public')));


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/vendor_profile_images');
    },
    filename: function (req, file, cb) {
        // cb(null , file.originalname);
        cb(null, file.originalname);
    }
});

var upload = multer({ storage: storage })



//admin-vendor management
//add vendor
router.post("/add_admin_vendor",adminLoginController.add_admin_vendor);

//edit vendor
router.get("/edit_admin_vendor/:vendor_id",adminLoginController.edit_admin_vendor);
router.put("/update_admin_vendor",adminLoginController.update_admin_vendor);

//delete vendor
router.delete("/delete_admin_vendor/:vendor_id",adminLoginController.delete_admin_vendor);


//customer registration

router.post("/register-customer-data",customerLoginController.fetch_register_data);
router.post("/customer-data",customerLoginController.verify_customer_otp);
router.post("/customer_login_verification",customerLoginController.customer_login);
router.post("/customer_login_otp_verification",customerLoginController.customer_login_otp_verification);
router.post("/customer_login_password_verification",customerLoginController.customer_login_password_verification);

router.post("/customer_forgot_password",customerLoginController.customer_forgot_passwrod);
router.post("/customer_verify_otp",customerLoginController.customer_verify_otp);
router.post("/customer_verify_password",customerLoginController.customer_verify_password);

//get customer
router.get("/fetch_customer",customerLoginController.fetch_customer);

//add customer
router.post("/add_customer",customerLoginController.add_customer);

//edit customer
router.get("/edit_customer/:customer_id",customerLoginController.edit_customer);
router.put("/update_customer",customerLoginController.update_customer);

//delete customer
router.delete("/delete-customer/:customer_id",customerLoginController.delete_customer);

//change password customer
router.post("/change_customer_password",customerLoginController.change_customer_password);

//logout customer
router.delete("/logout-customer",customerLoginController.logout_customer);


//vendor registration

router.post("/register-vendor-data",upload.single('uploadFile'),vendorLoginController.fetch_register_data_vendor);
router.post("/vendor-data",upload.single('uploadFile'),vendorLoginController.verify_customer_otp_vendor);
router.post("/vendor_login_verification",vendorLoginController.vendor_login);
router.post("/vendor_forgot_password",vendorLoginController.vendor_forgot_passwrod);
router.post("/vendor_verify_otp",vendorLoginController.vendor_verify_otp);
router.post("/vendor_verify_password",vendorLoginController.vendor_verify_password);
router.put("/update_vendor_registration",upload.single('uploadFile'),vendorLoginController.update_vendor_registration);

//vendor management

//get vendor
router.get("/fetch_vendor",vendorLoginController.fetch_vendor);
router.get("/fetch-active-vendor-list",vendorLoginController.fetch_active_vendor_list);


//add vendor
router.post("/add_vendor",upload.single('uploadFile'),vendorLoginController.add_vendor);


router.get("/get_vendor/:vendor_id",vendorLoginController.get_vendor);
router.put("/update_vendor",upload.single('uploadFile'),vendorLoginController.update_vendor);

//delete vendor
router.delete("/delete_vendor/:vendor_id",vendorLoginController.delete_vendor);



//change password vendor
router.post("/change_vendor_password",vendorLoginController.change_vendor_password);


//admin Login
router.post("/admin_login_verification",adminLoginController.admin_login);
router.post("/admin_forgot_password",adminLoginController.admin_forgot_passwrod);
router.post("/admin_verify_otp",adminLoginController.admin_verify_otp);
router.post("/admin_verify_password",adminLoginController.admin_verify_password);


// fetch_all_active_customer_data
router.get("/fetch-all-active-customer-data",customerLoginController.fetch_all_active_customer_data);




module.exports = router;