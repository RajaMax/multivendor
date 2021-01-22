const { connection } = require('../db/db');


//This Api for listing
exports.commisionList = (req, res, next) => {
  connection.query('select * from commision_management',(err,result,field)=>{
    if(err){
      return console.log(err);
    }else{
    res.json({
      statuscode:200,
      status: "Success",
      message: "Commision List Get Successfully",
     data: result
  });
}
  });
}

//Sungle row details by id
exports.commisionDetails = (req, res,next) => {
  connection.query('select * from commision_management where commision_management_id = ? ',req.params.id,(err,result,field)=>{
    if(err){
      return console.log(err);
    }else{
    res.json({
      statuscode:200,
      status: "Success",
      message: "Commision Detail Get Successfully",
     data: result
  });
}
  });
}
// row delete by id
exports.commisionDelete = (req, res,next) => {
  connection.query('delete from commision_management where commision_management_id = ?',[req.params.id],(err,result,field)=>{
    if(err){
      return console.log(err);
    }else{
    res.json({
      statuscode:200,
      status: "Success",
      message: "Commision Delete Successfully",
  });
}
  });
}

// Add data 
exports.addCommision = (req, res,next) =>{  
  connection.query("INSERT INTO commision_management set ?", req.body, function (err, result) {  
          if(err) {
            return console.log(err);
            res.json({ status: "Failure", message: "Unable to Save Help Enquery  details" });
          }
          else{
            res.json({
              statuscode:200,
              status: "Success",
              message: "Help Enquery inserted Successfully",
            data: result.insertId
          });
            
          }
      });  
 
}

//update details by id
exports.updateCommision = (req, res, next) => {
  body_data = req.body;
  var data = {
    vendor_id: body_data.vendor_id,
    product_id : body_data.product_id,
    amount_type : body_data.amount_type,
    amount : body_data.amount,
    quantity : body_data.quantity,
    unit_id : body_data.unit_id,
    sub_unit_id : body_data.sub_unit_id,
    unit_value_id : body_data.unit_value_id,
    created_by : body_data.created_by

  }
  var sql_query = "UPDATE `commision_management` SET ? WHERE commision_management_id= ?";
  connection.query(sql_query, [data, body_data.id], function (err, results, fields) {
      console.log(err);
      if (err) {
          res.json({ status: "Failure", message: "Unable to Update details" });
      } else {
          res.json({
              status: "Success",
              message: "Successfully Updated details",
          });
      }
  });
}

//update status api
exports.updateCommisionStatus = (req, res, next) => {
  body_data = req.body;
  var data = {
    status: body_data.status
  }
  var sql_query = "UPDATE `commision_management` SET ? WHERE commision_management_id= ?";
  connection.query(sql_query, [data, body_data.id], function (err, results, fields) {
      console.log(err);
      if (err) {
          res.json({ status: "Failure", message: "Unable to Update Status" });
      } else {
          res.json({
              status: "Success",
              message: "Successfully Updated Status",
          });
      }
  });
}

exports.update_Commision_status_data_by_id = (req, res, next) => {
  if (!req.params.id) {
      res.json({ status: "failure", message: "Failed to update" });
  } else {
      var sql_query = "UPDATE `commision_management` SET ? WHERE commision_management_id= ?";
      connection.query(sql_query, [req.body, req.params.id], function (err, results, fields) {
          if (err) {
              res.json({ status: "Failure", message: "Unable to Update Commision Status details" });

          } else {
              res.json({
                  status: "Success",
                  message: "Successfully Updated Commision Status details",
                  data: results
              });
          }
      });
  }

}



