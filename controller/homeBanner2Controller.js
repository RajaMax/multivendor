const { connection } = require('../db/db.js');
const fileURL = 'http://dev.dxminds.online:6500/home-banner2/';



exports.fetch_all_home_banner2_data = (req, res, next) => {
    let sql_query = "SELECT * FROM  home_banner2 order by home_banner2_id";
    connection.query(sql_query, function (err, results, fields) {
        if (err) {
            res.json({ status: "Failure", message: "Unable to fetch home banner2 details" });
        } else {
            console.log(results);
            res.json({
                status: "Success",
                message: "Successfully fetch home banner2 details",
                data: results
            });
        }
    });
}

// Save save home banner2 Data
exports.fetch_save_home_banner2_data = (req, res, next) => {
    const dt=JSON.parse(req.body.data)
    console.log("aaa",dt);

    console.log(req.file.filename);
    console.log(req.body);
    


    let sql_query = `SELECT * FROM home_banner2 WHERE home_banner2_name='${dt.home_banner2_name}'`;

    connection.query(sql_query, function (err, results, fields) {
        if (err) {
            console.log(err);
            res.json({ status: "Failure", message: "Unable to Fetch home banner2 details" });
        } else {
            if (results && results.length > 0) {
                res.json({
                    status: "Failure",
                    message: "This Data Already Exist",
                });
            } else {
                let banner_data = [[
                    dt.home_banner2_name,
                    req.file.filename,
                    dt.sort_order,
                    '0',
                    dt.created_by
                ]];
                let sql_query = "INSERT INTO home_banner2 (home_banner2_name,home_banner2_image, sort_order,status,created_by) VALUES ?";
                connection.query(sql_query, [banner_data], function (err, results, fields) {
                    if (err) {
                        console.log(err);
                        res.json({ status: "Failure", message: "Unable to Save home banner2 details" });
                    } else {
                        console.log(results);
                        res.json({
                            status: "Success",
                            message: "Successfully saved home banner2 details",
                        });
                    }
                });
            }


        }
    });

}
//Fetch home banner2 Data By id
exports.fetch_home_banner2_data_by_id = (req, res, next) => {

    let sql_query = "SELECT * FROM home_banner2 WHERE home_banner2_id =" + req.params.id;

    connection.query(sql_query, function (err, results, fields) {
        if (err) {
            res.json({ status: "Failure", message: "Unable to fetch home banner2 details" });
        } else {
            res.json({
                status: "Success",
                message: "Successfully fetched home banner2 details",
                fileURL: fileURL,
                data: results
            });
        }
    });

}
//Update home bannner1 by Id
exports.update_home_banner2_data_by_id = (req, res, next) => {
    const dt=JSON.parse(req.body.data)
    console.log("dsfsfdsf",dt);
  
    var data = {
        home_banner2_name: dt.home_banner2_name,
        home_banner2_image: dt.files,
        sort_order: dt.sort_order,
        status:'0',
        created_by:dt.created_by
    }
    var sql_query = "UPDATE `home_banner2` SET ? WHERE home_banner2_id= ?";
    connection.query(sql_query, [data, dt.id], function (err, results, fields) {
        console.log(err);
        if (err) {
            res.json({ status: "Failure", message: "Unable to Update home banner2 details" });
        } else {
            res.json({
                status: "Success",
                message: "Successfully Updated home banner2 details",
            });
        }
    });
}
//Delete Data By id
exports.delete_home_banner2_data_by_id = (req, res, next) => {

    let sql_query = "DELETE FROM `home_banner2` WHERE home_banner2_id= ?";

    connection.query(sql_query, [req.params.id], function (err, results, fields) {
        if (err) {
            res.json({ status: "Failure", message: "Unable to Delete home banner2 details" });

        } else {
            res.json({
                status: "Success",
                message: "Successfully Deleted home banner2 details"
            });
        }
    });

}

//update-home-banner2-status-data

exports.update_home_banner2_status_data_by_id = (req, res, next) => {
    if (!req.params.id) {
        res.json({ status: "failure", message: "Failed to update" });
    } else {
        var sql_query = "UPDATE `home_banner2` SET ? WHERE home_banner2_id= ?";
        connection.query(sql_query, [req.body, req.params.id], function (err, results, fields) {
            if (err) {
                res.json({ status: "Failure", message: "Unable to Update home banner2 Status details" });

            } else {
                res.json({
                    status: "Success",
                    message: "Successfully Updated home banner2 Status details",
                    data: results
                });
            }
        });
    }

}

//fetch_all_active_home_banner2_data
exports.fetch_all_active_home_banner2_data = (req, res, next) => {
    let sql_query = "SELECT * FROM  home_banner2 where status=1 order by home_banner2_id";
    connection.query(sql_query, function (err, results, fields) {
        if (err) {
            res.json({ status: "Failure", message: "Unable to fetch active home banner2 details" });
        } else {
            console.log(results);
            res.json({
                status: "Success",
                message: "Successfully fetch active home banner2 details",
                data: results
            });
        }
    });
}

exports.update_home_banner2_status_data_by_id = (req, res, next) => {
    if (!req.params.id) {
        res.json({ status: "failure", message: "Failed to update" });
    } else {
        var sql_query = "UPDATE `home_banner2` SET ? WHERE home_banner2_id= ?";
        connection.query(sql_query, [req.body, req.params.id], function (err, results, fields) {
            if (err) {
                res.json({ status: "Failure", message: "Unable to Update home banner2 Status details" });

            } else {
                res.json({
                    status: "Success",
                    message: "Successfully Updated home banner2 Status details",
                    data: results
                });
            }
        });
    }

}