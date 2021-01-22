const { connection } = require('../db/db');

//add

exports.get_productType = (req, res, next) => {
 // console.log("saddddd")
  connection.query(`SELECT * FROM product_type`, function (err, result) {

    if (err) throw err;
    else {
      console.log('data fetched', result);
      res.send(result);
    }
  });
}



exports.add_productType = (req, res, next) => {
    console.log("data")

    let data = req.body;
    let value = [
    data.category_id,
    data.sub_category_id,
    data.sub_category2_id,
    data.product_type_name];

    console.log("data",value)

    let sql_query = `SELECT * FROM product_type WHERE (category_id=? AND subcategory_id=? AND sub_category2_id =? AND product_type_name=? )`;

    connection.query(sql_query,value, function (err, results, fields) {
        if (err) {
            console.log(err);
            res.json({ status: "Failure", message: "Unable to Fetch Product Type details" });
        } else {
            if (results && results.length > 0) {
                res.json({
                  statuscode:401,
                    status: "Failure",
                    message: "This Data Already Exist",
                });
            } else {



    console.log("data",data)
      let datas = [[
        data.category_id,
        data.sub_category_id,
        data.sub_category2_id,
        data.product_type_name,
        '1',
        '0'
      ]];
      console.log("data",datas)


    var sql_query = "INSERT INTO product_type (`category_id`,`subcategory_id`,`sub_category2_id`,`product_type_name`,`created_by`,`status`) values ?";
    connection.query(sql_query,[datas] , function (err, results) {
        console.log(err);
        if (err) {
            res.json({ status: "Failure", message: "Unable to Save" });

        } else {
            console.log(results);
    res.json({
        statuscode:200,
        status: "Success",
        message: "ProductType added Successfully",
       // data: results
    });
}
});
            }
          
}
    });
  }


exports.edit_productType = (req, res, next) => {
    console.log("product_type_id");

    let product_type_id = req.params.product_type_id;
    console.log("product_type_id", product_type_id);
    connection.query(`SELECT * FROM product_type where product_type_id = ${product_type_id} `, function (err, result) {
  
      if (err) throw err;
      else {
        console.log('data fetched', result);
        res.send(result);
      }
    });
}


//Update Data
exports.update_productType = (req, res, next) => {
    console.log("content");

    let data = req.body;
    let value = [
    data.category_id,
    data.sub_category_id,
    data.sub_category2_id,
    data.product_type_name];

    console.log("data",value)

    let sql_query = `SELECT * FROM product_type WHERE (category_id=? AND subcategory_id=? AND sub_category2_id =? AND product_type_name=? )`;

    connection.query(sql_query,value, function (err, results, fields) {
        if (err) {
            console.log(err);
            res.json({ status: "Failure", message: "Unable to Fetch Product Type details" });
        } else {
            if (results && results.length > 0) {
                res.json({
                  statuscode:401,
                    status: "Failure",
                    message: "This Data Already Exist",
                });
            } else {



    var product_type_id = req.body.product_type_id;
    console.log(product_type_id);
    console.log("data",data)
      let datas = [
        data.category_id,
        data.sub_category_id,
        data.sub_category2_id,
        data.product_type_name,
        '1',
        '0',
        data.product_type_id,

      ];
      console.log("data",datas)
  

  
    connection.query('UPDATE product_type SET category_id = ?,subcategory_id = ?,sub_category2_id = ?,product_type_name = ?,created_by = ?,status = ?  WHERE product_type_id = ?', datas, (err, resu) => {
      console.log("result", resu);
      if (err) throw err;
      else {
        res.json({
          statuscode:200,
          status: "Success",
          message: "Successfully Updated details",
      });
      }
    });
  }
}
    });

  }
  
//Delete Data
exports.delete_productType = (req, res, next) => {
    console.log('data deleted');

  var product_type_id = req.body.product_type_id;
  console.log(product_type_id);
  var sql_query = "DELETE FROM `product_type` WHERE product_type_id= ?";
  connection.query(sql_query, [req.params.product_type_id], function (err, result) {

    if (err) throw err;
    else {
      console.log('data deleted', result);

     // res.send(result);
      res.json({
        status: "Success",
        message: "Successfully Deleted details",
    });
    }

  });

}

exports.fetch_all_active_product_type_data = (req, res, next) => {
  let sql_query = "SELECT * FROM  product_type WHERE status= 1";
  connection.query(sql_query, function (err, results, fields) {
      if (err) {
          res.json({ status: "Failure", message: "Unable to Fetch active product type details" });
      } else {
          console.log(results);
          res.json({
              status: "Success",
              message: "Successfully Fetch active product type details",
              data: results
          });
      }
  });
}  


exports.update_product_type_status_data_by_id = (req, res, next) => {
  if (!req.params.id) {
      res.json({ status: "failure", message: "Failed to update" });
  } else {
      var sql_query = "UPDATE `product_type` SET ? WHERE product_type_id= ?";
      connection.query(sql_query, [req.body, req.params.id], function (err, results, fields) {
          if (err) {
              res.json({ status: "Failure", message: "Unable to Update Product type Status details" });

          } else {
              res.json({
                  status: "Success",
                  message: "Successfully Updated Product type Status details",
                  data: results
              });
          }
      });
  }

}