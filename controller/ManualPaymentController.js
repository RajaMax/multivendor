const { connection } = require('../db/db');

const imgFileURL = 'http://dev.dxminds.online:6500/manual_payment/';


exports.AddManualPaymentData = (req, res, next) => {

  body_data =req.body;
   
      const files = req.files
        for (var i = 0; i < files.length; i++) {
        //  console.log(files.length);
        fieldname = req.files[i].fieldname
        filename = req.files[i].filename
    
if (files[i].mimetype == 'image/png' || files[i].mimetype == 'image/jpg' || files[i].mimetype == 'image/jpeg') {
          var imges_data = {
            doc_image: filename,
    order_id: body_data.order_id,
    created_by: body_data.created_by
          }
          connection.query("INSERT INTO manual_payment set ?", imges_data, function (err, result) {
            if (err) {
              res.json({statuscode:"401", status: "Failure", message: "Unable to insert images" });
            }

          });

        }
       
      }
      res.json({
        statuscode:"200",
        status: "Success",
        message: "Successfully insert details",
       
      });
    }


exports.manualPaymentList = (req, res, next) => {
  var data = [];
  var images = [];
  
  
      connection.query('select * from manual_payment' , (err, manual_payment, field) => {
        if (err) {
          res.json({statuscode:"401", status: "Failure", message: "Something went wrong" });
        }
        else {

          res.json({
            statuscode: 200,
            status: "Success",
            message: "Manual payment List Get Successfully",
            data: manual_payment,
          
         
        
      });
    }

    });
      //videos
      
}


exports.manualPaymentListById = (req, res, next) => {
  if (!req.params.id) {
    res.json({ status: "failure", message: "Failed to faitch" });
} else {
let manual_payment_id = req.params.id;
  connection.query('select * from manual_payment where manual_payment_id  = ?', [req.params.id], (err, result, field) => {


        if (err) {
          res.json({statuscode:"401", status: "Failure", message: "Something went wrong" });
        }
        else {

          res.json({
            statuscode: 200,
            status: "Success",
            message: "Manual payment List Get Successfully",
            data: result,
          
         
        
      });
    }

    });
  }
    
      
}





  








