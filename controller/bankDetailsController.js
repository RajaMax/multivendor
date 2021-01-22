const { connection } = require('../db/db.js');
const fileURL = 'http://dev.dxminds.online:6500/bankDetailsImages/';
var CryptoJS = require("crypto-js");


exports.get_bank_details = (req, res, next) => {

    let sql_query = "SELECT * FROM  bank_details order by bank_details_id";
    connection.query(sql_query, function (err, results, fields) {
        if (err) {
            res.json({ status: "Failure", message: "Unable to fetch bank details" });
        } else {
            var bytes1  = CryptoJS.AES.decrypt(results[0].company_name, 'multivendor@123');
            var bytes2  = CryptoJS.AES.decrypt(results[0].bank_name, 'multivendor@123');
            var bytes3  = CryptoJS.AES.decrypt(results[0].branch_name, 'multivendor@123');
            var bytes4  = CryptoJS.AES.decrypt(results[0].account_number, 'multivendor@123');
            var bytes5  = CryptoJS.AES.decrypt(results[0].ifsc_code, 'multivendor@123');
            var company_name = bytes1.toString(CryptoJS.enc.Utf8);
            var bank_name = bytes2.toString(CryptoJS.enc.Utf8);
            var branch_name = bytes3.toString(CryptoJS.enc.Utf8);
            var account_number = bytes4.toString(CryptoJS.enc.Utf8);
            var ifsc_code = bytes5.toString(CryptoJS.enc.Utf8);
            console.log(company_name,bank_name,branch_name,account_number,ifsc_code);
            dataDecrypt = {
                "company_name":company_name,
                "bank_name":bank_name,
                "branch_name": branch_name,
                "account_number":account_number,
                "ifsc_code":ifsc_code
            };           
             console.log(dataDecrypt);

            console.log(results);
            res.json({
                status: "Success",
                message: "Successfully fetch bank details",
                data: results,
                data1:dataDecrypt
            });
        }
    });
}

// Save Data
exports.add_bank_details = (req, res, next) => {
    const dt=JSON.parse(req.body.data)
    console.log("dsfsfdsf",dt);

    console.log(req.file.filename);
    console.log(req.body);
    


    let sql_query = `SELECT * FROM bank_details WHERE bank_name='${dt.bank_name}'`;

    connection.query(sql_query, function (err, results, fields) {
        if (err) {
            console.log(err);
            res.json({ status: "Failure", message: "Unable to Fetch bank details" });
        } else {
            if (results && results.length > 0) {
                res.json({
                    statuscode:"401",
                    status: "Failure",
                    message: "This Data Already Exist",
                });
            } else {
                var company_name = CryptoJS.AES.encrypt(dt.company_name, 'multivendor@123').toString();
                var bank_name = CryptoJS.AES.encrypt(dt.bank_name, 'multivendor@123').toString();
                var branch_name = CryptoJS.AES.encrypt(dt.branch_name, 'multivendor@123').toString();
                var account_number = CryptoJS.AES.encrypt(dt.account_number, 'multivendor@123').toString();
                var ifsc_code = CryptoJS.AES.encrypt(dt.ifsc_code, 'multivendor@123').toString();
                console.log(company_name,bank_name,branch_name,account_number,ifsc_code);

                let bank_data = [[
                    req.file.filename,
                    company_name,
                   bank_name,
                    branch_name,
                   account_number,
                   ifsc_code,
                    dt.created_by,
                    '0'
     
                ]];
                let sql_query = "INSERT INTO bank_details (bank_image,company_name, bank_name,branch_name,account_number,ifsc_code,created_by,status) VALUES ?";
                connection.query(sql_query, [bank_data], function (err, results, fields) {
                    if (err) {
                        console.log(err);
                        res.json({ status: "Failure", message: "Unable to Save bank details" });
                    } else {
                        console.log(results);
                        res.json({
                            statuscode:"200",
                            status: "Success",
                            message: "Successfully saved bank details",
                        });
                    }
                });
            }


        }
    });

}
//Fetch Data By id
exports.get_bank_details_by_id = (req, res, next) => {

    let sql_query = "SELECT * FROM bank_details WHERE bank_details_id =" + req.params.bank_details_id;

    connection.query(sql_query, function (err, results, fields) {
        if (err) {
            res.json({statuscode:"401", status: "Failure", message: "Unable to fetch bank details" });
        } else {
console.log("results",results[0].company_name)
            var bytes1  = CryptoJS.AES.decrypt(results[0].company_name, 'multivendor@123');
            var bytes2  = CryptoJS.AES.decrypt(results[0].bank_name, 'multivendor@123');
            var bytes3  = CryptoJS.AES.decrypt(results[0].branch_name, 'multivendor@123');
            var bytes4  = CryptoJS.AES.decrypt(results[0].account_number, 'multivendor@123');
            var bytes5  = CryptoJS.AES.decrypt(results[0].ifsc_code, 'multivendor@123');
            var company_name = bytes1.toString(CryptoJS.enc.Utf8);
            var bank_name = bytes2.toString(CryptoJS.enc.Utf8);
            var branch_name = bytes3.toString(CryptoJS.enc.Utf8);
            var account_number = bytes4.toString(CryptoJS.enc.Utf8);
            var ifsc_code = bytes5.toString(CryptoJS.enc.Utf8);
            console.log(company_name,bank_name,branch_name,account_number,ifsc_code);
            dataDecrypt = {
                "company_name":company_name,
                "bank_name":bank_name,
                "branch_name": branch_name,
                "account_number":account_number,
                "ifsc_code":ifsc_code
            };           
             console.log(dataDecrypt);

            res.json({
                statuscode:"200",
                status: "Success",
                message: "Successfully fetched bank details",
                fileURL: fileURL,
                data: results,
                data1:dataDecrypt
            });
        }
    });

}
//Update data by Id
exports.update_bank_details_data_by_id = (req, res, next) => {
    const dt=JSON.parse(req.body.data)
    console.log("dsfsfdsf",dt);
    var company_name = CryptoJS.AES.encrypt(dt.company_name, 'multivendor@123').toString();
    var bank_name = CryptoJS.AES.encrypt(dt.bank_name, 'multivendor@123').toString();
    var branch_name = CryptoJS.AES.encrypt(dt.branch_name, 'multivendor@123').toString();
    var account_number = CryptoJS.AES.encrypt(dt.account_number, 'multivendor@123').toString();
    var ifsc_code = CryptoJS.AES.encrypt(dt.ifsc_code, 'multivendor@123').toString();
    console.log(company_name,bank_name,branch_name,account_number,ifsc_code);

    var data = {
        bank_image: dt.files,
        company_name: company_name,
        bank_name:bank_name,
        branch_name:branch_name,
        account_number: account_number,
        ifsc_code: ifsc_code,
        created_by:dt.created_by,
        status:'0',
    }
    var sql_query = "UPDATE `bank_details` SET ? WHERE bank_details_id= ?";
    connection.query(sql_query, [data, dt.id], function (err, results, fields) {
        console.log(err);
        if (err) {
            res.json({statuscode:"401", status: "Failure", message: "Unable to Update bank details" });
        } else {
            res.json({
                statuscode:"200",
                status: "Success",
                message: "Successfully Updated bank details",
            });
        }
    });
}
//Delete Data By id
exports.delete_bank_details = (req, res, next) => {
    console.log("req.body",req.params.bank_details_id)

    let sql_query = "DELETE FROM `bank_details` WHERE bank_details_id= ?";

    connection.query(sql_query, [req.params.bank_details_id], function (err, results, fields) {
        if (err) {
            res.json({statuscode:"401", status: "Failure", message: "Unable to Delete bank details" });

        } else {
            res.json({
                statuscode:"200",
                status: "Success",
                message: "Successfully Deleted bank details"
            });
        }
    });

}


//fetch_all_active_data
exports.fetch_all_active_bank_details_data = (req, res, next) => {
    let sql_query = "SELECT * FROM  bank_details where status=1 order by bank_details_id";
    connection.query(sql_query, function (err, results, fields) {
        if (err) {
            res.json({statuscode:"401", status: "Failure", message: "Unable to fetch active bank details" });
        } else {
            console.log(results);
            res.json({
                statuscode:"200",
                status: "Success",
                message: "Successfully fetch active bank details",
                data: results
            });
        }
    });
}