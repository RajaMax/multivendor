const { connection } = require('../db/db.js');
const path = require('path');

const fileURL = 'http://dev.dxminds.online:6500/sub-category-images/';


exports.fetch_all_sub_category_data = (req, res, next) => {
    let sql_query = "SELECT * FROM  sub_category order by sub_category_id";
    connection.query(sql_query, function (err, results, fields) {
        if (err) {
            res.json({ status: "Failure", message: "Unable to Fetch Sub category details" });
        } else {
            console.log(results);
            res.json({
                status: "Success",
                message: "Successfully Fetch Sub category details",
                fileURL: fileURL,
                data: results
            });
        }
    });
}

// Save Category Data
exports.fetch_save_sub_category_data = (req, res, next) => {

    const dt=JSON.parse(req.body.data)
    // JSON.parse(req.body.data.main_category)
     let category_id = JSON.parse(dt.main_category)
// console.log("dt",   req.body.data.main_category)
console.log("dt",dt)
 console.log("dt",   JSON.parse(dt.main_category))


    let sql_query = `SELECT * FROM sub_category WHERE category_id=${category_id} and sub_category_name ='${dt.sub_category_name}'`;

    connection.query(sql_query, function (err, results, fields) {
        if (err) {
            console.log(err);
            res.json({ status: "Failure", message: "Unable to Fetch sub category details" });
        } else {
            if (results && results.length > 0) {
                res.json({
                    status: "Failure",
                    message: "This Data Already Exist",
                });
            } else {
                var values = [
                    [category_id, dt.sub_category_name, req.file.filename, 0, 1],
                ];
                console.log("dt",values)

                let sql_query = "INSERT INTO sub_category (category_id,sub_category_name,sub_category_image, status,created_by) VALUES ?";
                connection.query(sql_query, [values], function (err, results, fields) {
                    if (err) {
                        console.log(err);
                        res.json({ status: "Failure", message: "Unable to Save sub category details" });
                    } else {
                        console.log(results);
                        res.json({
                            status: "Success",
                            message: "Successfully saved sub category details",
                        });
                    }
                });
            }


        }
    });

}
//Fetch Data By id
exports.fetch_sub_category_data_by_id = (req, res, next) => {

    let sql_query = "SELECT * FROM sub_category WHERE sub_category_id =" + req.params.id;

    connection.query(sql_query, function (err, results, fields) {
        if (err) {
            res.json({ status: "Failure", message: "Unable to Fetch sub category details" });
        } else {
            res.json({
                status: "Success",
                message: "Successfully Fetched sub category details",
                fileURL: fileURL,
                data: results
            });
        }
    });

}
//Update Category by Id
exports.update_sub_category_data_by_id = (req, res, next) => {
   // console.log("dgdsgfsdfs",req.body)

    
    const dt=JSON.parse(req.body.data)
    console.log("dgdsgfsdfs",dt)

    // JSON.parse(req.body.data.main_category)
     let category_id = JSON.parse(dt.main_category)
    let sub_category_image = path.basename(dt.files)
     console.log("dgdsgfsdfs",path.basename(dt.files))
     let sub_category_id = JSON.parse(dt.id)



    var values = {
        category_id: category_id,
        sub_category_name: dt.sub_category_name,
        sub_category_image: sub_category_image,
        status: 0,
        created_by:1}

    console.log("dgdsgfsdfs",sub_category_id)
    console.log("dgdsgfsdfs",values)


    var sql_query = "UPDATE `sub_category` SET ? WHERE sub_category_id= ?";
    connection.query(sql_query, [values,sub_category_id], function (err, results, fields) {
        console.log(err);
        if (err) {
            res.json({ status: "Failure", message: "Unable to Update sub category details" });
        } else {
            res.json({
                status: "Success",
                message: "Successfully Updated sub category details",
            });
        }
    });
}
//Delete Data By id
exports.delete_sub_category_data_by_id = (req, res, next) => {

    let sql_query = "DELETE FROM `sub_category` WHERE sub_category_id= ?";

    connection.query(sql_query, [req.params.id], function (err, results, fields) {
        if (err) {
            res.json({ status: "Failure", message: "Unable to Delete sub category details" });

        } else {
            res.json({
                status: "Success",
                message: "Successfully Deleted sub category details"
            });
        }
    });

}

//Fetch sub Category Data by category Id
exports.fetch_all_sub_category_data_by_category_id = (req, res, next) => {
    console.log("req.body",req.params.id)

    let sql_query = "SELECT sub_category_id ,category_id ,sub_category_name,sub_category_image,status FROM sub_category WHERE status=1 and category_id= ?";

    connection.query(sql_query, [req.params.id], function (err, results, fields) {
        if (err) {
            res.json({ status: "Failure", message: "Unable to Fetch sub category details by category id" });

        } else {
            res.json({
                status: "Success",
                message: "Successfully Fetch sub category details by category id",
                data: results
            });
        }
    });

}

exports.fetch_all_active_sub_category_data = (req, res, next) => {
    let sql_query = "SELECT * FROM  sub_category WHERE status= 1";
    connection.query(sql_query, function (err, results, fields) {
        if (err || results.length === 0){
            res.json({ status: "Failure", message: "Unable to Fetch active subcategory details" });
        } else {
            console.log(results);
            let data = {};
            let dataArray = [];
            for (let i = 0; i < results.length; i++) {
                if (data[results[i].sub_category_id] == undefined) {
                    data[results[i].sub_category_id] = {
                        sub_category_id: results[i].sub_category_id,
                        category_id: results[i].category_id,
                        sub_category_image: fileURL + results[i].sub_category_image,
                        sub_category_name: results[i].sub_category_name,
                        created_by: results[i].created_by
                    }
                    dataArray.push(data[results[i].sub_category_id]);
                }
        
            }
            res.json({
                status: "Success",
                message: "Successfully Fetch active subcategory details",
                fileURL: fileURL,
                data: dataArray
            });
        }
    });
  }  



  
  
  
  exports.update_sub_category_status_data_by_id = (req, res, next) => {
    if (!req.params.id) {
        res.json({ status: "failure", message: "Failed to update" });
    } else {
        var sql_query = "UPDATE `sub_category` SET ? WHERE sub_category_id= ?";
        connection.query(sql_query, [req.body, req.params.id], function (err, results, fields) {
            if (err) {
                res.json({ status: "Failure", message: "Unable to Update subcategory Status details" });

            } else {
                res.json({
                    status: "Success",
                    message: "Successfully Updated subcategory Status details",
                    data: results
                });
            }
        });
    }

}
