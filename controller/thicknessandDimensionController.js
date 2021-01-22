const { connection } = require('../db/db.js');



exports.fetch_all_thickeness_and_dimension_data = (req, res, next) => {
    let sql_query = "SELECT * FROM  thickness_and_dimension";
    connection.query(sql_query, function (err, results, fields) {
        if (err) {
            res.json({ status: "Failure", message: "Unable to Fetch thickness and diemension details" });
        } else {
            console.log(results);
            res.json({
                status: "Success",
                message: "Successfully Fetch thickness and diemension details",
                data: results
            });
        }
    });
}

// Save unit Data
exports.fetch_save_thickeness_and_dimension_data = (req, res, next) => {

console.log("req.body",req.body)
    dt = req.body;
    console.log("aaaaaaaaaaaaaaaaaa",req.body)
    var value = [
        dt.category_id,
        dt.sub_category_id,
        dt.sub_category2_id,
        dt.product_type_name,
        dt.brand_id,
        dt.model_type_id,
        dt.thickness_and_dimension_name
    ];
        console.log("color",value)

    let sql_query = `SELECT * FROM thickness_and_dimension WHERE (category_id=? AND sub_category_id=? AND sub_category2_id =? AND product_type_id=? AND brand_id=? AND model_type_id=? AND thickness_and_dimension_name=? )`;

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
                        dt.model_type_id,
                        dt.thickness_and_dimension_name,
                        dt.created_by,
                        0]];
                let sql_query = "INSERT INTO thickness_and_dimension (`category_id`,`sub_category_id`,`sub_category2_id`,`product_type_id`,`brand_id`,`model_type_id`,`thickness_and_dimension_name`,`created_by`, `status`) VALUES ?";
                connection.query(sql_query, [values], function (err, results, fields) {
                    if (err) {
                        res.json({ status: "Failure", message: "Unable to Save thickness and diemension details" });
                    } else {
                        console.log(results);
                        res.json({
                            statuscode:200,
                            status: "Success",
                            message: "Successfully Added thickness and diemension details",
                        });
                    }
                });
            }


        }
    });


}
//Fetch Data By id
exports.fetch_thickeness_and_dimension_data_by_id = (req, res, next) => {

    let sql_query = "SELECT * FROM thickness_and_dimension WHERE thickness_and_dimension_id =" + req.params.id;

    connection.query(sql_query, function (err, results, fields) {
        if (err) {
            res.json({ status: "Failure", message: "Unable to Fetch thickness and diemension details" });
        } else {
            res.json({
                status: "Success",
                message: "Successfully Fetched thickness and diemension details",
                data: results
            });
        }
    });

}
//Update unit by Id
exports.update_thickeness_and_dimension_data_by_id = (req, res, next) => {
    dt = req.body;
    console.log("aaaaaaaaaaaaaaaaaa",req.body)
    var value = [
        dt.category_id,
        dt.sub_category_id,
        dt.sub_category2_id,
        dt.product_type_name,
        dt.brand_id,
        dt.model_type_id,
        dt.thickness_and_dimension_name
    ];
        console.log("color",value)

    let sql_query = `SELECT * FROM thickness_and_dimension WHERE (category_id=? AND sub_category_id=? AND sub_category2_id =? AND product_type_id=? AND brand_id=? AND model_type_id=? AND thickness_and_dimension_name=? )`;

    connection.query(sql_query,value, function (err, results, fields) {
        if (err) {
            console.log(err);
            res.json({ status: "Failure", message: "Unable to Fetch thickness and dimension details" });
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
        brand_id: dt.brand_id,
        model_type_id: dt.model_type_id,
        thickness_and_dimension_name:dt.thickness_and_dimension_name,
        created_by:dt.created_by,
        status:0
    }
    var sql_query = "UPDATE `thickness_and_dimension` SET ? WHERE thickness_and_dimension_id= ?";
    connection.query(sql_query, [data, dt.thickness_and_dimension_id], function (err, results, fields) {
        console.log(err);
        if (err) {
            res.json({ status: "Failure", message: "Unable to Update thickness and diemension details" });
        } else {
            res.json({
                statuscode:200,
                status: "Success",
                message: "Successfully Updated thickness and diemension details",
            });
        }
    });
}
        }
    });
}
//Delete Data By id
exports.delete_thickeness_and_dimension_data_by_id = (req, res, next) => {

    let sql_query = "DELETE FROM `thickness_and_dimension` WHERE thickness_and_dimension_id= ?";

    connection.query(sql_query, [req.params.id], function (err, results, fields) {
        if (err) {
            console.log(err);
            res.json({ status: "Failure", message: "Unable to Delete thickness and diemension details" });
        } else {
            res.json({
                status: "Success",
                message: "Successfully Deleted thickness and diemension details"
            });
        }
    });

}

exports.update_thickeness_and_dimension_status_data_by_id = (req, res, next) => {
    if (!req.params.id) {
        res.json({ status: "failure", message: "Failed to update" });
    } else {
        var sql_query = "UPDATE `thickness_and_dimension` SET ? WHERE thickness_and_dimension_id= ?";
        connection.query(sql_query, [req.body, req.params.id], function (err, results, fields) {
            if (err) {
                res.json({ status: "Failure", message: "Unable to Update thickness and diemension Status details" });

            } else {
                res.json({
                    status: "Success",
                    message: "Successfully Updated thickness and diemension Status details",
                    data: results
                });
            }
        });
    }

}