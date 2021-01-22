const { connection } = require('../db/db.js');
const fileURL = 'http://dev.dxminds.online:6500/manufacturerImages/';
const path = require('path');




exports.get_manufacturer = (req, res, next) => {
    let sql_query = "SELECT * FROM  manufacturer order by manufacturer_id";
    connection.query(sql_query, function (err, results, fields) {
        if (err) {
            res.json({ status: "Failure", message: "Unable to fetch Manufacturer details" });
        } else {
            console.log(results);
            res.json({
                status: "Success",
                message: "Successfully fetch Manufacturer details",
                data: results
            });
        }
    });
}

// Save Category Data
exports.add_manufacturer = (req, res, next) => {

    console.log(req.file.filename);
    console.log(req.body);
    let dt = JSON.parse(req.body.data);
    // dt = req.body.data;
    // console.log(datata);
    // console.log(dt.manufacturer_description);




    let sql_query = `SELECT * FROM manufacturer WHERE manufacturer_name='${dt.manufacturer_name}'`;

    connection.query(sql_query, function (err, results, fields) {
        if (err) {
            console.log(err);
            res.json({ status: "Failure", message: "Unable to Fetch Manufacturer details" });
        } else {
            if (results && results.length > 0) {
                res.json({
                    status: "Failure",
                    message: "This Data Already Exist",
                });
            } else {
            
                let data = [[
                  dt.manufacturer_name,
                  dt.manufacturer_description,
                    req.file.filename,
                    '0',
                    dt.created_by,
                ]];
                console.log("fdffsd",data)
                let sql_query = "INSERT INTO manufacturer (manufacturer_name,manufacturer_description,manufacturer_image, status, created_by) VALUES ?";
                connection.query(sql_query, [data], function (err, results, fields) {
                    if (err) {
                        console.log(err);
                        res.json({ status: "Failure", message: "Unable to Save Manufacturer details" });
                    } else {
                        console.log(results);
                        res.json({
                            status: "Success",
                            message: "Successfully saved Manufacturer details",
                        });
                    }
                });
            }


        }
    });

}
//Fetch Data By id
exports.edit_manufacturer = (req, res, next) => {

    let sql_query = "SELECT * FROM manufacturer WHERE manufacturer_id =" + req.params.manufacturer_id;

    connection.query(sql_query, function (err, results, fields) {
        if (err) {
            res.json({ status: "Failure", message: "Unable to fetch Manufacturer details" });
        } else {
            res.json({
                status: "Success",
                message: "Successfully fetched Manufacturer details",
                fileURL: fileURL,
                data: results
            });
        }
    });

}
//Update by Id
exports.update_manufacturer = (req, res, next) => {
    data = req;
    const dt=JSON.parse(req.body.data)
    let manufacturer_image = path.basename(dt.files)
    console.log("dgdsgfsdfs", path.basename(dt.files))
    console.log("data",dt);

    let datas = {
      manufacturer_name:dt.manufacturer_name,
      manufacturer_description:dt.manufacturer_description,
      manufacturer_image: manufacturer_image,
      status: '0',
        created_by:dt.created_by,
    };
    // console.log("data",req);
    // var datas = {
    //   manufacturer_name: data.manufacturer_name,
    //   manufacturer_description: data.manufacturer_description,
    //   manufacturer_image:data.uploadFile
    // }
    console.log("data",dt.id)

    var sql_query = "UPDATE `manufacturer` SET ? WHERE manufacturer_id= ?";
    connection.query(sql_query, [datas, dt.id], function (err, results, fields) {
        console.log(err);
        if (err) {
            res.json({ status: "Failure", message: "Unable to Update Manufacturer details" });
        } else {
          console.log("results",results)
            res.json({
                status: "Success",
                message: "Successfully Updated Manufacturer details",
            });
        }
    });
}
//Delete Data By id
exports.delete_manufacturer = (req, res, next) => {

    let sql_query = "DELETE FROM `manufacturer` WHERE manufacturer_id= ?";

    connection.query(sql_query, [req.params.manufacturer_id], function (err, results, fields) {
        if (err) {
            res.json({ status: "Failure", message: "Unable to Delete Manufacturer details" });

        } else {
            res.json({
                status: "Success",
                message: "Successfully Deleted Manufacturer details"
            });
        }
    });

}

exports.update_manufacturer_status_data_by_id = (req, res, next) => {
    if (!req.params.id) {
        res.json({ status: "failure", message: "Failed to update" });
    } else {
        var sql_query = "UPDATE `manufacturer` SET ? WHERE manufacturer_id= ?";
        connection.query(sql_query, [req.body, req.params.id], function (err, results, fields) {
            if (err) {
                res.json({ status: "Failure", message: "Unable to Update Manufacturer Status details" });

            } else {
                res.json({
                    status: "Success",
                    message: "Successfully Updated Manufacturer Status details",
                    data: results
                });
            }
        });
    }

}