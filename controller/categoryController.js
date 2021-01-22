const { connection } = require('../db/db.js');
const path = require('path');


const fileURL = 'http://dev.dxminds.online:6500/category-images/';



exports.fetch_all_active_category_data = (req, res, next) => {
    let sql_query = "SELECT * FROM  category where status=1";
    connection.query(sql_query, function (err, results, fields) {
        if (err) {
            res.json({ status: "Failure", message: "Unable to Fetch category details" });
        } else {
            // console.log(results);
            res.json({
                status: "Success",
                message: "Successfully Fetch category details",
                fileURL: fileURL,
                data: results
            });
        }
    });
}


exports.fetch_all_category_data = (req, res, next) => {
    let sql_query = "SELECT * FROM  category";
    connection.query(sql_query, function (err, results, fields) {
        if (err) {
            res.json({ status: "Failure", message: "Unable to Fetch category details" });
        } else {
            // console.log(results);
            res.json({
                status: "Success",
                message: "Successfully Fetch category details",
                fileURL: fileURL,
                data: results
            });
        }
    });
}

// Save Category Data
exports.fetch_save_category_data = (req, res, next) => {
    console.log(req.body.data);
    console.log( req.file.filename);

    const dt=JSON.parse(req.body.data)
    console.log(dt);

    let sql_query = `SELECT * FROM category WHERE category_name ='${dt.category_name}'`;

    connection.query(sql_query, function (err, results, fields) {
        if (err) {
            console.log(err);
            res.json({ status: "Failure", message: "Unable to Fetch category details" });
        } else {
            if (results && results.length > 0) {
                res.json({
                    status: "Failure",
                    message: "This Data Already Exist",
                });
            } else {
                var values = [
                    [dt.category_name, req.file.filename, 0],
                ];
                let sql_query = "INSERT INTO category (category_name,category_image, status) VALUES ?";
                connection.query(sql_query, [values], function (err, results, fields) {
                    if (err) {
                        res.json({ status: "Failure", message: "Unable to Save category details" });
                    } else {
                        // console.log(results);
                        res.json({
                            status: "Success",
                            message: "Successfully Fetched category details",
                        });
                    }
                });
            }


        }
    });


}
//Fetch Data By id
exports.fetch_category_data_by_id = (req, res, next) => {
    console.log("dsdsadasd", req.params.id)

    let sql_query = "SELECT * FROM category WHERE category_id =" + req.params.id;

    connection.query(sql_query, function (err, results, fields) {
        if (err) {
            res.json({ status: "Failure", message: "Unable to Fetch category details" });
        } else {
            res.json({
                status: "Success",
                message: "Successfully Fetched category details",
                fileURL: fileURL,
                data: results
            });
        }
    });

}
//Update Category by Id
exports.update_category_data_by_id = (req, res, next) => {

    const dt = JSON.parse(req.body.data)
    let sub_category_image = path.basename(dt.files)
    console.log("dgdsgfsdfs", path.basename(dt.files))
    var data = {
        category_name: dt.category_name,
        category_image: sub_category_image
    }
    console.log("dsdsadasd", data)

    var sql_query = "UPDATE `category` SET ? WHERE category_id= ?";
    connection.query(sql_query, [data, dt.id], function (err, results, fields) {
        console.log(err);
        if (err) {
            res.json({ status: "Failure", message: "Unable to Update category details" });
        } else {
            res.json({
                status: "Success",
                message: "Successfully Updated category details",
            });
        }
    });
}
//Delete Data By id
exports.delete_category_data_by_id = (req, res, next) => {

    console.log("dsdsadasd")
    let sql_query = "DELETE FROM `category` WHERE category_id= ?";

    connection.query(sql_query, [req.params.id], function (err, results, fields) {
        if (err) {
            console.log(err);
            res.json({ status: "Failure", message: "Unable to Delete category details" });
        } else {
            res.json({
                status: "Success",
                message: "Successfully Deleted category details"
            });
        }
    });

}


exports.fetch_all_active_category_data = (req, res, next) => {
    let sql_query = "SELECT category_id,category_name,category_image,status FROM  category WHERE status= 1";
    connection.query(sql_query, function (err, results, fields) {
        if (err || results.length === 0) {
            res.json({ status: "Failure", message: "Unable to Fetch active category details" });
        } else {
            
            console.log(results);
            let data = {};
            let dataArray = [];
            for (let i = 0; i < results.length; i++) {
                if (data[results[i].category_id] == undefined) {
                    data[results[i].category_id] = {
                        category_id: results[i].category_id,
                        category_image: fileURL + results[i].category_image,
                        category_name: results[i].category_name,
                        created_by: results[i].created_by
                    }
                    dataArray.push(data[results[i].category_id]);
                }

            }

            res.json({
                status: "Success",
                message: "Successfully Fetch active category details",
                fileURL: fileURL,
                data: dataArray
            });
        }
    });
}

exports.update_category_status_data_by_id = (req, res, next) => {
    if (!req.params.id) {
        res.json({ status: "failure", message: "Failed to update" });
    } else {
        var sql_query = "UPDATE `category` SET ? WHERE category_id= ?";
        connection.query(sql_query, [req.body, req.params.id], function (err, results, fields) {
            if (err) {
                res.json({ status: "Failure", message: "Unable to Update Category Status details" });

            } else {
                res.json({
                    status: "Success",
                    message: "Successfully Updated Category Status details",
                    data: results
                });
            }
        });
    }

}