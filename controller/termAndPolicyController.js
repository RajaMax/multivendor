const { connection } = require('../db/db');


//This is for listing
exports.termPolicy = (req, res, next) => {
  connection.query('select * from terms_and_policy',(err,result,field)=>{
    if(err){
      return console.log(err);
    }else{
    res.json({
      statuscode:200,
      status: "Success",
      message: "Terms And Policy List Get Successfully",
     data: result
  });
}
  });
}

//Sungle row details by id
exports.termsAndPolicyDetail = (req, res,next) => {
  connection.query('select * from terms_and_policy where status = 1 and terms_and_policy_id = ? ',req.params.id,(err,result,field)=>{
    if(err){
      return console.log(err);
    }else{
    res.json({
      statuscode:200,
      status: "Success",
      message: "Terms and Policy Detail Get Successfully",
     data: result
  });
}
  });
}
// row delete by id
exports.termAndPolicydelete = (req, res,next) => {
  connection.query('delete from terms_and_policy where terms_and_policy_id = ?',[req.params.id],(err,result,field)=>{
    if(err){
      return console.log(err);
    }else{
    res.json({
      statuscode:200,
      status: "Success",
      message: "Terms And Policy Delete Successfully",
  });
}
  });
}

// Add data 
exports.AddTermsAndPolicy = (req, res,next) =>{  
  connection.query("INSERT INTO terms_and_policy set ?", req.body, function (err, result) {  
          if(err) {
            //return console.log(err);
            res.json({ status: "Failure", message: "Unable to Save details" });
          }
          else{
            res.json({
              statuscode:200,
              status: "Success",
              message: "Terms And Policy inserted Successfully",
            data: result.insertId
          });
            
          }
      });  
 
}

//update details by id
exports.UpdateTermsAndCondition = (req, res, next) => {
  console.log("req.body",req.body)
  body_data = req.body;
  var data = {
    title: body_data.title,
    description : body_data.description
  }
  console.log("req.body",data)

  var sql_query = "UPDATE `terms_and_policy` SET ? WHERE terms_and_policy_id= ?";
  connection.query(sql_query, [data, body_data.terms_and_policy_id], function (err, results, fields) {
      console.log(err);
      if (err) {
          res.json({statuscode:401,status: "Failure", message: "Unable to Update details" });
      } else {
          res.json({
            statuscode:200,
              status: "Success",
              message: "Successfully Updated details",
          });
      }
  });
}

//update status api
exports.UpdateTermsAndPolicyStatus = (req, res, next) => {
  body_data = req.body;
  var data = {
    status: body_data.status
  }
  var sql_query = "UPDATE `terms_and_policy` SET ? WHERE terms_and_policy_id= ?";
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


exports.update_terms_and_condition_status_data_by_id = (req, res, next) => {
  if (!req.params.id) {
      res.json({ status: "failure", message: "Failed to update" });
  } else {
      var sql_query = "UPDATE `terms_and_policy` SET ? WHERE terms_and_policy_id= ?";
      connection.query(sql_query, [req.body, req.params.id], function (err, results, fields) {
          if (err) {
              res.json({ status: "Failure", message: "Unable to Update terms and condition Status details" });

          } else {
              res.json({
                  status: "Success",
                  message: "Successfully Updated terms and condition Status details",
                  data: results
              });
          }
      });
  }

}

