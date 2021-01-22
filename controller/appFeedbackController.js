const { connection } = require('../db/db');


//get app feedback ratings
exports.get_app_ratings = (req, res, next) => {
    connection.query(`SELECT * FROM app_feedback`, function (err, result) {
  
      if (err) throw err;
      else {
        console.log('data fetched', result);
        res.send(result);
      }
    });
  }


//add app feedback ratings

exports.save_app_rating = (req, res, next) => {
    console.log("data")

    let data = req.body;
    console.log("data",data)
      let datas = [[
        data.customer_id,
        data.customer_rating,
        data.description,
      ]];
      console.log("data",datas)


    var sql_query = "INSERT INTO app_feedback (`customer_id`,`customer_rating`,`description`) values ?";
    connection.query(sql_query,[datas] , function (err, results) {
        console.log(err);
        if (err) {
            res.json({ status: "Failure", message: "Unable to Save" });

        } else {
            console.log(results);
    res.json({
        statuscode:200,
        status: "Success",
        message: "App Rating added Successfully",
       // data: results
    });
}
});
}


//get app feedback ratings by id

exports.get_app_ratings_by_id = (req, res, next) => {
    console.log("app_feedback_id");

    let app_feedback_id = req.params.app_feedback_id;
    console.log("app_feedback_id", app_feedback_id);
    connection.query(`SELECT * FROM app_feedback where app_feedback_id = ${app_feedback_id} `, function (err, result) {
  
      if (err) throw err;
      else {
        console.log('data fetched', result);
        res.send(result);
      }
    });
}


//Update app feedback ratings
exports.update_app_rating = (req, res, next) => {
    console.log("content");
    let data = req.body;
    console.log("data",data)
      let datas = [
        data.customer_id,
        data.customer_rating,
        data.description,
        data.app_feedback_id
      ];
      console.log("data",datas)
  

  
    connection.query('UPDATE app_feedback SET customer_id = ?,customer_rating = ?,description = ?  WHERE app_feedback_id = ?', datas, (err, resu) => {
      console.log("result", resu);
      if (err) throw err;
      else {
        res.send(resu);
      }
    });

  }
  
//Delete app feedback ratings
exports.delete_app_rating = (req, res, next) => {

    console.log('data deleted');

  var app_feedback_id = req.body.app_feedback_id;
  console.log(app_feedback_id);
  var sql_query = "DELETE FROM `app_feedback` WHERE app_feedback_id= ?";
  connection.query(sql_query, [req.params.app_feedback_id], function (err, result) {

    if (err) throw err;
    else {
      console.log('data deleted', result);
      res.send(result);
    }

  });

}