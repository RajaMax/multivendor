const express = require('express');

var router = express.Router();
const checkAuth = require('../middleware/check-auth')
const reportsController = require('../controller/reportsController')
const { connection } = require('../db/db.js');

router.get("/activeUser",reportsController.activeUser);
router.get("/inActiveUser",reportsController.inActiveUser);

//pass month like 1 jan , 2 means feb .... 12 means dec 
router.get("/monthlySaleReport/:id",reportsController.monthlySaleReport);

router.get("/weeklySaleReport/:date1/:date2",reportsController.weeklySaleReport);


//Apis for vendor panal


//pass month like 1 jan , 2 means feb .... 12 means dec 
router.get("/monthlySaleReportForVendor/:month/:vendor_id",reportsController.monthlySaleReportForVendor);
router.get("/yearlySaleReportForVendor/:year/:vendor_id",reportsController.yearlySaleReportForVendor);
router.get("/dateWiseSaleReportForVendor/:date/:vendor_id",reportsController.dateWiseSaleReportForVendor);
router.get("/weeklySaleReportForVendor/:date1/:date2/:vendor_id",reportsController.weeklySaleReportForVendor);



module.exports = router;