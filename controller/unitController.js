const { connection } = require('../db/db.js');



exports.fetch_all_unit_data = (req, res, next) => {
    let sql_query = "SELECT * FROM  unit_master";
    connection.query(sql_query, function (err, results, fields) {
        if (err) {
            res.json({ status: "Failure", message: "Unable to Fetch unit details" });
        } else {
            console.log(results);
            res.json({
                status: "Success",
                message: "Successfully Fetch unit details",
                data: results
            });
        }
    });
}

// Save unit Data
exports.fetch_save_unit_data = (req, res, next) => {


    dt = req.body;

    let sql_query = `SELECT * FROM unit_master WHERE unit_name ='${dt.unit_name}'`;

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
                var values = [
                    [dt.unit_name, 0],
                ];
                let sql_query = "INSERT INTO unit_master (unit_name, status) VALUES ?";
                connection.query(sql_query, [values], function (err, results, fields) {
                    if (err) {
                        res.json({ status: "Failure", message: "Unable to Save unit details" });
                    } else {
                        console.log(results);
                        res.json({
                            status: "Success",
                            message: "Successfully Fetched unit details",
                        });
                    }
                });
            }


        }
    });


}
//Fetch Data By id
exports.fetch_unit_data_by_id = (req, res, next) => {

    let sql_query = "SELECT * FROM unit_master WHERE unit_id =" + req.params.id;

    connection.query(sql_query, function (err, results, fields) {
        if (err) {
            res.json({ status: "Failure", message: "Unable to Fetch unit details" });
        } else {
            res.json({
                status: "Success",
                message: "Successfully Fetched unit details",
                data: results
            });
        }
    });

}
//Update unit by Id
exports.update_unit_data_by_id = (req, res, next) => {
    dt = req.body;
    var data = {
        unit_name: dt.unit_name,
    }
    var sql_query = "UPDATE `unit_master` SET ? WHERE unit_id= ?";
    connection.query(sql_query, [data, dt.unit_id], function (err, results, fields) {
        console.log(err);
        if (err) {
            res.json({ status: "Failure", message: "Unable to Update unit details" });
        } else {
            res.json({
                status: "Success",
                message: "Successfully Updated unit details",
            });
        }
    });
}
//Delete Data By id
exports.delete_unit_data_by_id = (req, res, next) => {

    let sql_query = "DELETE FROM `unit_master` WHERE unit_id= ?";

    connection.query(sql_query, [req.params.id], function (err, results, fields) {
        if (err) {
            console.log(err);
            res.json({ status: "Failure", message: "Unable to Delete unit details" });
        } else {
            res.json({
                status: "Success",
                message: "Successfully Deleted unit details"
            });
        }
    });

}

//fetch_all_active_unit_data
exports.fetch_all_active_unit_data = (req, res, next) => {
    let sql_query = "SELECT unit_id,unit_name FROM  unit_master where status=1";
    connection.query(sql_query, function (err, results, fields) {
        if (err) {
            res.json({ status: "Failure", message: "Unable to Fetch active unit details" });
        } else {
            console.log(results);
            res.json({
                status: "Success",
                message: "Successfully Fetch active unit details",
                data: results
            });
        }
    });
}

exports.update_unit_status_data_by_id = (req, res, next) => {
    if (!req.params.id) {
        res.json({ status: "failure", message: "Failed to update" });
    } else {
        var sql_query = "UPDATE `unit_master` SET ? WHERE unit_id= ?";
        connection.query(sql_query, [req.body, req.params.id], function (err, results, fields) {
            if (err) {
                res.json({ status: "Failure", message: "Unable to Update unit Status details" });

            } else {
                res.json({
                    status: "Success",
                    message: "Successfully Updated unit Status details",
                    data: results
                });
            }
        });
    }

}