const express = require('express');
var router = express.Router();
const checkAuth = require('../middleware/check-auth')
const cutomerAddressController = require('../controller/cutomerAddressController')


//add customer
router.post("/add_customer_address",cutomerAddressController.add_customer_address);

//edit customer
router.get("/edit_customer_address/:address_id",cutomerAddressController.edit_customer_address);
router.put("/update_customer_address",cutomerAddressController.update_customer_address);

//delete customer
router.delete("/delete-customer_address/:address_id",cutomerAddressController.delete_customer_address);
//update-status-data
router.put("/update-customer_address-status-data/:id", cutomerAddressController.update_customer_address_status_data_by_id);


module.exports = router;