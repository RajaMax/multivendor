const { connection } = require('../db/db.js');



exports.fetch_all_sub_category2_data = (req, res, next) => {
    let sql_query = "SELECT * FROM  sub_category2";
    connection.query(sql_query, function (err, results, fields) {
        if (err) {
            res.json({ status: "Failure", message: "Unable to Fetch subcategory2 details" });
        } else {
            console.log(results);
            res.json({
                status: "Success",
                message: "Successfully Fetch subcategory2 details",
                data: results
            });
        }
    });
}

// Save Data
exports.fetch_save_sub_category2_data = (req, res, next) => {


    dt = req.body;
    console.log("aaaaaaaaaaaaaaaaaa",req.body)
    var value = [
        dt.category_id,
        dt.sub_category_id,
        dt.sub_category2_name];
        console.log("sub_category2",value)

    let sql_query = `SELECT * FROM sub_category2 WHERE (category_id=? AND sub_category_id=? AND sub_category2_name =?)`;

    connection.query(sql_query,value, function (err, results, fields) {
        if (err) {
            console.log(err);
            res.json({ status: "Failure", message: "Unable to Fetch subcategory2 details" });
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
                        dt.sub_category2_name,
                        dt.created_by,
                        0]];
                let sql_query = "INSERT INTO sub_category2 (`category_id`,`sub_category_id`,`sub_category2_name`,`created_by`, `status`) VALUES ?";
                connection.query(sql_query, [values], function (err, results, fields) {
                    if (err) {
                        res.json({ status: "Failure", message: "Unable to Save subcategory2 details" });
                    } else {
                        console.log(results);
                        res.json({
                            statuscode:200,
                            status: "Success",
                            message: "Successfully Fetched subcategory2 details",
                        });
                    }
                });
            }


        }
    });


}
//Fetch Data By id
exports.fetch_sub_category2_data_by_id = (req, res, next) => {

    let sql_query = "SELECT * FROM sub_category2 WHERE sub_category2_id =" + req.params.id;

    connection.query(sql_query, function (err, results, fields) {
        if (err) {
            res.json({ status: "Failure", message: "Unable to Fetch subcategory2 details" });
        } else {
            res.json({
                status: "Success",
                message: "Successfully Fetched subcategory2 details",
                data: results
            });
        }
    });

}
//Update unit by Id
exports.update_sub_category2_data_by_id = (req, res, next) => {
    dt = req.body;
    console.log("aaaaaaaaaaaaaaaaaa",req.body)
    var value = [
        dt.category_id,
        dt.sub_category_id,
        dt.sub_category2_name];
        console.log("sub_category2",value)

    let sql_query = `SELECT * FROM sub_category2 WHERE (category_id=? AND sub_category_id=? AND sub_category2_name =?)`;

    connection.query(sql_query,value, function (err, results, fields) {
        if (err) {
            console.log(err);
            res.json({ status: "Failure", message: "Unable to Fetch subcategory2 details" });
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
        sub_category_id:dt.sub_category_id,
        sub_category2_name:dt.sub_category2_name,
        created_by:dt.created_by,
        status:0
    }
    var sql_query = "UPDATE `sub_category2` SET ? WHERE sub_category2_id= ?";
    connection.query(sql_query, [data, dt.sub_category2_id], function (err, results, fields) {
        console.log(err);
        if (err) {
            res.json({ status: "Failure", message: "Unable to Update subcategory2 details" });
        } else {
            res.json({
                statuscode:200,
                status: "Success",
                message: "Successfully Updated subcategory2 details",
            });
        }
    });
}
}
});
}
//Delete Data By id
exports.delete_sub_category2_data_by_id = (req, res, next) => {

    let sql_query = "DELETE FROM `sub_category2` WHERE sub_category2_id= ?";

    connection.query(sql_query, [req.params.id], function (err, results, fields) {
        if (err) {
            console.log(err);
            res.json({ status: "Failure", message: "Unable to Delete subcategory2 details" });
        } else {
            res.json({
                status: "Success",
                message: "Successfully Deleted subcategory2 details"
            });
        }
    });

}

//Fetch sub Category Data by category Id
exports.fetch_all_sub_category2_data_by_subcategory_id = (req, res, next) => {
    console.log("req.body",req.body)

    let sql_query = "SELECT * FROM sub_category2 WHERE category_id= ? AND sub_category_id = ? AND status = 1";

    connection.query(sql_query, [req.body.category_id,req.body.sub_category_id], function (err, results, fields) {
        if (err) {
            res.json({ status: "Failure", message: "Unable to Fetch sub category2 details by category id" });

        } else {
            res.json({
                status: "Success",
                message: "Successfully Fetch sub category2 details by category id",
                data: results
            });
        }
    });

}


exports.fetch_all_producttype_data_by_subcategory2_id = (req, res, next) => {
    console.log("req.body",req.body)

    let sql_query = "SELECT * FROM product_type WHERE category_id= ? AND subcategory_id = ? AND sub_category2_id = ? AND status = 1";

    connection.query(sql_query, [req.body.category_id,req.body.sub_category_id,req.body.sub_category2_id], function (err, results, fields) {
        if (err) {
            res.json({ status: "Failure", message: "Unable to Fetch Product name details by category id" });

        } else {
            res.json({
                status: "Success",
                message: "Successfully Fetch Product name details by category id",
                data: results
            });
        }
    });

}


exports.fetch_all_brand_data_by_product_type_id = (req, res, next) => {
    console.log("req.body",req.body)

    let sql_query = "SELECT * FROM brand_master WHERE (category_id= ? AND sub_category_id = ? AND sub_category2_id = ? AND product_type_id = ?  AND status = 1)";

    connection.query(sql_query, [req.body.category_id,req.body.sub_category_id,req.body.sub_category2_id,req.body.product_type_id], function (err, results, fields) {
        if (err) {
            res.json({ status: "Failure", message: "Unable to Fetch Brand details by product type id" });

        } else {
            res.json({
                status: "Success",
                message: "Successfully Fetch Brand details by product type id",
                data: results
            });
        }
    });

}



exports.fetch_all_modeltype_data_by_brand_id = (req, res, next) => {
    console.log("req.body",req.body)

    let sql_query = "SELECT * FROM model_type WHERE (category_id= ? AND sub_category_id = ? AND sub_category2_id = ? AND product_type_id = ? AND brand_id= ? AND status = 1)";

    connection.query(sql_query, [req.body.category_id,req.body.sub_category_id,req.body.sub_category2_id,req.body.product_type_id,req.body.brand_id], function (err, results, fields) {
        if (err) {
            res.json({ status: "Failure", message: "Unable to Fetch modeltype details by brand id" });

        } else {
            res.json({
                status: "Success",
                message: "Successfully Fetch modeltype details by brand id",
                data: results
            });
        }
    });

}
    
exports.fetch_all_active_sub_category2_data = (req, res, next) => {
    let sql_query = "SELECT * FROM  sub_category2 WHERE status= 1";
    connection.query(sql_query, function (err, results, fields) {
        if (err) {
            res.json({ status: "Failure", message: "Unable to Fetch active subcategory2 details" });
        } else {
            console.log(results);
            res.json({
                status: "Success",
                message: "Successfully Fetch active subcategory2 details",
                data: results
            });
        }
    });
  }   


  
exports.update_subcategory2_status_data_by_id = (req, res, next) => {
    if (!req.params.id) {
        res.json({ status: "failure", message: "Failed to update" });
    } else {
        var sql_query = "UPDATE `sub_category2` SET ? WHERE sub_category2_id= ?";
        connection.query(sql_query, [req.body, req.params.id], function (err, results, fields) {
            if (err) {
                res.json({ status: "Failure", message: "Unable to Update subcategory2 Status details" });

            } else {
                res.json({
                    status: "Success",
                    message: "Successfully Updated subcategory2 Status details",
                    data: results
                });
            }
        });
    }

}