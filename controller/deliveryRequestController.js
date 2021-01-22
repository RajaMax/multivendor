const { connection } = require('../db/db');


//This is for listing
exports.deliveryRequestList = (req, res, next) => {
  connection.query('select * from delivery_request',(err,result,field)=>{
    if(err){
      return console.log(err);
    }else{
    res.json({
      statuscode:200,
      status: "Success",
      message: "Delivery Request List Get Successfully",
     data: result
  });
}
  });
}

//Sungle row details by id
exports.DeliveryRequestyDetail = (req, res,next) => {
  connection.query('select * from delivery_request where delivery_request_id = ? ',req.params.id,(err,result,field)=>{
    if(err){
      return console.log(err);
    }else{
    res.json({
      statuscode:200,
      status: "Success",
      message: "Delivery Request Detail Get Successfully",
     data: result
  });
}
  });
}
// row delete by id
exports.deliveryrequestdelete = (req, res,next) => {
  connection.query('delete from delivery_request where delivery_request_id = ?',[req.params.id],(err,result,field)=>{
    if(err){
      return console.log(err);
    }else{
    res.json({
      statuscode:200,
      status: "Success",
      message: "Help Enquery Delete Successfully",
  });
}
  });
}

// Add data 
exports.AddDeliveryRequest = (req, res,next) =>{  

  connection.query("INSERT INTO delivery_request set ?", req.body, function (err, result) {  
          if(err) {
            //return console.log(err);
            res.json({ status: "Failure", message: "Unable to Save Delivery Request details" });
          }
          else{
            res.json({
              statuscode:200,
              status: "Success",
              message: "Delivery Request inserted Successfully",
            data: result.insertId
          });
            
          }
      });  
 
}

//update details by id
exports.UpdateDeliveryRequest = (req, res, next) => {
  body_data = req.body;
  var data = {
    name: body_data.name,
    email : body_data.email,
    delivery_city : body_data.delivery_city,
    delivery_location : body_data.delivery_location
  }
  var sql_query = "UPDATE `delivery_request` SET ? WHERE delivery_request_id= ?";
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
exports.UpdateDeliveryRequestStatus = (req, res, next) => {
  body_data = req.body;
  var data = {
    status: body_data.status
  }
  var sql_query = "UPDATE `delivery_request` SET ? WHERE delivery_request_id= ?";
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




