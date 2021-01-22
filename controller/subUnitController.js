const { connection } = require('../db/db.js');



exports.fetch_all_sub_unit_data = (req, res, next) => {
    let sql_query = "SELECT * FROM  sub_unit_master order by sub_unit_id";
    connection.query(sql_query, function (err, results, fields) {
        if (err) {
            res.json({ status: "Failure", message: "Unable to Fetch Sub unit details" });
        } else {
            console.log(results);
            res.json({
                status: "Success",
                message: "Successfully Fetch Sub unit details",
                data: results
            });
        }
    });
}

// Save unit Data
exports.fetch_save_sub_unit_data = (req, res, next) => {

    const dt=req.body
    console.log("results",dt);

    let unit_id = JSON.parse(dt.unit_name)
    console.log("results",unit_id);



    let sql_query = `SELECT * FROM sub_unit_master WHERE unit_id=${unit_id} and sub_unit_name ='${dt.sub_unit_name}'`;

    connection.query(sql_query, function (err, results, fields) {
        if (err) {
            console.log(err);
            res.json({ status: "Failure", message: "Unable to Fetch sub unit details" });
        } else {
            if (results && results.length > 0) {
                res.json({
                    status: "Failure",
                    message: "This Data Already Exist",
                });
            } else {
                var values = [
                    [unit_id, dt.sub_unit_name, 0],
                ];
                let sql_query = "INSERT INTO sub_unit_master (unit_id,sub_unit_name, status) VALUES ?";
                connection.query(sql_query, [values], function (err, results, fields) {
                    if (err) {
                        console.log(err);
                        res.json({ status: "Failure", message: "Unable to Save sub unit details" });
                    } else {
                        console.log(results);
                        res.json({
                            status: "Success",
                            message: "Successfully saved sub unit details",
                        });
                    }
                });
            }


        }
    });

}
//Fetch Data By id
exports.fetch_sub_unit_data_by_id = (req, res, next) => {

    let sql_query = "SELECT * FROM sub_unit_master WHERE sub_unit_id =" + req.params.id;

    connection.query(sql_query, function (err, results, fields) {
        if (err) {
            res.json({ status: "Failure", message: "Unable to Fetch sub unit details" });
        } else {
            res.json({
                status: "Success",
                message: "Successfully Fetched sub unit details",
                data: results
            });
        }
    });

}
//Update unit by Id
exports.update_sub_unit_data_by_id = (req, res, next) => {
    dt = req.body;
    var data = {
        unit_id: dt.unit_id,
        sub_unit_name: dt.sub_unit_name,
    }
    var sql_query = "UPDATE `sub_unit_master` SET ? WHERE sub_unit_id= ?";
    connection.query(sql_query, [data, dt.sub_unit_id], function (err, results, fields) {
        console.log(err);
        if (err) {
            res.json({ status: "Failure", message: "Unable to Update sub unit details" });
        } else {
            res.json({
                status: "Success",
                message: "Successfully Updated sub unit details",
            });
        }
    });
}
//Delete Data By id
exports.delete_sub_unit_data_by_id = (req, res, next) => {

    let sql_query = "DELETE FROM `sub_unit_master` WHERE sub_unit_id= ?";

    connection.query(sql_query, [req.params.id], function (err, results, fields) {
        if (err) {
            res.json({ status: "Failure", message: "Unable to Delete sub unit details" });

        } else {
            res.json({
                status: "Success",
                message: "Successfully Deleted sub unit details"
            });
        }
    });

}

//Fetch sub Unit Data by unit Id
exports.fetch_all_sub_unit_data_by_unit_id = (req, res, next) => {

    let sql_query = "SELECT sub_unit_id ,unit_id  ,sub_unit_name,status FROM sub_unit_master WHERE status=1 and unit_id= ?";

    connection.query(sql_query, [req.params.id], function (err, results, fields) {
        if (err) {
            res.json({ status: "Failure", message: "Unable to Fetch sub Unit details by unit id" });

        } else {
            res.json({
                status: "Success",
                message: "Successfully Fetch sub unit details by unit id",
                data: results
            });
        }
    });

}

exports.update_sub_unit_status_data_by_id = (req, res, next) => {
    if (!req.params.id) {
        res.json({ status: "failure", message: "Failed to update" });
    } else {
        var sql_query = "UPDATE `sub_unit_master` SET ? WHERE sub_unit_id= ?";
        connection.query(sql_query, [req.body, req.params.id], function (err, results, fields) {
            if (err) {
                res.json({ status: "Failure", message: "Unable to Update sub unit Status details" });

            } else {
                res.json({
                    status: "Success",
                    message: "Successfully Updated sub unit Status details",
                    data: results
                });
            }
        });
    }

}