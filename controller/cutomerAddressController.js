const { connection } = require('../db/db');

//add customer

exports.add_customer_address = (req, res, next) => {
    console.log("data")

    let data = req.body;
    console.log("data",data)
      let datas = [[
        data.house_no,
        data.appartment_name,
        data.street_detials,
        data.landmark,
        data.area_details,
        data.city,
        data.pincode,
        data.others,
        data.nickname_for_address
      ]];
      console.log("data",datas)


    var sql_query = "INSERT INTO customer_address (`house_no`,`appartment_name`,`street_detials`,`landmark`,`area_details`,`city`,`pincode`,`others`,`nickname_for_address`) values ?";
    connection.query(sql_query,[datas] , function (err, results) {
        console.log(err);
        if (err) {
            res.json({ status: "Failure", message: "Unable to Save" });

        } else {
            console.log(results);
    res.json({
        statuscode:200,
        status: "Success",
        message: "Customer Address added Successfully",
       // data: results
    });
}
});
}


//get customer by id

exports.edit_customer_address = (req, res, next) => {
    console.log("address_id");

    let address_id = req.params.address_id;
    console.log("address_id", address_id);
    connection.query(`SELECT * FROM customer_address where address_id = ${address_id} `, function (err, result) {
  
      if (err) throw err;
      else {
        console.log('data fetched', result);
        res.send(result);
      }
    });
}


//Update Data
exports.update_customer_address = (req, res, next) => {
    console.log("content");
    let data = req.body;
    console.log("data",data)
      let datas = [
        data.house_no,
        data.appartment_name,
        data.street_detials,
        data.landmark,
        data.area_details,
        data.city,
        data.pincode,
        data.others,
        data.nickname_for_address,
        data.address_id
      ];
      console.log("data",datas)
  

  
    connection.query('UPDATE customer_address SET house_no = ?,appartment_name = ?,street_detials = ?,landmark = ?,area_details = ?,city = ?,pincode = ?,others = ?,nickname_for_address = ?  WHERE address_id = ?', datas, (err, resu) => {
      console.log("result", resu);
      if (err) throw err;
      else {
        //res.send(resu);
        res.json({
          statuscode:200,
          status: "Success",
          message: "Customer Address Updated Successfully",
         // data: results
      });
      }
    });

  }
  
//Delete Data
exports.delete_customer_address = (req, res, next) => {
    console.log('data deleted');

  var address_id = req.body.address_id;
  console.log(address_id);
  var sql_query = "DELETE FROM `customer_address` WHERE address_id= ?";
  connection.query(sql_query, [req.params.address_id], function (err, result) {

    if (err) throw err;
    else {
      console.log('data deleted', result);
    //  res.send(result);
      res.json({
        statuscode:200,
        status: "Success",
        message: "Customer Address Deleted Successfully",
       // data: results
    });
    }

  });

}

exports.update_customer_address_status_data_by_id = (req, res, next) => {
  if (!req.params.id) {
      res.json({ status: "failure", message: "Failed to update" });
  } else {
      var sql_query = "UPDATE `customer_address` SET ? WHERE address_id= ?";
      connection.query(sql_query, [req.body, req.params.id], function (err, results, fields) {
          if (err) {
              res.json({ status: "Failure", message: "Unable to Update Customer Address Status details" });

          } else {
              res.json({
                  status: "Success",
                  message: "Successfully Updated Customer Address Status details",
                  data: results
              });
          }
      });
  }

}