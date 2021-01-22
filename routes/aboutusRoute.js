const express = require('express');
var router = express.Router();
const checkAuth = require('../middleware/check-auth')
const aboutusController = require('../controller/aboutusController')
const { connection } = require('../db/db.js');

//Select All Data
router.get("/aboutus", aboutusController.aboutus);
//Select All Data by id
router.get("/AboutUsDetail/:id", aboutusController.AboutUsDetail);
//delete All Data by id
router.delete("/Aboutusdelete/:id", aboutusController.Aboutusdelete);
//add row Data
router.post("/AddAboutus/", aboutusController.AddAboutus);
//Update  Data by id
router.put("/UpdateAbouteUs/", aboutusController.UpdateAbouteUs);
//Update status by id
router.put("/UpdateAbouteUsStatus/", aboutusController.UpdateAbouteUsStatus);


module.exports = router;