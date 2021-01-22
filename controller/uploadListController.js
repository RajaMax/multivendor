const jwt= require('jsonwebtoken');
const { connection } = require('../db/db');
var multer = require('multer');
const fs = require('fs');
const path = require('path');
var url = require('url');
const fileURL = 'http://dev.dxminds.online:6500/customerUploadList/';


exports.get_upload_list = (req, res, next) => {
  console.log("customer_id");

  connection.query(`SELECT * from upload_product_list`, function (err, result) {

    if (err) throw err;
    else {
      console.log('data fetched', result);
      res.json({
        statuscode:200,
        status: "Success",
        message: "UploadList fetched Successfully",
        data: result
    });
    }
  });
}

exports.get_upload_list_by_id = (req, res, next) => {
  console.log("customer_id");
  let imageArray = [];
  let imgArrayd = [];

  let customer_id = req.params.customer_id;
  console.log("customer_id", customer_id);
    connection.query(`SELECT * from upload_product_list where customer_id=${customer_id} `, function (err, result) {
      connection.query(`SELECT * from customer_child_table where customer_id=${customer_id} `, function (err, results) {
        console.log('data fetched', result);
        console.log('data fetched', results);

      // connection.query(`SELECT u.customer_upload_id,u.customer_id,u.category_id,u.description,p.child_id, p.child_upload_img_list
  //                   FROM upload_product_list AS u  
  //                   LEFT JOIN customer_child_table AS p  
  //                   ON u.customer_id=p.customer_id  
  //                   where u.customer_id=${customer_id} `, function (err, result) {
                      for(let i=0 ; i<results.length ; i++){
     
                       // console.log(result.length);
                        console.log("imageData1", results[i].child_upload_img_list);
                      imgArrayd.push( 
                        results[i].child_upload_img_list
                      );
                      console.log('data fetched', imgArrayd);
                    }
    if (err){
      res.json({
        statuscode:401,
        status: "Failure",
        message: " Unable to fetch UploadList"
    });
    }
    else {
      console.log('data fetched', result);

      res.json({
        statuscode:200,
        status: "Success",
        message: "UploadList fetched Successfully",
        fileURL: fileURL,
        imgArray:imgArrayd,
        data: result
    });
    }
  });
  });
}

exports.uploadList = (req, res, next) => {
    console.log("data");
    let data = req.body;
   console.log("req",req.filename);

  let imageArray = req.files;
  let description =req.body.description;
  let customer_id = req.body.customer_id;
  let category_id = req.body.category_id;

  
  let datas = [[
    data.customer_id,
    data.category_id,
    data.description
  ]];

//   console.log("datas",datas)

//     console.log("imageArray", imageArray);
//     console.log("description", description);
//     console.log("imageArray.length", imageArray.length);
    var sql_query = "INSERT INTO upload_product_list(customer_id,category_id,description) VALUES ?";
    connection.query(sql_query, [datas], function (err, results) {
        if (err) {
            res.json({ status: "Failure", message: "Unable to Save" });

        } else {
            console.log(results);
           
     for(let i=0 ; i<imageArray.length ; i++){
     
        console.log(imageArray.length);
        console.log("imageData1", imageArray[i].filename);
      let imgArrayd = [[
        imageArray[i].filename,
        req.body.customer_id
      ]];
    //   console.log("imgArrayd",imgArrayd);

        var sql_query = "INSERT INTO customer_child_table(child_upload_img_list,customer_id) VALUES ?";
        connection.query(sql_query, [imgArrayd], function (err, resul) {

      console.log("results",resul);
   
  
    });
}
        }
    
});
}


//Delete Data
exports.delete_uploadList = (req, res, next) => {
  console.log('data deleted');

var customer_id = req.params.customer_id;
console.log(customer_id);
var sql_query = "DELETE FROM `upload_product_list` WHERE customer_id= ?";
connection.query(sql_query, [req.params.customer_id], function (err, result) {
  var sql_query = "DELETE FROM `customer_child_table` WHERE customer_id= ?";
  connection.query(sql_query, [req.params.customer_id], function (err, results) {
  if (err){
    res.json({
      statuscode:401,
      status: "Failure",
      message: "Cann't delete Upload List",
     // data: results
  });
  }
  else {
    console.log('data deleted', result);
  //  res.send(result);
    res.json({
      statuscode:200,
      status: "Success",
      message: "Upload List Deleted Successfully",
     // data: results
  });

  }
});

});

}
  