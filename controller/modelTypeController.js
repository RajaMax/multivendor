const { connection } = require('../db/db.js');



exports.fetch_all_modeltype_data = (req, res, next) => {
    let sql_query = "SELECT * FROM  model_type";
    connection.query(sql_query, function (err, results, fields) {
        if (err) {
            res.json({ status: "Failure", message: "Unable to Fetch modeltype details" });
        } else {
            console.log(results);
            res.json({
                status: "Success",
                message: "Successfully Fetch modeltype details",
                data: results
            });
        }
    });
}

// Save unit Data
exports.fetch_save_modeltype_data = (req, res, next) => {
    dt = req.body;
    console.log("aaaaaaaaaaaaaaaaaa",req.body)
    var value = [
        dt.category_id,
        dt.sub_category_id,
        dt.sub_category2_id,
        dt.product_type_name,
        dt.brand_id,
        dt.model_type_name
    ];
        console.log("model_type",value)

    let sql_query = `SELECT * FROM model_type WHERE (category_id=? AND sub_category_id=? AND sub_category2_id =? AND product_type_id=? AND brand_id=? AND model_type_name=? )`;

    connection.query(sql_query,value, function (err, results, fields) {
        if (err) {
            console.log(err);
            res.json({ status: "Failure", message: "Unable to Fetch modeltype details" });
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
                        dt.model_type_name,
                        dt.created_by,
                        1]];
                        console.log("vvvv",values)

                let sql_query = "INSERT INTO model_type (`category_id`,`sub_category_id`,`sub_category2_id`,`product_type_id`,`brand_id`,`model_type_name`,`created_by`, `status`) VALUES ?";
                connection.query(sql_query, [values], function (err, results, fields) {
                    if (err) {
                        console.log("sfsaaff");

                        res.json({ status: "Failure", message: "Unable to Save modeltype details" });
                    } else {
                        console.log("qqqqqqqq");

                        console.log(results);
                        res.json({
                            statuscode:200,
                            status: "Success",
                            message: "Successfully Added modeltype details",
                        });
                    }
                });
            }


        }
    });


}
//Fetch Data By id
exports.fetch_modeltype_data_by_id = (req, res, next) => {

    let sql_query = "SELECT * FROM model_type WHERE model_type_id =" + req.params.id;

    connection.query(sql_query, function (err, results, fields) {
        if (err) {
            res.json({ status: "Failure", message: "Unable to Fetch modeltype details" });
        } else {
            res.json({
                status: "Success",
                message: "Successfully Fetched modeltype details",
                data: results
            });
        }
    });

}
//Update unit by Id
exports.update_modeltype_data_by_id = (req, res, next) => {
    dt = req.body;
    console.log("aaaaaaaaaaaaaaaaaa",req.body)
    var value = [
        dt.category_id,
        dt.sub_category_id,
        dt.sub_category2_id,
        dt.product_type_name,
        dt.brand_id,
        dt.model_type_name
    ];
        console.log("model_type",value)

    let sql_query = `SELECT * FROM model_type WHERE (category_id=? AND sub_category_id=? AND sub_category2_id =? AND product_type_id=? AND brand_id=? AND model_type_name=? )`;

    connection.query(sql_query,value, function (err, results, fields) {
        if (err) {
            console.log(err);
            res.json({ status: "Failure", message: "Unable to Fetch modeltype details" });
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
        model_type_name: dt.model_type_name,
        created_by:dt.created_by,
        status:0
    }
    var sql_query = "UPDATE `model_type` SET ? WHERE model_type_id= ?";
    connection.query(sql_query, [data, dt.model_type_id], function (err, results, fields) {
        console.log(err);
        if (err) {
            res.json({ status: "Failure", message: "Unable to Update modeltype details" });
        } else {
            res.json({
                statuscode:200,
                status: "Success",
                message: "Successfully Updated modeltype details",
            });
        }
    });
}
        }
    });
}
//Delete Data By id
exports.delete_modeltype_data_by_id = (req, res, next) => {

    let sql_query = "DELETE FROM `model_type` WHERE model_type_id= ?";

    connection.query(sql_query, [req.params.id], function (err, results, fields) {
        if (err) {
            console.log(err);
            res.json({ status: "Failure", message: "Unable to Delete modeltype details" });
        } else {
            res.json({
                status: "Success",
                message: "Successfully Deleted modeltype details"
            });
        }
    });

}
exports.update_modeltype_status_data_by_id = (req, res, next) => {
    if (!req.params.id) {
        res.json({ status: "failure", message: "Failed to update" });
    } else {
        var sql_query = "UPDATE `model_type` SET ? WHERE model_type_id= ?";
        connection.query(sql_query, [req.body, req.params.id], function (err, results, fields) {
            if (err) {
                res.json({ status: "Failure", message: "Unable to Update modeltype Status details" });

            } else {
                res.json({
                    status: "Success",
                    message: "Successfully Updated modeltype Status details",
                    data: results
                });
            }
        });
    }

}