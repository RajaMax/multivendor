const express = require('express');
var multer = require('multer');
var router = express.Router();
const checkAuth = require('../middleware/check-auth')
const ideaSectionController = require('../controller/ideaSectionController')

const path = require('path');
router.use(express.static(path.join(__dirname, '/public')));

var storage = multer.diskStorage({
    destination: function (req, file, callback) {
     console.log(file.originalname);

      if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg' ) {

        callback(null, 'public/idea_section/image');
      } else if (file.mimetype === 'video/mp4') {
        callback(null, 'public/idea_section/video');
      } else {
        //console.log(file.mimetype,"hiii")
        callback({ error: 'Mime type not supported' })
      }
      
    },
    filename: function (req, file, callback) {
     // console.log(file);
      callback(null, file.originalname);
    }
  });
  
var upload = multer({ storage: storage })

router.post("/uploadIdea",upload.any(),ideaSectionController.uploadIdea);
router.get("/ideaSectionList",ideaSectionController.ideaSectionList);
router.get("/ideaDeatails/:id",ideaSectionController.ideaDeatails);


//delete All Data by id
router.delete("/ideadelete/:id", ideaSectionController.ideadelete);

//update data
router.put("/UpadteIdea",upload.any(), ideaSectionController.UpadteIdea);
//status update
router.put("/updateideaStatus/", ideaSectionController.updateideaStatus);

//fetch all active idea section list

router.get("/fetch-all-active-idea-section-data", ideaSectionController.fetch_all_active_idea_section_data);



//update-status-data
router.put("/update-idea-section-status-data/:id", ideaSectionController.update_idea_section_status_data_by_id);


module.exports = router;