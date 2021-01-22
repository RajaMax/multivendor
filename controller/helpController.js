const { connection } = require('../db/db');


//This is for listing
exports.helpEnquiry = (req, res, next) => {
let sql_query='select * from help_enquiry';

  connection.query(sql_query,(err,result,field)=>{
    if(err){

      res.json({
      
        status: "failures",
        message: "not have details",
       data: result
      });
      return console.log(err);
    }else{
    res.json({
      statuscode:200,
      status: "Success",
      message: "help Enquiry List Get Successfully",
     data: result
  });
}
  });
}

//Sungle row details by id
exports.helpEnquiryDetail = (req, res,next) => {

  let sql_query=`select * from help_enquiry where help_enquiry_id = ${req.params.id}`;

  connection.query(sql_query,(err,result,field)=>{
    if(err){
    
      res.json({ status: "Failure", message: "Unable to fatch details" });
    }else{
    res.json({
      statuscode:200,
      status: "Success",
      message: "Help Enquery Detail Get Successfully",
     data: result
  });
}
  });
}
// row delete by id
exports.helpEnquerydelete = (req, res,next) => {

  let sql_query='delete from help_enquiry where help_enquiry_id = ?';
  connection.query(sql_query,[req.params.id],(err,result,field)=>{
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
// exports.AddHelpEnquery = (req, res,next) =>{ 

//   connection.query("INSERT INTO help_enquiry set ?", req.body, function (err, result) {  
//           if(err) {
//             //return console.log(err);
//             res.json({ status: "Failure", message: "Unable to Save Help Enquery  details" });
//           }
//           else{
//             res.json({
//               statuscode:200,
//               status: "Success",
//               message: "Help Enquery inserted Successfully",
//             data: result.insertId
//           });
            
//           }
//       });  
 
// }



// Add 

exports.AddHelpEnquery = (req, res, next) => {

  console.log(req.file.filename);
  console.log(req.body);

  let dt = req.body;



  let sql_query = `SELECT * FROM help_enquiry WHERE title='${dt.title}'`;

  connection.query(sql_query, function (err, results, fields) {
      if (err) {
          console.log(err);
          res.json({ status: "Failure", message: "Unable to Fetch details" });
      } else {
          if (results && results.length > 0) {
              res.json({
                  status: "Failure",
                  message: "This Data Already Exist",
              });
          } else {
              let banner_data = [[
                  dt.title,
                  dt.description,
                  dt.created_at,
                  '0'
              ]];
              let sql_query = "INSERT INTO home_banner2 (title,description,created_at,status) VALUES ?";
              connection.query(sql_query, [banner_data], function (err, results, fields) {
                  if (err) {
                      console.log(err);
                      res.json({ status: "Failure", message: "Unable to Save home banner2 details" });
                  } else {
                      console.log(results);
                      res.json({
                          status: "Success",
                          message: "Successfully saved home banner2 details",
                      });
                  }
              });
          }


      }
  });

}



//update details by id
exports.UpdateHelpEnquery = (req, res, next) => {
  body_data = req.body;
  var data = {
    title: body_data.title,
    description : body_data.description
  }
  var sql_query = "UPDATE `help_enquiry` SET ? WHERE help_enquiry_id= ?";
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
exports.UpdateHelpEnqueryStatus = (req, res, next) => {
  body_data = req.body;
  var data = {
    status: body_data.status
  }
  var sql_query = "UPDATE `help_enquiry` SET ? WHERE help_enquiry_id= ?";
  connection.query(sql_query, [data, body_data.id], function (err, results, fields) {
      console.log(err);
      if (err) {
          res.json({ status: "Failure", message: "Unable to Update Status" });
      } else {
          res.json({
              status: "Success",
              message: "Successfully Updated Status",
              data: results
          });
      }
  });
}



