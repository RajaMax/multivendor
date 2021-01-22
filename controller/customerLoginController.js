const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const nodemailer = require('nodemailer');
var otpGenerator = require('otp-generator');
const { connection } = require('../db/db');



//send otp for customer while registering

exports.fetch_register_data = (req, res, next) => {

  let data = req.body;
  console.log("data", data)
  bcrypt.hash(data.password, saltRounds, function (err, pwd_hash) {

    let datas = [
      data.first_name,
      data.last_name,
      data.mob_no,
      data.email,
      pwd_hash,
      data.gst_no
    ];
    console.log("data", datas)
    const otp = otpGenerator.generate(6, { alphabets: false, upperCase: false, specialChars: false, });
    console.log("data", otp)

    var otps = JSON.parse(otp);
    console.log("data", otps)
    console.log("data", req.body.mob_no)
    let review_data = [[
      otps,
      req.body.mob_no
    ]];

    var sql_query = "select * from otp_check where email_mob= ?";
    connection.query(sql_query, req.body.mob_no, function (err, results) {
      if (results && !results.length == 0) {
        res.json({ status: "Failure", message: "Customer already exist" });

      } else {
        console.log("res", results);
        // connection.query("INSERT INTO otp_check (otp,email_mob) values ?",[review_data], function (err, results, fields) {

        var sql_query = "INSERT INTO otp_check (otp,email_mob) values ?";
        connection.query(sql_query, [review_data], function (err, results) {

          console.log(err);
          if (err) {
            res.json({ status: "Failure", message: "Unable to Save" });

          } else {
            console.log(results);
            res.json({
              statuscode: 200,
              status: "Success",
              message: "OTP Sent Successfully",
              otp: otps
              // data: results
            });
            // create reusable transporter object using the default SMTP transport
            //    let transporter = nodemailer.createTransport({
            //      host: "smtp.gmail.com",
            //        port: 587,
            //        secure: false, // true for 465, false for other ports
            //        auth: {
            //          user: 'amajjagi1997@gmail.com', // generated ethereal user
            //          pass:  'kuktevazmyjlnwaw'// generated ethereal password
            //        },
            //        tls: {
            //            rejectUnauthorized: false
            //        }
            //  });

            // send mail with defined transport object
            //    let mailOptions = {
            //      from: '"Multivendor " <amajjagi1997@gmail.com>', // sender address
            //      to: req.body.mob_no, // list of receivers
            //     subject: "Registration OTP for Multivendor", // Subject line
            //     text: "Hi,Please find the OTP to enter.", // plain text body
            //      html: otp  // html body
            //  };
            //    transporter.sendMail(mailOptions, (error, info) => {
            //        if(error){
            //            console.log(error);
            //        }
            //      });

          }
        });
      }
    });
  });
}

//otp verification for customer while registering
exports.verify_customer_otp = (req, res, next) => {
  console.log("data")

  let data = req.body;
  let otp = req.body.otp;
  bcrypt.hash(data.password, saltRounds, function (err, pwd_hash) {
    // bcrypt.hash(data.mob_no, saltRounds, function (err, mob_hash) {


    console.log("data", data)
    let datas = [[
      data.first_name,
      data.last_name,
      data.mob_no,
      // mob_hash,
      data.email,
      pwd_hash,
      data.gst_no
    ]];

    console.log(" otp ");
    connection.query("select * from otp_check where email_mob= ?", [data.mob_no], (err, result) => {
      // if any error while executing above query, throw error
      if (result.length == 0 || err) {
        res.json({ status: "Failure", message: "Customer Doesn't exist" });
      }
      else {
        console.log("ress", result[0].otp === otp)
        if (result[0].otp != otp) {
          console.log("OTP does not match", result[0].otp === otp)

          res.json({
            status: 'OTP does not match',
            statuscode: 401
          });
        }
        else {


          console.log("ress", result[0])
          var sql_query = "select * from customer where mob_no= ?";
          connection.query(sql_query, req.body.mob_no, function (err, resu) {


            if (!resu.length == 0 || err) {
              res.json({ status: "Failure", message: "Customer already exist" });

            } else {



              var sql_query = "INSERT INTO customer (first_name,last_name,mob_no,email,password,gst_no) values ?";
              connection.query(sql_query, [datas], function (err, results) {
                console.log(err);
                if (err) {
                  res.json({ status: "Failure", message: "Unable to Save" });

                } else {
                  console.log(results);
                  res.json({
                    statuscode: 200,
                    status: "Success",
                    message: "Customer Registerred Successfully",
                    // data: results
                  });
                }
              });
            }

          })
        }
      }

    });

  });
  //});
}

//customer login
exports.customer_login = (req, res, next) => {

  let mob_no = req.body.mob_no;
  let device_id = req.body.device_id;
  let device_token_value = req.body.device_token_value;

  console.log(mob_no);
  console.log(device_id);
  console.log(device_token_value);

  // console.log(password);
  connection.query("select * from customer where mob_no=? ", [mob_no], (err, results) => {
    console.log(results);

    if (results.length == 0 || err) {
      console.log('username does not exist');

      let response = {
        status: 'username does not exist',
        statuscode: 400,
        response: [{
          token: null,
          customer_id: null,
          username: null
        }]
      };
      response = JSON.stringify(response);
      //  console.log("response",response)
      res.send(response);
    }
    else {
      //  bcrypt.compare(password, results[0].password, function(err, resp) {


      const otp = otpGenerator.generate(6, { alphabets: false, upperCase: false, specialChars: false, });
      console.log("data", otp)

      otps = JSON.parse(otp);

      //send otp to mob number

      console.log("data", otps)
      console.log("data", req.body.mob_no)
      let review_data = [[
        otps,
        req.body.mob_no
      ]];
      connection.query("UPDATE `customer` SET `otp`=? WHERE mob_no= ?", [otps, req.body.mob_no], (err, result) => {
        if (results.length == 0 || err) {
          console.log('username does not exist');

          let response = {
            status: 'Cannot send OTP ',
            statuscode: 400,
            response: [{
              token: null,
              customer_id: null,
              username: null
            }]
          };
          response = JSON.stringify(response);
          //  console.log("response",response)
          res.send(response);
        }
        else {
          console.log("result", result)
          res.json({
            statuscode: 200,
            status: "Success",
            message: "OTP Sent Successfully",
            otp: otps
            // data: results
          });
        }
      });

      otps = JSON.parse(otp);

      //send otp to mob number

      console.log("data", otps)
      console.log("data", req.body.mob_no)
      connection.query("UPDATE `customer` SET `otp`=? WHERE mob_no= ?", [otps, req.body.mob_no], (err, result) => {
        if (results.length == 0 || err) {
          console.log('username does not exist');

          let response = {
            status: 'Cannot send OTP ',
            statuscode: 400,
            response: [{
              token: null,
              customer_id: null,
              username: null
            }]
          };
          response = JSON.stringify(response);
          //  console.log("response",response)
          res.send(response);
        }
        else {
          console.log("result", result)
          res.json({
            statuscode: 200,
            status: "Success",
            message: "OTP Sent Successfully",
            // data: results
          });
        }
      });


      // Passwords match
      //   console.log(res);
      //  let payload= {subject:results[0].customer_id}

      //  let token=jwt.sign(payload, 'sec#$retkey@$%');
      //  let response= { 
      //     status: 'success',
      //     statuscode:200,
      //     response:[{
      //         token:token,
      //         customer_id:results[0].customer_id,
      //         username:results[0].user_name,
      //         // college_id:results[0].college_id,  
      //     }]
      //   };
      //    response = JSON.stringify(response);
      //    res.send(response)
      // } else {
      //     console.log('username and password does not match');
      //     let response= { 
      //         status: 'username and password does not match',
      //         statuscode:401,
      //         response:[{
      //             token:null,
      //             customer_id:null,
      //             username:null,
      //             // college_id:null, 
      //         }]
      //       };
      //       response = JSON.stringify(response);
      //     //   console.log("response",response)
      //       res.send(response);
      //  // Passwords don't match
      // } 
      //  });

      // }
    }

  });
}


// //customer login
// exports.customer_login = (req, res, next) => {

//     let username  = req.body.user_name;
//     let password  = req.body.password;
//     console.log(username);
//     console.log(password);
//     connection.query("select * from customer where email=? ",[username],(err,results) =>{
// console.log(results);

//         if(results.length == 0 || err) {
//      console.log('username does not exist');

//             let response= { 
//                 status: 'username does not exist',
//                 statuscode:400,
//                 response:[{
//                     token:null,
//                     customer_id:null,
//                     username:null
//                 }]
//               };
//               response = JSON.stringify(response);
//             //  console.log("response",response)
//               res.send(response);
//  }
//  else{ 
//     bcrypt.compare(password, results[0].password, function(err, resp) {
//         if(resp) {
//          // Passwords match
//         //   console.log(res);
//          let payload= {subject:results[0].customer_id}

//          let token=jwt.sign(payload, 'sec#$retkey@$%');
//          let response= { 
//             status: 'success',
//             statuscode:200,
//             response:[{
//                 token:token,
//                 customer_id:results[0].customer_id,
//                 username:results[0].user_name,
//                 // college_id:results[0].college_id,  
//             }]
//           };
//            response = JSON.stringify(response);
//            res.send(response)
//         } else {
//             console.log('username and password does not match');
//             let response= { 
//                 status: 'username and password does not match',
//                 statuscode:401,
//                 response:[{
//                     token:null,
//                     customer_id:null,
//                     username:null,
//                     // college_id:null, 
//                 }]
//               };
//               response = JSON.stringify(response);
//             //   console.log("response",response)
//               res.send(response);
//          // Passwords don't match
//         } 
//     });

//     }
// });
// }

exports.customer_login_otp_verification = (req, res, next) => {

  let otp = req.body.otp;
  let mob_no = req.body.mob_no;
  let device_id = req.body.device_id;
  let device_token_value = req.body.device_token_value;
  console.log(otp);
  console.log(device_id);
  console.log(device_token_value);
  console.log(mob_no);



  connection.query("select * from customer where mob_no=? and otp= ?", [mob_no, otp], (err, result) => {
    // if any error while executing above query, throw error
    console.log(result);

    if (result.length == 0 || err) {
      console.log('OTP does not match');
      let response = {
        status: 'OTP does not match',
        statuscode: 401
      };
    }
    else {
      console.log(" otp is matched");
      console.log("result", result[0].customer_id)

      connection.query("select * from device_token where (customer_id= ? && device_id= ? && device_token_value =?)", [result[0].customer_id, device_id, device_token_value], (err, resu) => {
        if (err) {
          console.log('Result not Found');
          console.log(err);
          res.json({
            statuscode: 401,
            status: "Failure",
            message: "login Failed",
            // data: results
          });
        }
        else {


          let value = [[
            result[0].customer_id,
            req.body.device_id,
            req.body.device_token_value,
            req.body.created_by,
            '0'
          ]];

          var sql_query = "INSERT INTO device_token (customer_id,device_id,device_token_value,created_by,status) values ?";
          connection.query(sql_query, [value], function (err, results) {
            console.log(err);
            if (err) {
              console.log("result", result)
              res.json({
                statuscode: 401,
                status: "Failure",
                message: "login Failed",
                // data: results
              });

            } else {
              let response = {
                status: 'success',
                message: "Successful",
                statuscode: 200,
                response: {
                  customer_id: result[0].customer_id
                }
              };
              response = JSON.stringify(response);
              res.send(response)

            }
          });
        }
      });


    }



  });
}



exports.customer_login_password_verification = (req, res, next) => {


  let mob_no = req.body.mob_no;
  let password = req.body.password;



  connection.query("select * from customer where mob_no=?", [mob_no], (err, result) => {
    // if any error while executing above query, throw error
    console.log(result);

    if (!result || result.length == 0) {
      console.log('Unable to fetch data');
      let response = {
        status: 'Unable to fetch data',
        statuscode: 401
      };
      response = JSON.stringify(response);
      // console.log("response",response)
      res.send(response);
    }
    else {
      console.log("old pwd", result[0].password);
      bcrypt.compare(password, result[0].password, function (err, resp) {
        if (resp) {
          // Passwords match
          console.log(resp);
          connection.query("select * from customer where mob_no=?", [mob_no], (err, result) => {
            console.log(result);
            let response = {
              status: 'Login Successfull',
              statuscode: 200,
              userdata: {
                "customer_id": result[0].customer_id,
                "first_name": result[0].first_name,
                "last_name": result[0].last_name,
                "mob_no": result[0].mob_no,
                "email": result[0].email,
                "password": result[0].password
              }
            };
            response = JSON.stringify(response);
            res.send(response)
          })
        } else {
          console.log('username and password does not match');
          let response = {
            status: 'username and password does not match',
            statuscode: 401
          };
          response = JSON.stringify(response);
          // console.log("response",response)
          res.send(response);
          // Passwords don't match
        }
      });
    }



  });
}








//forgot password

exports.customer_forgot_passwrod = (req, res, next) => {

  let user_name = req.body.user_name;
  //  console.log("-------data----");
  console.log(user_name);
  const otp = otpGenerator.generate(6, { alphabets: false, upperCase: false, specialChars: false, });

  connection.query("select * from customer where (email= ? or mob_no = ?)", [user_name, user_name], (err, result) => {
    // if any error while executing above query, throw error
    if (result.length == 0 || err) {
      console.log('UserName does not exist');
      let response = {
        status: 'UserName does not exist',
        statuscode: 401
      };
      response = JSON.stringify(response);
      //   console.log("response",response)
      res.send(response);
    }
    else {
      // create reusable transporter object using the default SMTP transport
      //     let transporter = nodemailer.createTransport({
      //       host: "smtp.gmail.com",
      //       port: 587,
      //       secure: false, // true for 465, false for other ports
      //       auth: {
      //         user: 'amajjagi1997@gmail.com', // generated ethereal user
      //         pass:  'kuktevazmyjlnwaw'// generated ethereal password
      //       },
      //       tls: {
      //           rejectUnauthorized: false
      //       }
      //     });

      //     // send mail with defined transport object
      //     let mailOptions = {
      //       from: '"Multivendor " <amajjagi1997@gmail.com>', // sender address
      //       to: user_name, // list of receivers
      //       subject: "Reset Password OTP", // Subject line
      //       text: "Hi,Please find the OTP to enter.", // plain text body
      //       html: otp  // html body
      //     };
      //     transporter.sendMail(mailOptions, (error, info) => {
      //         if(error){
      //             console.log(error);
      //         }


      //     // console.log("Message sent: %s", info.messageId);
      //     // // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

      //     // // Preview only available when sending through an Ethereal account
      //     // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      //     // // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
      // });

      console.log("data inserted", result[0].customer_id);
      console.log(otp);
      var sql_query = "UPDATE `customer` SET otp = ? WHERE customer_id= ?";
      connection.query(sql_query, [otp, result[0].customer_id], function (err, results, fields) {
        // console.log(results);
        // if any error while executing above query, throw error
        if (err) throw err;
        else {
          let response = {
            status: 'success',
            statuscode: 200,
            otp: otp
          };
          response = JSON.stringify(response);
          res.send(response)

        }
      });
    }
  });
}


//verify OTP

exports.customer_verify_otp = (req, res, next) => {

  let otp = req.body.otp;
  console.log(otp);
  connection.query("select * from customer where otp= ?", [otp], (err, result) => {
    // if any error while executing above query, throw error

    if (result.length == 0 || err) {
      console.log('OTP does not match');
      let response = {
        status: 'OTP does not match',
        statuscode: 401
      };
      response = JSON.stringify(response);
      //   console.log("response",response)
      res.send(response);
    }
    else {
      console.log(" otp is matched");
      let response = {
        status: 'success',
        statuscode: 200,
        response: {
          customer_id: result[0].customer_id
        }
      };
      response = JSON.stringify(response);
      res.send(response)

    }
  });

}

//verify password

exports.customer_verify_password = (req, res, next) => {

  let password = req.body.newpassword;
  console.log("res", password);
  let customer_id = req.body.customer_id;

  bcrypt.hash(password, saltRounds, function (err, hash) {
    console.log(hash);

    var sql_query = "UPDATE `customer` SET password = ? WHERE customer_id= ?";
    connection.query(sql_query, [hash, customer_id], function (err, results, fields) {
      console.log(results);
      let response = {
        status: 'Password Updated Successfully',
        statuscode: 200
      };
      response = JSON.stringify(response);
      res.send(response)
    });
  });

}

//fetch customer

//get customer by id

exports.fetch_customer = (req, res, next) => {
  connection.query(`SELECT * FROM customer`, function (err, result) {

    if (err) throw err;
    else {
      console.log('data fetched', result);
      res.json({
        statuscode: 200,
        status: "Success",
        message: "Customer fetched Successfully",
        data: result
      });
    }
  });
}


//add customer

exports.add_customer = (req, res, next) => {

  let data = req.body;
  console.log("data", data)
  bcrypt.hash(data.password, saltRounds, function (err, pwd_hash) {

    let datas = [[
      data.first_name,
      data.last_name,
      data.mob_no,
      data.email,
      pwd_hash,
      data.gst_no
    ]];
    console.log("data", datas)
    console.log("res", pwd_hash);
    var sql_query = "select * from customer where email= ?";
    connection.query(sql_query, req.body.email, function (err, resu) {

      if (!resu.length == 0 || err) {
        res.json({
          statuscode: 401,
          status: "customer already exist"
        });

      } else {

        var sql_query = "INSERT INTO customer (first_name,last_name,mob_no,email,password,gst_no) values ?";
        connection.query(sql_query, [datas], function (err, results) {
          console.log(err);
          if (err) {
            res.json({ status: "Failure", message: "Unable to Save" });

          } else {
            console.log(results);
            res.json({
              statuscode: 200,
              status: "Success",
              message: "Customer added Successfully",
              // data: results
            });
          }
        });
      }
    });

  });
}


//get customer by id

exports.edit_customer = (req, res, next) => {
  console.log("customer_id");

  let customer_id = req.params.customer_id;
  console.log("customer_id", customer_id);
  connection.query(`SELECT * FROM customer where customer_id = ${customer_id} `, function (err, result) {

    if (err) throw err;
    else {
      console.log('data fetched', result);
      res.send(result);
    }
  });
}


//Update Data
exports.update_customer = (req, res, next) => {
  console.log("content");
  let data = req.body;
  console.log("data", data)
  bcrypt.hash(data.password, saltRounds, function (err, pwd_hash) {

    let datas = [
      data.first_name,
      data.last_name,
      data.mob_no,
      data.email,
      pwd_hash,
      data.gst_no,
      data.customer_id
    ];
    console.log("data", datas)
    console.log("res", pwd_hash);



    connection.query('UPDATE customer SET first_name = ?,last_name = ?,mob_no = ?,email = ?,password = ?,gst_no = ? WHERE customer_id = ?', datas, (err, resu) => {
      console.log("result", resu);
      if (err) throw err;
      else {
        // res.send(resu);
        res.json({
          statuscode: 200,
          status: "Success",
          message: "Customer Updated Successfully",
          // data: results
        });
      }
    });

  });
}

//Delete Data
exports.delete_customer = (req, res, next) => {

  var customer_id = req.body.customer_id;
  console.log(customer_id);
  var sql_query = "DELETE FROM `customer` WHERE customer_id= ?";
  connection.query(sql_query, [req.params.customer_id], function (err, result) {

    if (err) throw err;
    else {
      console.log('data deleted', result);
      // res.send(result);
      res.json({
        statuscode: 200,
        status: "Success",
        message: "Customer Deleted Successfully",
        // data: results
      });
    }

  });

}

exports.change_customer_password = (req, res, next) => {
  let old_pwd = req.body.old_pwd;
  let new_pwd = req.body.new_pwd;

  console.log("res", old_pwd)
  console.log("res", new_pwd);
  let customer_id = req.body.customer_id;
  console.log("res", customer_id);

  connection.query("select * from customer where customer_id=? ", [customer_id], (err, results) => {
    if (err) {
      res.json({
        statuscode: 401,
        status: "error",
        message: "User Doesn't Exist",
        // data: results
      });
    }
    else {
      console.log(results[0].password);
      bcrypt.hash(new_pwd, saltRounds, function (err, new_pwd_hash) {

        bcrypt.compare(old_pwd, results[0].password, function (err, resp) {
          if (resp) {

            console.log(resp);

            var sql_query = "UPDATE `customer` SET password = ? WHERE customer_id= ?";
            connection.query(sql_query, [new_pwd_hash, customer_id], function (err, results, fields) {
              console.log(results);
              res.json({
                statuscode: 200,
                status: "Success",
                message: "Password Updated Successfully",
                // data: results
              });
            });
          }
          else {
            res.json({
              statuscode: 401,
              status: "error",
              message: "Password Doesn't match",
              // data: results
            });
          }
        });
      });
    }
  });
}



//logout customer

exports.logout_customer = (req, res, next) => {


  let customer_id = req.body.customer_id;
  let device_id = req.body.device_id;
  let device_token_value = req.body.device_token_value;
  connection.query("select * from device_token where (customer_id= ? && device_id = ? && device_token_value=?) ", [customer_id, device_id, device_token_value], (err, results) => {
    if (results.length == 0 || err) {
      res.json({ status: "Failure", message: "Unable get reuslt" });
    }
    else {
      console.log(results);



      console.log("results", results[0].device_token_id)
      let id = results[0].device_token_id;

      var sql_query = "DELETE FROM `device_token` WHERE device_token_id =? ";
      connection.query(sql_query, id, function (err, result) {

        if (err) {
          res.json({
            statuscode: 401,
            status: "error",
            message: "Logout Failed"
          });
        }
        else {
          res.json({
            statuscode: 200,
            status: "success",
            message: "Logout Successful"
          });
        }

      });
    }
  });
}
//Fetch Active customer Data
exports.fetch_all_active_customer_data = (req, res, next) => {
  let sql_query = "SELECT * FROM customer where status=0";
  connection.query(sql_query, function (err, result) {
    if (err) {
      res.json({ status: "Failure", message: "Unable to Fetch active customer details" });
    } else {
      res.json({
        status: "Success",
        message: "Successfully Fetched active customer details",
        data: result
      });
    }
  });
}
exports.update_customer_status_data_by_id = (req, res, next) => {
  if (!req.params.id) {
    res.json({ status: "failure", message: "Failed to update" });
  } else {
    var sql_query = "UPDATE `customer` SET ? WHERE customer_id= ?";
    connection.query(sql_query, [req.body, req.params.id], function (err, results, fields) {
      if (err) {
        res.json({ status: "Failure", message: "Unable to Update customer Status details" });

      } else {
        res.json({
          status: "Success",
          message: "Successfully Updated customer Status details",
          data: results
        });
      }
    });
  }

}

