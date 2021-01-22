const express = require('express');
var router = express.Router();
//const checkAuth = require('../middleware/check-auth')
const cartController = require('../controller/cartController')
const { connection } = require('../db/db.js');


//add row Data
router.post("/addToCart/", cartController.addToCart);


//cart list for customer
router.get("/cartListForCustomer/:customer_id", cartController.cartListForCustomer);

//update-status-data
router.put("/update-cart-status-data/:id", cartController.update_cart_status_data_by_id);

//delete cart product by cart id
router.delete("/deleteCartProduct/:id", cartController.deleteCartProduct);

//update quantity

router.put("/updateQuantity/", cartController.updateQuantity);




//cart list in admin side
router.get("/fetch-all-user-cart-list-admin-side-data", cartController.fetch_all_user_cart_list_admin_side_data);

// save-admin-side-customer-cart-details
router.post("/save-admin-side-customer-cart-details", cartController.save_admin_side_customer_cart_details);

//check user list exists or not
router.get("/check-user-cart-list-admin-side-data/:id", cartController.check_user_cart_list_admin_side_data);

// fetch-product-cart-list-admin-side-data-by-id
router.get("/fetch-product-cart-list-admin-side-data-by-id/:id", cartController.fetch_product_cart_list_admin_side_data_by_id);


// delete-sub-product-cart-data-by-id
router.delete("/delete-sub-product-cart-data-by-id/:id", cartController.delete_sub_product_cart_data_by_id);

// update-admin-side-customer-cart-details
router.put("/update-admin-side-customer-cart-details", cartController.update_admin_side_customer_cart_details);

module.exports = router;