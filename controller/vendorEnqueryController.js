const { connection } = require('../db/db');


//This is for listing
exports.VendorEnquiry = (req, res, next) => {
  connection.query('select * from vendor_enquery',(err,result,field)=>{
    if(err){
      return console.log(err);
    }else{
    res.json({
      statuscode:200,
      status: "Success",
      message: "Vendor Enquiry List Get Successfully",
     data: result
  });
}
  });
}

//Sungle row details by id
exports.VendorEnquiryDetail = (req, res,next) => {



  connection.query('select * from vendor_enquery where vendor_enquery_id = ? ',req.params.id,(err,result,field)=>{
    if(err){
      return console.log(err);
    }else{
    res.json({
      statuscode:200,
      status: "Success",
      message: "Vendor Enquery Detail Get Successfully",
     data: result
  });
}
  });
}






// Add data 
exports.AddVendorEnquery = (req, res,next) =>{  
  console.log(req.body);
  var data = [[
   req.body.title,
   req.body.question, 
  req.body.vendor_id,
  req.body.created_by,
    '0',
  ]]
console.log(data);

  connection.query("INSERT INTO `vendor_enquery`(`title`,`description`,`vendor_id`,`created_by`,`status`) VALUES ?",[data], function (err, result) {  
          if(err) {
            //return console.log(err);
            res.json({ status: "Failure", message: "Unable to Save Vendor Enquery details" });
          }
          else{
            console.log(result);
            res.json({
              statuscode:200,
              status: "Success",
              message: "Vendor Enquery inserted Successfully",
            data: result.insertId
          });
            
          }
      });  
 

}

//Delete Data By id
exports.delete_vendor_enquery_data_by_id = (req, res, next) => {

  console.log(req.params.id)

  let sql_query = "DELETE FROM `vendor_enquery` WHERE vendor_enquery_id= ?";

  connection.query(sql_query, [req.params.id], function (err, results, fields) {
      if (err) {
          res.json({ status: "Failure", message: "Unable to Delete Vendor Enquery details" });

      } else {
          res.json({
              status: "Success",
              message: "Successfully Deleted Vendor Enquery details"
          });
      }
  });
}

//Update by Id
exports.update_vendor_enquery_data_by_id = (req, res, next) => {

  const dt = req.body
  console.log("dgdsgfsdfs",dt)
  var data = {
    title: dt.title,
    description: dt.question,
    answer: dt.answer,
    vendor_id: dt.vendor_id,
    created_by: dt.created_by,
    status:'0'
  }
  console.log("dsdsadasd", data)

  var sql_query = "UPDATE `vendor_enquery` SET ? WHERE vendor_enquery_id= ?";
  connection.query(sql_query, [data, dt.enquiry_id], function (err, results, fields) {
      console.log(err);
      if (err) {
          res.json({statuscode:401, status: "Failure", message: "Unable to Update Vendor Enquery details" });
      } else {
        console.log(results);

          res.json({
            statuscode:200,
              status: "Success",
              message: "Successfully Updated Vendor Enquery details",
          });
      }
  });

}