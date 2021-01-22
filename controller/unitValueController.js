const { connection } = require('../db/db.js');



exports.fetch_all_unit_value_data = (req, res, next) => {
    let sql_query = "SELECT * FROM  unit_value_master order by unit_value_id";
    connection.query(sql_query, function (err, results, fields) {
        if (err) {
            res.json({ status: "Failure", message: "Unable to fetch unit value details" });
        } else {
            console.log(results);
            res.json({
                status: "Success",
                message: "Successfully fetch unit value details",
                data: results
            });
        }
    });
}

// Save Category Data
exports.fetch_save_unit_value_data = (req, res, next) => {
    dt = req.body;

    console.log(req.body.unit_value_name);
    console.log(dt.unit_name);
    console.log(JSON.parse(dt.unit_name));

    let unit_id = JSON.parse(dt.unit_name)
    let sub_unit_id = JSON.parse(dt.sub_unit_name)

    console.log(unit_id);
    console.log(sub_unit_id);



    let sql_query = `SELECT * FROM unit_value_master WHERE unit_value_name='${dt.unit_value_name}'`;

    connection.query(sql_query, function (err, results, fields) {
        if (err) {
            console.log(err);
            res.json({ status: "Failure", message: "Unable to Fetch unit value details" });
        } else {
            if (results && results.length > 0) {
                res.json({
                    status: "Failure",
                    message: "This Data Already Exist",
                });
            } else {
                let unit_value_data = [[
                    unit_id,
                    sub_unit_id,
                    req.body.unit_value_name,
                    '0'
                ]];
                let sql_query = "INSERT INTO unit_value_master (unit_id,sub_unit_id,unit_value_name,status) VALUES ?";
                connection.query(sql_query, [unit_value_data], function (err, results, fields) {
                    if (err) {
                        console.log(err);
                        res.json({ status: "Failure", message: "Unable to Save unit_value details" });
                    } else {
                        console.log(results);
                        res.json({
                            status: "Success",
                            message: "Successfully saved unit value details",
                        });
                    }
                });
            }


        }
    });

}
//Fetch Data By id
exports.fetch_unit_value_data_by_id = (req, res, next) => {

    let sql_query = "SELECT * FROM unit_value_master WHERE unit_value_id =" + req.params.id;

    connection.query(sql_query, function (err, results, fields) {
        if (err) {
            res.json({ status: "Failure", message: "Unable to fetch unit value details" });
        } else {
            res.json({
                status: "Success",
                message: "Successfully fetched unit value details",
                data: results
            });
        }
    });

}
//Update Category by Id
exports.update_unit_value_data_by_id = (req, res, next) => {

    dt = req.body;
    console.log("dasssssss",dt);

    let unit_id = JSON.parse(dt.unit_name)
    let sub_unit_id = JSON.parse(dt.sub_unit_name)
    let unit_value_name = JSON.parse(dt.unit_value_name)
    let unit_value_id = JSON.parse(dt.id)

    var data = {
      
        unit_id:unit_id,
        sub_unit_id:sub_unit_id,
        unit_value_name:unit_value_name
    }

    var sql_query = "UPDATE `unit_value_master` SET ? WHERE unit_value_id= ?";
    connection.query(sql_query, [data,unit_value_id], function (err, results, fields) {
        console.log(err);
        if (err) {
            res.json({ status: "Failure", message: "Unable to Update unit value details" });
        } else {
            res.json({
                status: "Success",
                message: "Successfully Updated unit value details",
            });
        }
    });
}
//Delete Data By id
exports.delete_unit_value_data_by_id = (req, res, next) => {

    let sql_query = "DELETE FROM `unit_value_master` WHERE unit_value_id= ?";

    connection.query(sql_query, [req.params.id], function (err, results, fields) {
        if (err) {
            res.json({ status: "Failure", message: "Unable to Delete unit value details" });

        } else {
            res.json({
                status: "Success",
                message: "Successfully Deleted unit value details"
            });
        }
    });

}

//Fetch Unit-Value Data by sub unit Id
exports.fetch_all_unit_value_data_by_sub_unit_id = (req, res, next) => {

    let sql_query = "SELECT unit_value_id ,unit_id,sub_unit_id,unit_value_name,status FROM unit_value_master WHERE status=1 and sub_unit_id= ?";

    connection.query(sql_query, [req.params.id], function (err, results, fields) {
        if (err) {
            res.json({ status: "Failure", message: "Unable to Fetch Unit Value details by sub unit id" });

        } else {
            res.json({
                status: "Success",
                message: "Successfully Fetch Unit Value details by sub unit id",
                data: results
            });
        }
    });

}

exports.update_unit_value_status_data_by_id = (req, res, next) => {
    if (!req.params.id) {
        res.json({ status: "failure", message: "Failed to update" });
    } else {
        var sql_query = "UPDATE `unit_value_master` SET ? WHERE unit_value_id= ?";
        connection.query(sql_query, [req.body, req.params.id], function (err, results, fields) {
            if (err) {
                res.json({ status: "Failure", message: "Unable to Update unit value Status details" });

            } else {
                res.json({
                    status: "Success",
                    message: "Successfully Updated unit value Status details",
                    data: results
                });
            }
        });
    }

}