const jwt= require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const nodemailer = require('nodemailer');
var otpGenerator = require('otp-generator');
const { connection } = require('../db/db');


//admin login
exports.admin_login = (req, res, next) => {

    let username  = req.body.username;
    let password  = req.body.password;
    console.log(username);
    console.log(password);
    bcrypt.hash(req.body.password, saltRounds, function (err, pwd_hash) {

        console.log("passss",pwd_hash)

    connection.query("select * from admin where user_name=? ",[username],(err,results) =>{
console.log(results);

        if(results.length == 0 || err) {
     console.log('username does not exist');
     
            let response= { 
                status: 'username does not exist',
                statuscode:400,
                response:[{
                    token:null,
                    admin_id:null,
                    username:null
                }]
              };
              response = JSON.stringify(response);
            //  console.log("response",response)
              res.send(response);
 }
 else{ 

  console.log(results);

    bcrypt.compare(password, results[0].password, function(err, resp) {
        if(resp) {
         // Passwords match
         let payload= {subject:results[0].admin_id}
         console.log("payload",results[0].admin_id);
         console.log("payload",results[0].user_name);

         let token=jwt.sign(payload, 'sec#$retkey@$%');
         let response= { 
            status: 'success',
            statuscode:200,
            response:[{
                token:token,
                admin_id:results[0].admin_id,
                username:results[0].user_name,
                // college_id:results[0].college_id,  
            }]
          };
           response = JSON.stringify(response);
           console.log("payload",response);

           res.send(response)
        } else {
            console.log('username and password does not match');
            let response= { 
                status: 'username and password does not match',
                statuscode:401,
                response:[{
                    token:null,
                    admin_id:null,
                    username:null,
                    // college_id:null, 
                }]
              };
              response = JSON.stringify(response);
            //   console.log("response",response)
              res.send(response);
         // Passwords don't match
        } 
    });
     
    }
});
    });
}

//forgot password

exports.admin_forgot_passwrod = (req, res, next) => {

    let username = req.body.username;
    //  console.log("-------data----");
      console.log(username);
     const otp =otpGenerator.generate(6, { alphabets  : false,upperCase: false, specialChars: false , });
  
     connection.query("select * from admin where user_name= ?",[username],(err, result) => {
      // if any error while executing above query, throw error
      if(result.length == 0 || err) {
          console.log('UserName does not exist');
          let response= { 
              status: 'UserName does not exist',
              statuscode:401
            };
            response = JSON.stringify(response);
          //   console.log("response",response)
           // res.send(response);
      }
      else{
        res.json({
          statuscode:200,
          status: "Success",
          message: "OTP Sent Successfully",
         // data: results
      });
           // create reusable transporter object using the default SMTP transport
      let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: 'amajjagi1997@gmail.com', // generated ethereal user
          pass:  'kuktevazmyjlnwaw'// generated ethereal password
        },
        tls: {
            rejectUnauthorized: false
        }
      });
    
      // send mail with defined transport object
      let mailOptions = {
        from: '"Multivendor " <amajjagi1997@gmail.com>', // sender address
        to: username, // list of receivers
        subject: "Reset Password OTP", // Subject line
        text: "Hi,Please find the OTP to enter.", // plain text body
        html: otp  // html body
      };
      transporter.sendMail(mailOptions, (error, info) => {
          if(error){
              console.log(error);
          }
        
    
      // console.log("Message sent: %s", info.messageId);
      // // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    
      // // Preview only available when sending through an Ethereal account
      // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      // // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  });
  
          console.log("data inserted",result[0].admin_id);
        //  console.log(otp);
          var sql_query = "UPDATE `admin` SET otp = ? WHERE admin_id= ?";
          connection.query(sql_query, [otp, result[0].admin_id], function (err, results, fields) {
              // console.log(results);
              // if any error while executing above query, throw error
              if (err) throw err;
              else{
                  let response= { 
                      status: 'success',
                      statuscode:200
                    };
                     response = JSON.stringify(response);
                     res.send(response)
                 
              }
          });
      }
      });
     
}

//verify OTP

exports.admin_verify_otp = (req, res, next) => {

    let otp = req.body.otp;
    console.log(otp);
    connection.query("select * from admin where otp= ?",[otp],(err, result) => {
  // if any error while executing above query, throw error
 
  if(result.length == 0 || err) {
    console.log('OTP does not match');
    let response= { 
        status: 'OTP does not match',
        statuscode:401
      };
      response = JSON.stringify(response);
    //   console.log("response",response)
      res.send(response);
}
     else{
    console.log(" otp is matched");
    let response= { 
        status: 'success',
        statuscode:200,
        response:{
            admin_id:result[0].admin_id
        }
      };
       response = JSON.stringify(response);
       res.send(response)

}
});

}

//verify password

exports.admin_verify_password = (req, res, next) => {

    let password= req.body.newpassword;
    console.log("res",password);
    let admin_id = req.body.id;
    console.log("res",admin_id);

  bcrypt.hash(password, saltRounds, function(err, hash) {
    console.log(hash);

var sql_query = "UPDATE `admin` SET password = ? WHERE admin_id= ?";
    connection.query(sql_query, [hash,admin_id], function (err, results, fields) {
        console.log(results);
        res.json({
          statuscode:200,
          status: "Success",
          message: "Admin Updated Successfully",
         // data: results
      });
    });
});

}

//admin_vendor_management


//add customer

exports.add_admin_vendor = (req, res, next) => {

  console.log("content");
    let data = req.body;
    let mob_no = String(req.body.mob_no);
    let account_no = String(data.account_no);
    let ifsc_code = String(data.ifsc_code);

    bcrypt.hash(data.password, saltRounds, function (err, pwd_hash) {
        bcrypt.hash(mob_no, saltRounds, function (err, mob_no_hash) {
             bcrypt.hash(data.bank_name, saltRounds, function (err, bank_name_hash) {
                 bcrypt.hash(data.branch_name, saltRounds, function (err, branch_name_hash) {
                     bcrypt.hash(account_no, saltRounds, function (err, account_no_hash) {
                        bcrypt.hash(ifsc_code, saltRounds, function (err, ifsc_code_hash) {
let datas = [[
        data.vendor_name,
        mob_no_hash,
        data.outlet_name,
        data.outlet_tele_no,
        data.email,
        data.outlet_address,
        data.outlet_time,
        data.city,
        data.area_pincode,
        data.gst,
        data.category_outlet,
        bank_name_hash,
        branch_name_hash,
        account_no_hash,
        ifsc_code_hash,
        pwd_hash
]];
    console.log("data",datas)
  console.log("res",pwd_hash);


  var sql_query = "INSERT INTO vendor (vendor_name,mob_no, outlet_name,outlet_tele_no,`email`,`outlet_address`,`outlet_time`,`city`,`area_pincode`,`gst`,`category_outlet`,`bank_name`,`branch_name`,`account_no`,`ifsc_code`,`password`) values ?";
  connection.query(sql_query, [datas], function (err, results) {
      console.log(err);
      if (err) {
          res.json({ status: "Failure", message: "Unable to Save" });

      } else {
          console.log(results);
  res.json({
      statuscode:200,
      status: "Success",
      message: "vendor added Successfully",
     // data: results
  });
}
});
                        });
                      });
                    });
                  });
                }); });
}


//get customer by id

exports.edit_admin_vendor = (req, res, next) => {
  console.log("vendor_id");

  let vendor_id = req.params.vendor_id;
  console.log("vendor_id", vendor_id);
  connection.query(`SELECT * FROM vendor where vendor_id = ${vendor_id} `, function (err, result) {

    if (err) throw err;
    else {
      console.log('data fetched', result);
      res.json({
        statuscode:200,
        status: "Success",
        message: "vendor fetched Successfully",
        data: result
    });
    }
  });
}


//Update Data
  exports.update_admin_vendor = (req, res, next) => {
    console.log("content");
    let data = req.body;
  
    let mob_no = String(req.body.mob_no);
    let account_no = String(data.account_no);
    let ifsc_code = String(data.ifsc_code);

    bcrypt.hash(data.password, saltRounds, function (err, pwd_hash) {
        bcrypt.hash(mob_no, saltRounds, function (err, mob_no_hash) {
             bcrypt.hash(data.bank_name, saltRounds, function (err, bank_name_hash) {
                 bcrypt.hash(data.branch_name, saltRounds, function (err, branch_name_hash) {
                     bcrypt.hash(account_no, saltRounds, function (err, account_no_hash) {
                        bcrypt.hash(ifsc_code, saltRounds, function (err, ifsc_code_hash) {
let datas = [
        data.vendor_name,
        mob_no_hash,
        data.outlet_name,
        data.outlet_tele_no,
        data.email,
        data.outlet_address,
        data.outlet_time,
        data.city,
        data.area_pincode,
        data.gst,
        data.category_outlet,
        bank_name_hash,
        branch_name_hash,
        account_no_hash,
        ifsc_code_hash,
        pwd_hash,
        data.vendor_id
      ];
    //   console.log("data",[datas,req.body.vendor_id])

    //   console.log("data",datas)
    // console.log("res",pwd_hash);
  
    connection.query('UPDATE vendor SET vendor_name = ?,mob_no = ?,outlet_name = ?,outlet_tele_no = ?,email = ?,outlet_address = ?,outlet_time = ?,city = ?,area_pincode = ?,gst = ?,category_outlet = ?,bank_name = ?,branch_name = ?,account_no = ?,ifsc_code = ?,password = ? WHERE vendor_id = ?', datas, (err, result) => {
      console.log("result", result);
      if (err) throw err;
      else {
        res.json({
          statuscode:200,
          status: "Success",
          message: "vendor updated Successfully",
          data: result
      });
      }
    });
});
                });
            });
        });
    });
  });
  }
  
//Delete Data
exports.delete_admin_vendor = (req, res, next) => {

var vendor_id = req.body.vendor_id;
console.log(vendor_id);
var sql_query = "DELETE FROM `vendor` WHERE vendor_id= ?";
connection.query(sql_query, [req.params.vendor_id], function (err, result) {

  if (err) throw err;
  else {
    console.log('data deleted', result);

    res.json({
      statuscode:200,
      status: "Success",
      message: "vendor Deleted Successfully",
      data: result
  });
  }

});

}