const { connection } = require('../db/db');
const fileURL = 'http://dev.dxminds.online:6500/product_feedback_images/';

//get product feedback ratings
exports.get_product_ratings = (req, res, next) => {
    connection.query(`SELECT * FROM product_feedback`, function (err, results) {
 
    if (err || results.length === 0) {
      res.json({ status: "Failure", message: "Unable to Fetch active Product Feedback details" });
  } else {
      
      console.log(results);
      let data = {};
      let dataArray = [];
      for (let i = 0; i < results.length; i++) {
          if (data[results[i].product_feedback_id] == undefined) {
              data[results[i].product_feedback_id] = {
                product_feedback_id: results[i].product_feedback_id,
                product_image: fileURL + results[i].product_image,
                category_id: results[i].category_id,
                sub_category_id: results[i].sub_category_id,
                customer_rating: results[i].customer_rating,
                description: results[i].description,
                  created_by: results[i].created_by
              }
              dataArray.push(data[results[i].product_feedback_id]);
          }

      }

      res.json({
        statuscode:200,
        status: "Success",
        message: "Successfully fetch Product Feedback details",
          fileURL: fileURL,
          data: dataArray
      });
  }
      });
    }
  

//add product feedback ratings

exports.save_product_rating = (req, res, next) => {
    console.log("data")
    let data = req.body;
    console.log("data",data)
      let datas = [[
        req.file.filename,
        data.category_id,
        data.sub_category_id,
        data.customer_rating,
        data.description,
        '0',
        data.created_by
      ]];
      console.log("data",datas)


    var sql_query = "INSERT INTO product_feedback (`product_image`,`category_id`,`sub_category_id`,`customer_rating`,`description`,`status`,`created_by`) values ?";
    connection.query(sql_query,[datas] , function (err, results) {
        console.log(err);
        if (err) {
            res.json({  statuscode:401,status: "Failure", message: "Unable to Save" });

        } else {
            console.log(results);
    res.json({
        statuscode:200,
        status: "Success",
        message: "Customer Product Rating added Successfully",
       // data: results
    });
}
});
}


//get product feedback ratings by id

exports.get_product_ratings_by_id = (req, res, next) => {
    console.log("product_feedback_id");

    let product_feedback_id = req.params.product_feedback_id;
    console.log("product_feedback_id", product_feedback_id);
    connection.query(`SELECT * FROM product_feedback where product_feedback_id = ${product_feedback_id} `, function (err, result) {
  
      if (err) {
        res.json({  statuscode:401,status: "Failure", message: "Unable to fetch Product Feedback details" });
    } else {
        console.log(result);
        res.json({
            statuscode:200,
            status: "Success",
            message: "Successfully fetch Product Feedback details",
            data: result,
            fileURL: fileURL
        });
    }
    });
}


//Update product feedback ratings
exports.update_product_rating = (req, res, next) => {
    console.log("content");
    dt = req.body;
    console.log("content",dt);

    var data = {
      product_image:dt.product_image,
      category_id: dt.category_id,
      category_id: dt.category_id,
        sub_category_id: dt.sub_category_id,
        customer_rating: dt.customer_rating,
        description: dt.description,
        status: '0',
        created_by: dt.created_by,
    }
    console.log("content",data);

    var sql_query = "UPDATE `product_feedback` SET ? WHERE product_feedback_id= ?";
    connection.query(sql_query, [data, dt.product_feedback_id], function (err, results, fields) {
        console.log(err);
        if (err) {
            res.json({ statuscode:401, status: "Failure", message: "Unable to Update Product Feedback details" });
        } else {
            res.json({
              statuscode:200,
                status: "Success",
                message: "Successfully Updated Product Feedback details",
                fileURL: fileURL
            });
        }
    });

  }
  
//Delete product feedback ratings
exports.delete_product_rating = (req, res, next) => {
    console.log('data deleted');

  var product_feedback_id = req.body.product_feedback_id;
  console.log(product_feedback_id);
  var sql_query = "DELETE FROM `product_feedback` WHERE product_feedback_id= ?";
  connection.query(sql_query, [req.params.product_feedback_id], function (err, result) {
    if (err) {
      res.json({ status: "Failure", message: "Unable to Delete Product Feedback details" });

  } else {
      res.json({
          status: "Success",
          message: "Successfully Deleted Product Feedback details"
      });
  }
  });

}