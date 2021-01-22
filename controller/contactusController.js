const { connection } = require('../db/db');


//contact us list
exports.contactus = (req, res, next) => {
  connection.query('select * from contact_us',(err,result,field)=>{
    if(err){
      return console.log(err);
    }else{
    res.json({
      statuscode:200,
      status: "Success",
      message: "contact List Get Successfully",
     data: result
  });
}
  });
}

//faq detail by id
exports.ContactDetail = (req, res,next) => {
  console.log(req.params.id)
  connection.query('select * from contact_us where status = 1 and contactus_id = ? ',req.params.id,(err,result,field)=>{
    if(err){
      return console.log(err);
    }else{
      console.log("res",result)
    res.json({
      statuscode:200,
      status: "Success",
      message: "Contactus Detail Get Successfully",
     data: result
  });
}
  });
}
//contact row delete by id
exports.contactdelete = (req, res,next) => {
  connection.query('delete from contact_us where contactus_id = ?',[req.params.id],(err,result,field)=>{
    if(err){
      return console.log(err);
    }else{
    res.json({
      statuscode:200,
      status: "Success",
      message: "Contactus Delete Successfully",
  });
}
  });
}

// Add Contact  
exports.AddContact = (req, res,next) =>{ 
  
  sql_query="INSERT INTO contact_us (title,description )VALUES ?";

  let dt = req.body;
  var data = [[
    dt.title,
    dt.description]];
  connection.query(sql_query, [data], function (err, result) {  
          if(err) {
            return console.log(err);
            res.json({ status: "Failure", message: "Unable to Save contact details" });
          }
          else{
            res.json({
              statuscode:200,
              status: "Success",
              message: "contact inserted Successfully",
            data: result.insertId
          });
            
          }
      });  
 
}

//update contact details by id
exports.Updatecontact = (req, res, next) => {
  body_data = req.body;
  var data = {
    title: body_data.title,
    description : body_data.description
  }
  var sql_query = "UPDATE `contact_us` SET ? WHERE contactus_id= ?";
  connection.query(sql_query, [data, body_data.contactus_id], function (err, results, fields) {
      console.log(err);
      if (err) {
          res.json({ statuscode:401,status: "Failure", message: "Unable to Update contact details" });
      } else {
          res.json({
            statuscode:200,
              status: "Success",
              message: "Successfully Updated contact details",
          });
      }
  });
}

//update status api
exports.UpdateContactUsStatus = (req, res, next) => {
  body_data = req.body;
  var data = {
    status: body_data.status
  }
  var sql_query = "UPDATE `contact_us` SET ? WHERE contactus_id= ?";
  connection.query(sql_query, [data, body_data.id], function (err, results, fields) {
      console.log(err);
      if (err) {
          res.json({ status: "Failure", message: "Unable to Update contact Status" });
      } else {
          res.json({
              status: "Success",
              message: "Successfully Updated contact Status",
          });
      }
  });
}


exports.update_contact_status_data_by_id = (req, res, next) => {
  if (!req.params.id) {
      res.json({ status: "failure", message: "Failed to update" });
  } else {
      var sql_query = "UPDATE `contact_us` SET ? WHERE contactus_id= ?";
      connection.query(sql_query, [req.body, req.params.id], function (err, results, fields) {
          if (err) {
              res.json({ status: "Failure", message: "Unable to Update contact Status details" });

          } else {
              res.json({
                  status: "Success",
                  message: "Successfully Updated contact Status details",
                  data: results
              });
          }
      });
  }

}

