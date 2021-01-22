const { connection } = require('../db/db');


//faq list
exports.range = (req, res, next) => {
    console.log(req.params);

    let sql_query='select * from vendor_setting where vendor_range_id  = ? ';

    console.log(sql_query);
  connection.query(sql_query,[req.params.vendor_range_id],(err,result,field)=>{
    if(err){
      return console.log(err);
      res.json({
         status: "failure",
        message: "Range Not Found" });
    }else{
    res.json({
      status: "Success",
      message: "Range List Get Successfully",
      data: result
  });
}
  });
}


//add faq question 
// exports.AddRange = (req, res,next) =>{  
   
//   let dt = req.body;
  

// if(dt.vendor_range_id)
// {

//     var data = {
//         vendor_id: dt.vendor_id,
//         location_range : dt.location_range,
//         created_by : dt.created_by
//       }
//     var sql_query = "UPDATE `vendor_setting` SET ? WHERE vendor_range_id= ?";
//     connection.query(sql_query, [data,dt.vendor_range_id], function (err, results, fields) {
//         console.log(err);
//         if (err) {
//             res.json({ status: "Failure", message: "Unable to Update details" });
//         } else {
//             res.json({
//                 status: "Success",
//                 message: "Successfully Updated details",
//             });
//         }
//     });
// }else
// {

//     var data = [[
//         dt.vendor_id,
//         dt.location_range,
//       dt.created_by]];

//     sql_query="INSERT INTO vendor_setting (vendor_id,location_range,created_by)VALUES ?";
//     connection.query(sql_query,[data], function (err, result)  {  
//         if(err) {
//             res.json({ status: "Failure", message: "Unable to Add details" });

//         }
//         else{
//           res.json({
           
//             status: "Success",
//             message: "Range inserted Successfully",
//           data: result.insertId
//         });
          
//         }
//     }); 


// }

 
      
      


 
// }

// //update faq details by id
// exports.UpdateFaq = (req, res, next) => {
//   body_data = req.body;
//   var data = {
//     question: body_data.question,
//     answer : body_data.answer
//   }
//   var sql_query = "UPDATE `vendor_setting` SET ? WHERE vendor_range_id= ?";
//   connection.query(sql_query, [data, body_data.faq_id], function (err, results, fields) {
//       console.log(err);
//       if (err) {
//           res.json({ status: "Failure", message: "Unable to Update faq details" });
//       } else {
//           res.json({
//               status: "Success",
//               message: "Successfully Updated faq details",
//           });
//       }
//   });
// }


exports.AddRange = (req, res,next) =>{  
   
  let dt = req.body;

  console.log("dt",dt);
  

if(dt.hidden_id)
{

    var data = {
        vendor_id: dt.vendor_id,
        location_range : dt.range,
        created_by : dt.created_by
      }

      console.log("data",data);
    var sql_query = "UPDATE `vendor_setting` SET ? WHERE vendor_range_id= ?";
    connection.query(sql_query, [data,dt.hidden_id], function (err, results, fields) {
        console.log(err);
        if (err) {
         // console.log(err);
            res.json({ status: "Failure", message: "Unable to Update details" });
        } else {
            res.json({
                status: "Success",
                message: "Successfully Updated details",
            });
        }
    });
}else
{

    var data = [[
        dt.vendor_id,
        dt.range,
      dt.created_by]];

    sql_query="INSERT INTO vendor_setting (vendor_id,location_range,created_by)VALUES ?";
    connection.query(sql_query,[data], function (err, result)  {  
        if(err) {
          console.log(err);
         
            res.json({ status: "Failure", message: "Unable to Add details" });

        }
        else{
          res.json({
           
            status: "Success",
            message: "Range inserted Successfully",
          data: result.insertId
        });
          
        }
    }); 


}

 
      
      


 
}



