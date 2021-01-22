const { connection } = require('../db/db');

//add offer

exports.get_offer = (req, res, next) => {
  console.log("saddddd")
  connection.query(`SELECT * FROM main_offer`, function (err, result) {

    if (err) throw err;
    else {
      console.log('data fetched', result);
      res.send(result);
    }
  });
}



exports.add_offer = (req, res, next) => {
  console.log("data")

  let data = req.body;

  let sql_query = `SELECT * FROM main_offer WHERE offer_name ='${data.offer_name}'`;

  connection.query(sql_query, function (err, results, fields) {
    if (err) {
      console.log(err);
      res.json({ status: "Failure", message: "Unable to Fetch unit details" });
    } else {
      if (results && results.length > 0) {
        res.json({
          status: "Failure",
          message: "This Data Already Exist",
        });
      } else {



        console.log("data", data)
        let datas = [[
          data.offer_name,
          data.sort_order
        ]];
        console.log("data", datas)


        var sql_query = "INSERT INTO main_offer (`offer_name`,`sort_order`) values ?";
        connection.query(sql_query, [datas], function (err, results) {
          console.log(err);
          if (err) {
            res.json({ status: "Failure", message: "Unable to Save" });

          } else {
            console.log(results);
            res.json({
              statuscode: 200,
              status: "Success",
              message: "Offer added Successfully",
              // data: results
            });
          }
        });
      }

    }
  });
}


//get offer by id

exports.edit_offer = (req, res, next) => {
  console.log("offer_id");

  let offer_id = req.params.offer_id;
  console.log("offer_id", offer_id);
  connection.query(`SELECT * FROM main_offer where offer_id = ${offer_id} `, function (err, result) {

    if (err) throw err;
    else {
      console.log('data fetched', result);
      res.send(result);
    }
  });
}


//Update Data
exports.update_offer = (req, res, next) => {
  console.log("content");
  let data = req.body;
  console.log("data", data)
  let datas = [
    data.offer_name,
    data.sort_order,
    data.offer_id
  ];
  console.log("data", datas)



  connection.query('UPDATE main_offer SET offer_name = ?,sort_order = ?  WHERE offer_id = ?', datas, (err, resu) => {
    console.log("result", resu);
    if (err) throw err;
    else {
      res.json({
        status: "Success",
        message: "Successfully Updated details",
      });
    }
  });

}

//Delete Data
exports.delete_offer = (req, res, next) => {
  console.log('data deleted');

  var offer_id = req.body.offer_id;
  console.log(offer_id);
  var sql_query = "DELETE FROM `main_offer` WHERE offer_id= ?";
  connection.query(sql_query, [req.params.offer_id], function (err, result) {

    if (err) throw err;
    else {
      console.log('data deleted', result);
      // res.send(result);
      res.json({
        status: "Success",
        message: "Successfully deleted details",
      });
    }

  });

}

//add sub offer


exports.get_sub_offer = (req, res, next) => {
  connection.query(`SELECT * FROM sub_offer`, function (err, result) {

    if (err) throw err;
    else {
      console.log('data fetched', result);
      res.send(result);
    }
  });
}

exports.add_sub_offer = (req, res, next) => {
  console.log("data")
  let data = req.body;
  let offer_id = JSON.parse(data.main_offer)
  let sort_order = JSON.parse(data.sort_order)


  let sql_query = `SELECT * FROM sub_offer WHERE sub_offer ='${data.sub_offer}'`;

  connection.query(sql_query, function (err, results, fields) {
    if (err) {
      console.log(err);
      res.json({ status: "Failure", message: "Unable to Fetch unit details" });
    } else {
      if (results && results.length > 0) {
        res.json({
          status: "Failure",
          message: "This Data Already Exist",
        });
      } else {



        console.log("data", data)
        let datas = [[
          data.sub_offer,
          offer_id,
          sort_order
        ]];
        console.log("data", datas)

        var sql_query = "INSERT INTO sub_offer (`sub_offer`,`offer_id`,`sort_order`) values ?";
        connection.query(sql_query, [datas], function (err, results) {
          console.log(err);
          if (err) {
            res.json({ status: "Failure", message: "Unable to Save" });

          } else {
            console.log(results);
            res.json({
              statuscode: 200,
              status: "Success",
              message: "sub offer added Successfully",
              // data: results
            });
          }
        });
      }
    }
  });
}

//get sub offer by id

exports.edit_sub_offer = (req, res, next) => {
  console.log("sub_offer_id");

  let sub_offer_id = req.params.sub_offer_id;
  console.log("sub_offer_id", sub_offer_id);
  connection.query(`SELECT * FROM sub_offer where sub_offer_id = ${sub_offer_id} `, function (err, result) {

    if (err) throw err;
    else {
      console.log('data fetched', result);
      res.send(result);
    }
  });
}


//Update Data
exports.update_sub_offer = (req, res, next) => {
  console.log("content");
  let data = req.body;
  console.log("data", data)
  let datas = [
    data.sub_offer,
    data.main_offer,
    data.sort_order,
    data.id
  ];
  console.log("data", datas)



  connection.query('UPDATE sub_offer SET sub_offer = ?,offer_id = ?,sort_order = ?  WHERE sub_offer_id = ?', datas, (err, resu) => {
    console.log("result", resu);
    if (err) throw err;
    else {

      res.json({
        status: "Success",
        message: "Successfully Updated sub offer details"
      });
    }
  });

}

//Delete Data
exports.delete_sub_offer = (req, res, next) => {
  console.log('data deleted');

  var sub_offer_id = req.body.sub_offer_id;
  console.log(sub_offer_id);
  var sql_query = "DELETE FROM `sub_offer` WHERE sub_offer_id= ?";
  connection.query(sql_query, [req.params.sub_offer_id], function (err, result) {

    if (err) throw err;
    else {
      console.log('data deleted', result);
      res.send(result);
    }

  });

}


//fetch_all_active_offer_data
exports.fetch_all_active_offer_data = (req, res, next) => {
  let sql_query = "SELECT * FROM  main_offer where status=1";
  connection.query(sql_query, function (err, results, fields) {
    if (err) {
      res.json({ status: "Failure", message: "Unable to Fetch active offer details" });
    } else {
      console.log(results);
      res.json({
        status: "Success",
        message: "Successfully Fetch active offer details",
        data: results
      });
    }
  });
}

//fetch_all_active_sub_ offer_data
exports.fetch_all_active_sub_offer_data = (req, res, next) => {
  let sql_query = "SELECT * FROM  sub_offer where status=1";
  connection.query(sql_query, function (err, results, fields) {
    if (err) {
      res.json({ status: "Failure", message: "Unable to Fetch active sub offer details" });
    } else {
      console.log(results);
      res.json({
        status: "Success",
        message: "Successfully Fetch active sub offer details",
        data: results
      });
    }
  });
}
exports.update_offer_status_data_by_id = (req, res, next) => {
  if (!req.params.id) {
    res.json({ status: "failure", message: "Failed to update" });
  } else {
    var sql_query = "UPDATE `main_offer` SET ? WHERE offer_id= ?";
    connection.query(sql_query, [req.body, req.params.id], function (err, results, fields) {
      if (err) {
        res.json({ status: "Failure", message: "Unable to Update Offer Status details" });

      } else {
        res.json({
          status: "Success",
          message: "Successfully Updated Offer Status details",
          data: results
        });
      }
    });
  }

}

exports.update_suboffer_status_data_by_id = (req, res, next) => {
  if (!req.params.id) {
    res.json({ status: "failure", message: "Failed to update" });
  } else {
    var sql_query = "UPDATE `sub_offer` SET ? WHERE sub_offer_id= ?";
    connection.query(sql_query, [req.body, req.params.id], function (err, results, fields) {
      if (err) {
        res.json({ status: "Failure", message: "Unable to Update Sub Offer Status details" });

      } else {
        res.json({
          status: "Success",
          message: "Successfully Updated Sub Offer Status details",
          data: results
        });
      }
    });
  }

}