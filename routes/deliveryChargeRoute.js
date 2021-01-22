const express = require('express');
var router = express.Router();
const checkAuth = require('../middleware/check-auth')
const deliveryChargeController = require('../controller/deliveryChargeController')

//Fetch All Data
router.get("/fetch-all-delivery-charge-data", deliveryChargeController.fetch_all_delivery_charge_data);

//Save Data
router.post("/save-delivery-charge-data", deliveryChargeController.fetch_save_delivery_charge_data);

//Fetch Data by Id
router.get("/fetch-delivery-charge-data-by-id/:id", deliveryChargeController.fetch_delivery_charge_data_by_id);

//Update Data by Id
router.put("/update-delivery-charge-data-by-id", deliveryChargeController.update_delivery_charge_data_by_id);

//Delete Data by Id
router.delete("/delete-delivery-charge-data-by-id/:id", deliveryChargeController.delete_delivery_charge_data_by_id);

//fetch all active list

router.get("/fetch-all-active-delivery-charge-data", deliveryChargeController.fetch_all_active_delivery_charge_data);


//Delete delivery charge Data by Id
router.delete("/delete-delivery-charge-data/:id", deliveryChargeController.delete_delivery_charge_data);



module.exports = router;