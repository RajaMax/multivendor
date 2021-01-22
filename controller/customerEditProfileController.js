
const { connection } = require('../db/db.js');
const path = require('path');


const fileURL = 'http://dev.dxminds.online:6500/customer_profile_images/';


//Fetch Data By id
exports.fetch_customer_profile_data_by_id = (req, res, next) => {
        console.log("dsdsadasd",req.params.id)
    
        let sql_query = "SELECT * FROM customer WHERE customer_id =" + req.params.id;
    
        connection.query(sql_query, function (err, results, fields) {
            if (err) {
                res.json({ status: "Failure", message: "Unable to Fetch Customer Profile details" });
            } else {
                res.json({
                    status: "Success",
                    message: "Successfully Fetched Customer Profile details",
                    fileURL: fileURL,
                    data: results
                });
            }
        });
    
    }
    //Update Category by Id
    exports.update_customer_profile_data_by_id = (req, res, next) => {
      
        const dt=req.body
        const image=req.file.filename

        console.log("dgdsgfsdfs",image)

        var data = {

                first_name: dt.first_name,
                last_name: dt.last_name,
                mob_no: dt.mob_no,
                email: dt.email,
                gst_no: dt.gst_no,
                customer_image: req.file.filename
        }
        console.log("dsdsadasd",data)
    
        var sql_query = "UPDATE `customer` SET ? WHERE customer_id= ?";
        connection.query(sql_query, [data,dt.customer_id], function (err, results, fields) {
            console.log(err);
            if (err) {
                res.json({ status: "Failure", message: "Unable to Update Customer Profile details" });
            } else {
                res.json({
                    status: "Success",
                    message: "Successfully Updated Customer Profile details",
                });
            }
        });
    }