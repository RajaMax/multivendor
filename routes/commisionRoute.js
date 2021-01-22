const express = require('express');
var router = express.Router();
const checkAuth = require('../middleware/check-auth')
const commisionController = require('../controller/commisionController')
const { connection } = require('../db/db.js');

//Select All Data
router.get("/commisionList", commisionController.commisionList);
//Select All Data by id
router.get("/commisionDetails/:id", commisionController.commisionDetails);
//delete All Data by id
router.delete("/commisionDelete/:id", commisionController.commisionDelete);
//add row Data
router.post("/addCommision/", commisionController.addCommision);
//Update  Data by id
router.put("/updateCommision/", commisionController.updateCommision);
//Update status by id
router.put("/updateCommisionStatus/", commisionController.updateCommisionStatus);
//update-status-data
router.put("/update-commision-status-data/:id", commisionController.update_Commision_status_data_by_id);


module.exports = router;