const { connection } = require('../db/db');
var multer = require('multer');
const fs = require('fs');
const path = require('path');
var url = require('url');
const fileURL = 'http://dev.dxminds.online:6500/return_policy/';



//This is for listing
exports.returnPolicy = (req, res, next) => {
  connection.query('select * from return_policy',(err,result,field)=>{
    if(err){
      return console.log(err);
    }else{
    res.json({
      statuscode:200,
      status: "Success",
      message: "Return Policy List Get Successfully",
     data: result
  });
}
  });
}

//Sungle row details by id
exports.returnPolicyDetail = (req, res,next) => {
  connection.query('select * from return_policy where return_policy_id = ? ',req.params.id,(err,result,field)=>{
    if(err){
      return console.log(err);
    }else{
      console.log(result);
    res.json({
      statuscode:200,
      status: "Success",
      message: "Return Policy Detail Detail Get Successfully",
     data: result,
     fileURL: fileURL
  });
}
  });
}
// row delete by id
exports.reurnPolicydelete = (req, res,next) => {
  connection.query('delete from return_policy where return_policy_id = ?',[req.params.id],(err,result,field)=>{
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
// exports.AddReturnPolicy = (req, res,next) =>{  
//   connection.query("INSERT INTO return_policy set ?", req.body, function (err, result) {  
//           if(err) {
//            // return console.log(err);
//             res.json({ status: "Failure", message: "Unable to save policy details" });
//           }
//           else{
//             res.json({
//               statuscode:200,
//               status: "Success",
//               message: "Return policy inserted Successfully",
//             data: result.insertId
//           });
            
//           }
//       });  
 
// }

exports.AddReturnPolicy = (req, res, next) => {

  body_data = JSON.parse(req.body.data);
  const files = req.files;

 // for (var i = 0; i < files.length; i++) {

     // filename = req.files[i].filename
   //   if (files[i].mimetype == 'image/png' || files[i].mimetype == 'image/jpg' || files[i].mimetype == 'image/jpeg') {
          var imges_data = [[
           body_data.title,
             body_data.description,
             body_data.files,
             body_data.created_by,
            
            ]]
          connection.query("INSERT INTO return_policy(title,description,policy_image,created_by) VALUES ?", [imges_data], function (err, result) {
              if (err) {
                  res.json({statuscode:401, status: "Failure", message: "Unable to insert data" });
              }else
              res.json({
                statuscode:200,
                  status: "Success",
                  message: "Successfully insert details"
              });

          });

   //   }
 // }

}



exports.UpdateReturnPolicy = (req, res, next) => {

  body_data = JSON.parse(req.body.data);
  const files = req.files;
console.log(body_data)
console.log(files)

 // for (var i = 0; i < files.length; i++) {

     // filename = req.files[i].filename
   //   if (files[i].mimetype == 'image/png' || files[i].mimetype == 'image/jpg' || files[i].mimetype == 'image/jpeg') {
          var imges_data = {
            title:body_data.title,
            description: body_data.description,
            policy_image:body_data.files,
            created_by: body_data.created_by,
          }
            console.log(imges_data)

      var sql_query = "UPDATE `return_policy` SET ? WHERE return_policy_id= ?";
      connection.query(sql_query, [imges_data, body_data.id],function (err, result) {
       // console.log(err);
          if (err) {
              res.json({ statuscode:401,status: "Failure", message: "Unable to update images" });
          }
          else{
            res.json({
              statuscode:200,
              status: "Success",
              message: "Successfully update details"
          });
          }
      });  
  
}

//update status api
exports.UpdatereturnPolicyStatus = (req, res, next) => {
  body_data = req.body;
  var data = {
    status: body_data.status
  }
  var sql_query = "UPDATE `return_policy` SET ? WHERE return_policy_id= ?";
  connection.query(sql_query, [data, body_data.id], function (err, results, fields) {
      console.log(err);
      if (err) {
          res.json({statuscode:401, status: "Failure", message: "Unable to Update Status" });
      } else {
          res.json({
            statuscode:200,
              status: "Success",
              message: "Successfully Updated Status",
          });
      }
  });
}

exports.update_return_policy_status_data_by_id = (req, res, next) => {
  if (!req.params.id) {
      res.json({ status: "failure", message: "Failed to update" });
  } else {
      var sql_query = "UPDATE `return_policy` SET ? WHERE return_policy_id= ?";
      connection.query(sql_query, [req.body, req.params.id], function (err, results, fields) {
          if (err) {
              res.json({ status: "Failure", message: "Unable to Update return policy Status details" });

          } else {
              res.json({
                  status: "Success",
                  message: "Successfully Updated return policy Status details",
                  data: results
              });
          }
      });
  }

}


