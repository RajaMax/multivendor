const express = require('express');
var router = express.Router();
const checkAuth = require('../middleware/check-auth')
const orderController = require('../controller/orderController')
const { connection } = require('../db/db.js');


//add  Data


router.post("/addOrder/", orderController.addOrder);

router.post("/addOrderApiForMobile/", orderController.addOrderApiForMobile); // for mobile



router.get("/PaymentMethodList/", orderController.PaymentMethodList); // Payment Method List 

router.get("/OrderList/", orderController.OrderList); // admin panal all orders
router.get("/OrderDetailsByOrderId/:id", orderController.OrderDetailsByOrderId); // admin panal  orders deatils



router.get("/OrderProductList/:id", orderController.OrderProductList); //pass order id

router.get("/customerOrderList/:id", orderController.customerOrderList); // customer Order list

router.delete("/deleteOrder/:id", orderController.deleteOrder); //delete order admin panal

router.put("/updateOrderShippingStatus/", orderController.updateOrderShippingStatus); // admin panal change order status

router.get("/orderStatusHistoryList/:order_id", orderController.orderStatusHistoryList); // admin panal time of status change store history

//order status type
router.get("/orderStatusList/", orderController.orderStatusList);
router.post("/AddorderStatus/", orderController.AddorderStatus);
router.put("/UpdateOrderTypeStatus/", orderController.UpdateOrderTypeStatus);
router.put("/UpdateOrderStatusTypeName/", orderController.UpdateOrderStatusTypeName);
router.delete("/OrderStatusTypeDelete/:id", orderController.OrderStatusTypeDelete);

//for return
router.post("/OrderReturnRequest/", orderController.OrderReturnRequest);
router.put("/updateReturnRequestStatus/", orderController.updateReturnRequestStatus);

router.get("/ReturnProductList/", orderController.ReturnProductList);
router.delete("/productRrturnDelete/:id", orderController.productRrturnDelete);

//return List for customer
router.get("/ReturnProductListForCustomer/:id", orderController.ReturnProductListForCustomer);


//return reason

router.get("/returnReasonList/", orderController.returnReasonList);
router.post("/addReturnReason/", orderController.addReturnReason);


//update-status-data
router.put("/update-order-status-data/:id", orderController.update_order_status_data_by_id);




module.exports = router;