const express = require('express');
var router = express.Router();
const checkAuth = require('../middleware/check-auth')
const offerController = require('../controller/offerController')

//main offer
router.post("/add_offer",offerController.add_offer);

router.get("/get_offer",offerController.get_offer);


router.get("/edit_offer/:offer_id",offerController.edit_offer);
router.put("/update_offer",offerController.update_offer);

router.delete("/delete_offer/:offer_id",offerController.delete_offer);

//Fetch All Active offer Data
router.get("/fetch-all-active-offer-data", offerController.fetch_all_active_offer_data);


//sub offer

router.get("/get_sub_offer",offerController.get_sub_offer);

router.post("/add_sub_offer",offerController.add_sub_offer);

router.get("/edit_sub_offer/:sub_offer_id",offerController.edit_sub_offer);
router.put("/update_sub_offer",offerController.update_sub_offer);

router.delete("/delete_sub_offer/:sub_offer_id",offerController.delete_sub_offer);

//Fetch All Active sub offer Data
router.get("/fetch-all-active-sub-offer-data", offerController.fetch_all_active_sub_offer_data);
//update-status-data
router.put("/update-offer-status-data/:id", offerController.update_offer_status_data_by_id);

//update-status-data
router.put("/update-suboffer-status-data/:id", offerController.update_suboffer_status_data_by_id);



module.exports = router;