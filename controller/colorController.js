const { connection } = require('../db/db.js');



exports.fetch_all_color_data = (req, res, next) => {
    let sql_query = "SELECT * FROM  color";
    connection.query(sql_query, function (err, results, fields) {
        if (err) {
            res.json({ status: "Failure", message: "Unable to Fetch color details" });
        } else {
            console.log(results);
            res.json({
                status: "Success",
                message: "Successfully Fetch color details",
                data: results
            });
        }
    });
}

// Save unit Data
exports.fetch_save_color_data = (req, res, next) => {
    dt = req.body;

    console.log("aaaaaaaaaaaaaaaaaa",req.body)
    var value = [
        dt.category_id,
        dt.sub_category_id,
        dt.sub_category2_id,
        dt.product_type_name,
        dt.brand_id,
        dt.color_name
    ];
        console.log("color",value)

    let sql_query = `SELECT * FROM color WHERE (category_id=? AND sub_category_id=? AND sub_category2_id =? AND product_type_id=? AND brand_id=? AND color_name=? )`;

    connection.query(sql_query,value, function (err, results, fields) {
        if (err) {
            console.log(err);
            res.json({ status: "Failure", message: "Unable to Fetch color details" });
        } else {
            if (results && results.length > 0) {
                console.log("qqqqq",results)

                res.json({
                    statuscode:401,
                    status: "Failure",
                    message: "This Data Already Exist",
                });
            } else {
                console.log("vvvv")

  
                var values = [[
                        dt.category_id,
                        dt.sub_category_id,
                        dt.sub_category2_id,
                        dt.product_type_name,
                        dt.brand_id,
                        dt.color_name,
                        dt.created_by,
                        0]];
                let sql_query = "INSERT INTO color (`category_id`,`sub_category_id`,`sub_category2_id`,`product_type_id`,`brand_id`,`color_name`,`created_by`, `status`) VALUES ?";
                connection.query(sql_query, [values], function (err, results, fields) {
                    if (err) {
                        res.json({ status: "Failure", message: "Unable to Save color details" });
                    } else {
                        console.log(results);
                        res.json({
                            statuscode:200,
                            status: "Success",
                            message: "Successfully added color details",
                        });
                    }
                });
            }


        }
    });


}
//Fetch Data By id
exports.fetch_color_data_by_id = (req, res, next) => {

    let sql_query = "SELECT * FROM color WHERE color_id =" + req.params.id;

    connection.query(sql_query, function (err, results, fields) {
        if (err) {
            res.json({ status: "Failure", message: "Unable to Fetch color details" });
        } else {
            res.json({
                status: "Success",
                message: "Successfully Fetched color details",
                data: results
            });
        }
    });

}
//Update 
exports.update_color_data_by_id = (req, res, next) => {
    dt = req.body;
    console.log("aaaaaaaaaaaaaaaaaa",req.body)
    var value = [
        dt.category_id,
        dt.sub_category_id,
        dt.sub_category2_id,
        dt.product_type_name,
        dt.brand_id,
        dt.color_name
    ];
        console.log("color",value)

    let sql_query = `SELECT * FROM color WHERE (category_id=? AND sub_category_id=? AND sub_category2_id =? AND product_type_id=? AND brand_id=? AND color_name=? )`;

    connection.query(sql_query,value, function (err, results, fields) {
        if (err) {
            console.log(err);
            res.json({ status: "Failure", message: "Unable to Fetch color details" });
        } else {
            if (results && results.length > 0) {
                console.log("qqqqq",results)

                res.json({
                    statuscode:401,
                    status: "Failure",
                    message: "This Data Already Exist",
                });
            } else {
                console.log("vvvv")


    var data = {

        category_id: dt.category_id,
        sub_category_id: dt.sub_category_id,
        sub_category2_id:dt.sub_category2_id,
        product_type_id:dt.product_type_name,
        color_name: dt.color_name,
        created_by:dt.created_by,
        status:0
    }
    var sql_query = "UPDATE `color` SET ? WHERE color_id= ?";
    connection.query(sql_query, [data, dt.color_id], function (err, results, fields) {
        console.log(err);
        if (err) {
            res.json({ status: "Failure", message: "Unable to Update color details" });
        } else {
            res.json({
                statuscode:200,
                status: "Success",
                message: "Successfully Updated color details",
            });
        }
    });
}
        }
    });
}
//Delete Data By id
exports.delete_color_data_by_id = (req, res, next) => {

    let sql_query = "DELETE FROM `color` WHERE color_id= ?";

    connection.query(sql_query, [req.params.id], function (err, results, fields) {
        if (err) {
            console.log(err);
            res.json({ status: "Failure", message: "Unable to Delete color details" });
        } else {
            res.json({
                status: "Success",
                message: "Successfully Deleted color details"
            });
        }
    });

}


exports.update_color_status_data_by_id = (req, res, next) => {
    if (!req.params.id) {
        res.json({ status: "failure", message: "Failed to update" });
    } else {
        var sql_query = "UPDATE `color` SET ? WHERE color_id= ?";
        connection.query(sql_query, [req.body, req.params.id], function (err, results, fields) {
            if (err) {
                res.json({ status: "Failure", message: "Unable to Update Color Status details" });

            } else {
                res.json({
                    status: "Success",
                    message: "Successfully Updated Color Status details",
                    data: results
                });
            }
        });
    }

}
