const { connection } = require('../db/db');


//This is for listing
exports.fetch_privacy_policy_data = (req, res, next) => {
  connection.query('select * from privacy_policy',(err,result,field)=>{
    if(err){
      return console.log(err);
    }else{
    res.json({
      statuscode:200,
      status: "Success",
      message: "Successfully fetched privacy policy data",
     data: result
  });
}
  });
}

//Sungle row details by id
exports.fetch_privacy_policy_data_by_id = (req, res,next) => {
  connection.query('select * from privacy_policy where privacy_policy_id = ? ',req.params.id,(err,result,field)=>{
    if(err){
      return console.log(err);
    }else{
    res.json({
      statuscode:200,
      status: "Success",
      message: "Successfully fetched privacy policy data by Id",
     data: result
  });
}
  });
}
// row delete by id
exports.delete_privacy_policy = (req, res,next) => {
  connection.query('delete from privacy_policy where privacy_policy_id = ?',[req.params.id],(err,result,field)=>{
    if(err){
      return console.log(err);
    }else{
    res.json({
      statuscode:200,
      status: "Success",
      message: "Deleted privacy policy data Successfully",
  });
}
  });
}

// Add data 
exports.save_privacy_policy = (req, res,next) =>{  
    dt= req.body;
        console.log("req.body", req.body)
        var values = [
                [dt.description,dt.created_by, 0],
            ];
  connection.query("INSERT INTO privacy_policy (description,created_by, status) VALUES ?",[values] , function (err, result) {  
          if(err) {
            //return console.log(err);
            res.json({ status: "Failure", message: "Unable to Save privacy policy details" });
          }
          else{
            res.json({
              statuscode:200,
              status: "Success",
              message: "privacy policy data inserted Successfully",
            data: result.insertId
          });
            
          }
      });  
 
}

//update details by id
exports.update_privacy_policy = (req, res, next) => {
  
  body_data = req.body;
  var data = {
    description : body_data.description,
    created_by :body_data.created_by,
    status: '0'
  }
  
  var sql_query = "UPDATE `privacy_policy` SET ? WHERE privacy_policy_id= ?";
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


//fetch_all_active_unit_data
exports.fetch_all_active_privacy_policy_data = (req, res, next) => {
        let sql_query = "SELECT * FROM  privacy_policy where status=1";
        connection.query(sql_query, function (err, results, fields) {
            if (err) {
                res.json({ status: "Failure", message: "Unable to Fetch active privacy policy details" });
            } else {
                console.log(results);
                res.json({
                    status: "Success",
                    message: "Successfully Fetch active privacy policy details",
                    data: results
                });
            }
        });
    }


    //update status apiS

      exports.update_privacy_policy_status = (req, res, next) => {
        console.log("req.body",req.body)
        console.log("req.body",req.params)
        if (!req.params.id) {
            res.json({ status: "failure", message: "Failed to update" });
        } else {
            var sql_query = "UPDATE `privacy_policy` SET ? WHERE privacy_policy_id= ?";
            connection.query(sql_query, [req.body, req.params.id], function (err, results, fields) {
                if (err) {
                    res.json({ status: "Failure", message: "Unable to Update privacy policy Status details" });
      
                } else {
                    res.json({
                        status: "Success",
                        message: "Successfully Updated privacy policy Status details",
                        data: results
                    });
                }
            });
        }
      
      }


