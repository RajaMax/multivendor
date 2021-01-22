const express = require('express');
var router = express.Router();
const checkAuth = require('../middleware/check-auth')
const deliveryRequestController = require('../controller/deliveryRequestController')
const { connection } = require('../db/db.js');

//Select All Data
router.get("/deliveryRequestList", deliveryRequestController.deliveryRequestList);
//Select All Data by id
router.get("/DeliveryRequestyDetail/:id", deliveryRequestController.DeliveryRequestyDetail);
//delete All Data by id
router.delete("/deliveryrequestdelete/:id", deliveryRequestController.deliveryrequestdelete);
//add row Data
router.post("/AddDeliveryRequest/", deliveryRequestController.AddDeliveryRequest);
//Update  Data by id
router.put("/UpdateDeliveryRequest/", deliveryRequestController.UpdateDeliveryRequest);
//Update status by id
router.put("/UpdateDeliveryRequestStatus/", deliveryRequestController.UpdateDeliveryRequestStatus);


module.exports = router;