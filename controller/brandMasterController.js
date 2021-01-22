const { connection } = require('../db/db');


//This is for listing
exports.brandList = (req, res, next) => {
  let sql_query = 'select * from brand_master';
  connection.query(sql_query, (err, result, field) => {
    if (err) {
      return console.log(err);
    } else {
      res.json({
        statuscode: 200,
        status: "Success",
        message: "Brand List Get Successfully",
        data: result
      });
    }
  });
}

//Sungle row details by id
exports.brandDetail = (req, res, next) => {
  let sql_query = 'select * from brand_master where brand_id = ? ';
  connection.query(sql_query, req.params.id, (err, result, field) => {
    if (err) {
      return console.log(err);
    } else {
      res.json({
        statuscode: 200,
        status: "Success",
        message: "Brand Detail Get Successfully",
        data: result
      });
    }
  });
}
// row delete by id
exports.brandDelete = (req, res, next) => {

  let sql_query = 'delete from brand_master where brand_id = ?';
  connection.query(sql_query, [req.params.id], (err, result, field) => {
    if (err) {
      return console.log(err);
    } else {
      res.json({
        statuscode: 200,
        status: "Success",
        message: "Brand Delete Successfully",
      });
    }
  });
}

// Add data 
exports.AddBrand = (req, res, next) => {
  console.log("sdfsdf", req.body)

  body_data = req.body;
  var data = [[
    body_data.category,
    body_data.sub_category,
    body_data.product_type_name,
    body_data.brand_name,
    body_data.brand_description,
    '1',
    0
  ]];
  console.log("sdfsdf", data)

  connection.query("INSERT INTO brand_master(`category_id`,`sub_category_id`,`product_type_id`,`brand_name`,`brand_description`,`created_by`,`status`) values  ?", [data], function (err, result) {
    if (err) {
      //return console.log(err);
      res.json({ status: "Failure", message: "Unable to Save Brand details" });
    }
    else {
      console.log("sdfsdf", result)

      res.json({
        statuscode: 200,
        status: "Success",
        message: "Brand inserted Successfully",
        data: result
      });

    }
  });

}

//update details by id
exports.UpdateBrand = (req, res, next) => {
  body_data = req.body;
  var data = {
    category_id: body_data.category,
    sub_category_id: body_data.sub_category,
    product_type_id: body_data.product_type,
    brand_name: body_data.brand_name,
    brand_description: body_data.brand_description,
    created_by: '1',
    status: 0

  }
  console.log("sdfsdf", body_data)

  console.log("sdfsdf", data)

  var sql_query = "UPDATE `brand_master` SET ? WHERE brand_id= ?";
  connection.query(sql_query, [data, body_data.brand_id], function (err, results, fields) {
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
exports.UpdateStatus = (req, res, next) => {
  body_data = req.body;
  var data = {
    status: body_data.status
  }
  var sql_query = "UPDATE `brand_master` SET ? WHERE brand_id= ?";
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

exports.fetch_category = (req, res, next) => {
  let sql_query = "SELECT * FROM  category";
  connection.query(sql_query, function (err, results, fields) {
    if (err) {
      res.json({ status: "Failure", message: "Unable to Fetch category details" });
    } else {
      // console.log(results);
      res.json({
        status: "Success",
        message: "Successfully Fetch category details",
        data: results
      });
    }
  });
}

exports.fetch_subCategory = (req, res, next) => {
  console.log("sdfsdf", req.params.id)

  let sql_query = "SELECT * FROM sub_category WHERE category_id =" + req.params.id;

  connection.query(sql_query, function (err, results, fields) {
    if (err) {
      res.json({ status: "Failure", message: "Unable to Fetch sub category details" });
    } else {

      console.log("sdfsdf", results)

      res.json({
        status: "Success",
        message: "Successfully Fetched sub category details",
        data: results
      });
    }
  });

}


exports.fetch_productTypeName = (req, res, next) => {
  console.log("subcategory_id");

  let body_data = req.body;
  var data = [
    body_data.category_id,
    body_data.subcategory_id,
  ]
  console.log("subcategory_id", data);
  connection.query(`SELECT * FROM product_type where category_id = ? and subcategory_id = ?`, data, function (err, result) {

    if (err) throw err;
    else {
      console.log('data fetched', result);
      res.send(result);
    }
  });
}
exports.fetch_all_active_brand_data = (req, res, next) => {
  let sql_query = "SELECT * FROM  brand_master WHERE status= 1";
  connection.query(sql_query, function (err, results, fields) {
    if (err) {
      res.json({ status: "Failure", message: "Unable to Fetch active brand details" });
    } else {
      console.log(results);
      res.json({
        status: "Success",
        message: "Successfully Fetch active brand details",
      });
    }
  });
}

exports.update_brand_status_data_by_id = (req, res, next) => {
    if (!req.params.id) {
        res.json({ status: "failure", message: "Failed to update" });
    } else {
        var sql_query = "UPDATE `brand_master` SET ? WHERE brand_id= ?";
        connection.query(sql_query, [req.body, req.params.id], function (err, results, fields) {
            if (err) {
                res.json({ status: "Failure", message: "Unable to Update Brand Status details" });

            } else {
                res.json({
                    status: "Success",
                    message: "Successfully Updated Brand Status details",
                    data: results
                });
            }
        });
    }

}

