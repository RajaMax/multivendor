const { connection } = require('../db/db');


//about as list
exports.aboutus = (req, res, next) => {
  connection.query('select * from about_as where status = ?',[1] ,(err,result,field)=>{
    if(err){
      return console.log(err);
    }else{
    res.json({
      statuscode:200,
      status: "Success",
      message: "Aboute us List Get Successfully",
     data: result
  });
}
  });
}

//Aboute us detail by id
exports.AboutUsDetail = (req, res,next) => {
  connection.query('select * from about_as where status = 1 and aboutus_id = ? ',req.params.id,(err,result,field)=>{
    if(err){
      return console.log(err);
    }else{
    res.json({
      statuscode:200,
      status: "Success",
      message: "About Us Detail Get Successfully",
     data: result
  });
}
  });
}
//About us row delete by id
exports.Aboutusdelete = (req, res,next) => {
  connection.query('delete from about_as where aboutus_id = ?',[req.params.id],(err,result,field)=>{
    if(err){
      return console.log(err);
    }else{
    res.json({
      statuscode:200,
      status: "Success",
      message: "About us Delete Successfully",
  });
}
  });
}

// Add About us  
exports.AddAboutus = (req, res,next) =>{
  
  sql_query="INSERT INTO about_as (title,description,created_by)VALUES ?";

  let dt = req.body;
  var data = [[
    dt.title,
    dt.description,
  dt.created_by]];
  connection.query(sql_query,[data], function (err, result) {  
          if(err) {
            return console.log(err);
            res.json({ status: "Failure", message: "Unable to Save About us details" });
          }
          else{
            res.json({
              statuscode:200,
              status: "Success",
              message: "About Us inserted Successfully",
            data: result.insertId
          });
            
          }
      });  
 
}

//update Aboute us  details by id
exports.UpdateAbouteUs = (req, res, next) => {
  body_data = req.body;
  var data = {
    title: body_data.title,
    description : body_data.description
  }
  var sql_query = "UPDATE `about_as` SET ? WHERE aboutus_id= ?";
  connection.query(sql_query, [data, body_data.id], function (err, results, fields) {
      console.log(err);
      if (err) {
          res.json({ status: "Failure", message: "Unable to Update Aboute us details" });
      } else {
          res.json({
              status: "Success",
              message: "Successfully Updated Aboute us details",
          });
      }
  });
}

//update status api
exports.UpdateAbouteUsStatus = (req, res, next) => {
  body_data = req.body;
  var data = {
    status: body_data.status
  }
  var sql_query = "UPDATE `about_as` SET ? WHERE aboutus_id= ?";
  connection.query(sql_query, [data, body_data.id], function (err, results, fields) {
      console.log(err);
      if (err) {
          res.json({ status: "Failure", message: "Unable to Update Aboute us Status" });
      } else {
          res.json({
              status: "Success",
              message: "Successfully Updated Aboute us Status",
          });
      }
  });
}




