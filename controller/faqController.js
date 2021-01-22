const { connection } = require('../db/db');


//faq list
exports.faq = (req, res, next) => {
  connection.query('select * from faq',(err,result,field)=>{
    if(err){
      return console.log(err);
    }else{
    res.json({
      statuscode:200,
      status: "Success",
      message: "Faq List Get Successfully",
     data: result
  });
}
  });
}

//faq detail by id
exports.faqDetail = (req, res,next) => {
  connection.query('select * from faq where status = 1 and faq_id = ? ',req.params.id,(err,result,field)=>{
    if(err){
      return console.log(err);
    }else{
    res.json({
      statuscode:200,
      status: "Success",
      message: "Faq Detail Get Successfully",
     data: result
  });
}
  });
}
//faq row delete by id
exports.faqdelete = (req, res,next) => {
  connection.query('delete from faq where faq_id = ?',[req.params.id],(err,result,field)=>{
    if(err){
      return console.log(err);
    }else{
    res.json({
      statuscode:200,
      status: "Success",
      message: "Faq Delete Successfully",
  });
}
  });
}

//add faq question 
exports.createFaq = (req, res,next) =>{  
  connection.query("INSERT INTO faq set ?", req.body, function (err, result) {  
          if(err) {
            return console.log(err);
          }
          else{
            res.json({
              statuscode:200,
              status: "Success",
              message: "Faq inserted Successfully",
            data: result.insertId
          });
            
          }
      });  
 
}

//update faq details by id
exports.UpdateFaq = (req, res, next) => {
  body_data = req.body;
  var data = {
    question: body_data.question,
    answer : body_data.answer
  }
  var sql_query = "UPDATE `faq` SET ? WHERE faq_id= ?";
  connection.query(sql_query, [data, body_data.faq_id], function (err, results, fields) {
      console.log(err);
      if (err) {
          res.json({ statuscode:401,status: "Failure", message: "Unable to Update faq details" });
      } else {
          res.json({
            statuscode:200,
              status: "Success",
              message: "Successfully Updated faq details",
          });
      }
  });
}

//update status api
exports.UpdateFaqstatus = (req, res, next) => {
  body_data = req.body;
  var data = {
    status: body_data.status
  }
  var sql_query = "UPDATE `faq` SET ? WHERE faq_id= ?";
  connection.query(sql_query, [data, body_data.faq_id], function (err, results, fields) {
      console.log(err);
      if (err) {
          res.json({ status: "Failure", message: "Unable to Update FAQ Status" });
      } else {
          res.json({
              status: "Success",
              message: "Successfully Updated FAQ Status",
          });
      }
  });
}

exports.update_faq_status_data_by_id = (req, res, next) => {
  if (!req.params.id) {
      res.json({ status: "failure", message: "Failed to update" });
  } else {
      var sql_query = "UPDATE `faq` SET ? WHERE faq_id= ?";
      connection.query(sql_query, [req.body, req.params.id], function (err, results, fields) {
          if (err) {
              res.json({ status: "Failure", message: "Unable to Update faq Status details" });

          } else {
              res.json({
                  status: "Success",
                  message: "Successfully Updated faq Status details",
                  data: results
              });
          }
      });
  }

}


