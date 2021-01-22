const { connection } = require('../db/db.js');
const fileURL = 'http://localhost:9000/banner/';



exports.fetch_all_banner_data = (req, res, next) => {
    let sql_query = "SELECT * FROM  banners order by banner_id";
    connection.query(sql_query, function (err, results, fields) {
        if (err) {
            res.json({ status: "Failure", message: "Unable to fetch banner details" });
        } else {
            console.log(results);
            res.json({
                status: "Success",
                message: "Successfully fetch banner details",
                data: results
            });
        }
    });
}

// Save Category Data
exports.fetch_save_banner_data = (req, res, next) => {

    console.log(req.file.filename);
    console.log(req.body);

    dt = req.body;



    let sql_query = `SELECT * FROM banners WHERE banner_name='${dt.banner_name}'`;

    connection.query(sql_query, function (err, results, fields) {
        if (err) {
            console.log(err);
            res.json({ status: "Failure", message: "Unable to Fetch banner details" });
        } else {
            if (results && results.length > 0) {
                res.json({
                    status: "Failure",
                    message: "This Data Already Exist",
                });
            } else {
                let banner_data = [[
                    req.body.banner_name,
                    req.file.filename,
                    '0'
                ]];
                let sql_query = "INSERT INTO banners (banner_name,banner_image, status) VALUES ?";
                connection.query(sql_query, [banner_data], function (err, results, fields) {
                    if (err) {
                        console.log(err);
                        res.json({ status: "Failure", message: "Unable to Save banner details" });
                    } else {
                        console.log(results);
                        res.json({
                            status: "Success",
                            message: "Successfully saved banner details",
                        });
                    }
                });
            }


        }
    });

}
//Fetch Data By id
exports.fetch_banner_data_by_id = (req, res, next) => {

    let sql_query = "SELECT * FROM banners WHERE banner_id =" + req.params.id;

    connection.query(sql_query, function (err, results, fields) {
        if (err) {
            res.json({ status: "Failure", message: "Unable to fetch banner details" });
        } else {
            res.json({
                status: "Success",
                message: "Successfully fetched banner details",
                fileURL: fileURL,
                data: results
            });
        }
    });

}
//Update Category by Id
exports.update_banner_data_by_id = (req, res, next) => {
    dt = req.body;
    var data = {
        banner_name: dt.banner_name,
        banner_image: dt.banner_image,
    }
    var sql_query = "UPDATE `banners` SET ? WHERE banner_id= ?";
    connection.query(sql_query, [data, dt.banner_id], function (err, results, fields) {
        console.log(err);
        if (err) {
            res.json({ status: "Failure", message: "Unable to Update banner details" });
        } else {
            res.json({
                status: "Success",
                message: "Successfully Updated banner details",
            });
        }
    });
}
//Delete Data By id
exports.delete_banner_data_by_id = (req, res, next) => {

    let sql_query = "DELETE FROM `banners` WHERE banner_id= ?";

    connection.query(sql_query, [req.params.id], function (err, results, fields) {
        if (err) {
            res.json({ status: "Failure", message: "Unable to Delete banner details" });

        } else {
            res.json({
                status: "Success",
                message: "Successfully Deleted banner details"
            });
        }
    });

}