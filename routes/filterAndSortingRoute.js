const express = require('express');
var router = express.Router();
const checkAuth = require('../middleware/check-auth')
const filterAndSorting = require('../controller/filterAndSortingController')
const { connection } = require('../db/db.js');

//add row Data
router.post("/fetch-filter-records", filterAndSorting.fetch_filter_records);
//add row Data
router.post("/fetch-sorting-records", filterAndSorting.fetch_sorting_records);


module.exports = router;