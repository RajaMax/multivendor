const { connection } = require('../db/db.js');



exports.fetch_all_stock_status_data = (req, res, next) => {
    let sql_query = "SELECT * FROM  stock_status ";
    connection.query(sql_query, function (err, results, fields) {
        if (err) {
            res.json({ status: "Failure", message: "Unable to fetch stock status details" });
        } else {
            console.log(results);
            res.json({
                status: "Success",
                message: "Successfully fetch stock status details",
                data: results
            });
        }
    });
}
