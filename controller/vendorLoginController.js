const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const nodemailer = require('nodemailer');
var otpGenerator = require('otp-generator');
const { connection } = require('../db/db');
const fileURL = 'http://dev.dxminds.online:6500/vendor_profile_images/';
var CryptoJS = require("crypto-js");
const path = require('path');

//send otp for customer while registering

exports.fetch_register_data_vendor = (req, res, next) => {
  // console.log("data",req)
  // let data = req.body;

  const data = JSON.parse(req.body.data)
  console.log(data);
 // bcrypt.hash(data.password, saltRounds, function (err, pwd_hash) {

    console.log("data", data)
    const otp = otpGenerator.generate(6, { alphabets: false, upperCase: false, specialChars: false, });
    // otps = JSON.parse(otp);
    console.log("otps", otp)
    console.log("email", otp)
    let review_data = [[
      otp,
      data.mob_no
    ]];
    console.log("email", review_data)
    console.log("mob_no", data.mob_no)

    var sql_query = "select * from otp_check where email_mob= ?";
    connection.query(sql_query, data.mob_no, function (err, results) {
      if (!results || !results.length == 0) {
        res.json({ statuscode: 401, status: "Failure", message: "Vendor already exist" });

      } else {
        console.log("res", results);

        var sql_query = "INSERT INTO otp_check (otp,email_mob) values ?";
        connection.query(sql_query, [review_data], function (err, results) {

          console.log(err);
          if (err) {
            res.json({ status: "Failure", message: "Unable to Save" });

          } else {
            console.log("res", results);
            res.json({ status: "Success", message: "OTp sent Successfully" });

            console.log(results);
            // create reusable transporter object using the default SMTP transport
            let transporter = nodemailer.createTransport({
              host: "smtp.gmail.com",
              port: 587,
              secure: false, // true for 465, false for other ports
              auth: {
                user: 'amajjagi1997@gmail.com', // generated ethereal user
                pass: 'kuktevazmyjlnwaw'// generated ethereal password
              },
              tls: {
                rejectUnauthorized: false
              }
            });

            // send mail with defined transport object
            let mailOptions = {
              from: '"Multivendor " <amajjagi1997@gmail.com>', // sender address
              to: data.email, // list of receivers
              subject: "Registration OTP for Multivendor", // Subject line
              text: "Hi,Please find the OTP to enter.", // plain text body
              html: otp // html body
            };
            transporter.sendMail(mailOptions, (error, info) => {
              if (error) {
                console.log(error);
              }
            });

          }
        });
      }
    });
//});
}


//otp verification for customer while registering

exports.verify_customer_otp_vendor = (req, res, next) => {

  let data = req.body;
  let otp = req.body.otp;
  // console.log("vendor profile image", req.file.filename);
  console.log("res", data);
  console.log("res", otp);
  let otpcheck = data.otp.otp;
  console.log("res", otpcheck);

  // let otpcheck = JSON.parse(otp_val)
  // console.log("res", otpcheck);

  let mob_number = JSON.parse(data.mob_no)
  let account_no = JSON.stringify(data.account_no)

  let ifsc_code = JSON.stringify(data.ifsc_code)


  // bcrypt.hash(data.password, saltRounds, function (err, pwd_hash) {
  //   bcrypt.hash(data.mob_no, saltRounds, function (err, mob_hash) {
  //     bcrypt.hash(data.bank_name, saltRounds, function (err, bank_name_hash) {
  //       bcrypt.hash(data.branch_name, saltRounds, function (err, branch_name_hash) {
  //         bcrypt.hash(account_no, saltRounds, function (err, account_no_hash) {
  //           bcrypt.hash(ifsc_code, saltRounds, function (err, ifsc_code_hash) {


              let Mob_Four_Char = JSON.stringify(data.mob_no)
              var MobFirstFour = Mob_Four_Char.substring(1, 5);
              var VendorNameFirstFour = data.vendor_name.substring(0, 4);

              console.log(VendorNameFirstFour);
              console.log(MobFirstFour);
              const vendor_unique_id = VendorNameFirstFour.concat(MobFirstFour)
              console.log(vendor_unique_id);


              console.log("data", data)
              let datas = [[
                data.files,
                data.vendor_name,
                data.mob_no,
                data.outlet_name,
                data.outlet_tele_no,
                data.email,
                data.outlet_address,
                data.outlet_time,
                data.city,
                data.area_pincode,
                data.gst,
                data.category_outlet,
                data.bank_name,
                data.branch_name,
                data.account_no,
                data.ifsc_code,
                data.password,
                // data.password,
                vendor_unique_id,
                data.created_by
              ]];


              console.log(" otp ", datas);
              connection.query("select * from otp_check where email_mob= ?", [data.mob_no], (err, result) => {
                // if any error while executing above query, throw error
                if (result.length == 0 || err) {
                  res.json({ statuscode: 401, status: "Failure", message: "Vendor Doesn't exist" });
                }
                else {
                  console.log("ress", result)

                  console.log("ress", result[0].otp)
                  console.log("ress", otpcheck)

                  console.log("ress", result[0].otp == otpcheck)
                  if (result[0].otp != otpcheck) {
                    console.log("OTP does not match", result[0].otp == otpcheck)

                    res.json({
                      status: 'OTP does not match',
                      statuscode: 401
                    });
                  }
                  else {


                    console.log("ress", result[0])
                    console.log("data", mob_number)

                    var sql_query = "select * from vendor where mob_no= ?";
                    connection.query(sql_query, mob_number, function (err, resu) {


                      if (!resu.length == 0 || err) {
                        res.json({ statuscode: 401, status: "Failure", message: "Vendor already exist" });

                      } else {



                        var sql_query = "INSERT INTO vendor (vendor_image,vendor_name,mob_no,outlet_name,outlet_tele_no,email,outlet_address,outlet_time,city,area_pincode,gst,category_outlet,bank_name,branch_name,account_no,ifsc_code,password,vendor_unique_id,created_by) values ?";
                        connection.query(sql_query, [datas], function (err, results) {
                          console.log(err);
                          if (err) {
                            res.json({ statuscode: 401, status: "Failure", message: "Unable to Save" });

                          } else {
                            console.log(results);
                            res.json({
                              statuscode: 200,
                              status: "Success",
                              message: "Vendor Registerred Successfully",
                              // data: results
                            });
                          }
                        });
                      }

                    })
                  }
                }
              });
  //           });
  //         });
  //       });
  //     });
  //   });
  // });
}



//vendor login
exports.vendor_login = (req, res, next) => {

  let username = req.body.username;
  let password = req.body.password;
  console.log(username);
  console.log(password);
  connection.query("select * from vendor where email=? ", [username], (err, results) => {
    console.log("dsadasdasD",results);

    if (results.length == 0 || err) {
      console.log('username does not exist');

      let response = {
        status: 'username does not exist',
        statuscode: 400,
        response: [{
          token: null,
          vendor_id: null,
          username: null
        }]
      };
      response = JSON.stringify(response);
      // console.log("response",response)
      res.send(response);
    }
    else {
      //bcrypt.compare(password, results[0].password, function (err, resp) {
        if (password == results[0].password) {
          // Passwords match
          console.log(results[0].vendor_id);

          console.log(password);
          console.log(results[0].password);

          let payload = { subject: results[0].vendor_id }

          let token = jwt.sign(payload, 'sec#$retkey@$%');
          let response = {
            status: 'success',
            statuscode: 200,
            response: [{
              token: token,
              vendor_id: results[0].vendor_id,
              username: results[0].email,
              // college_id:results[0].college_id,
            }]
          };
          response = JSON.stringify(response);
          res.send(response)
        } else {
          console.log('username and password does not match');
          let response = {
            status: 'username and password does not match',
            statuscode: 401,
            response: [{
              token: null,
              vendor_id: null,
              username: null,
              // college_id:null,
            }]
          };
          response = JSON.stringify(response);
          // console.log("response",response)
          res.send(response);
          // Passwords don't match
        }
     // });

    }
  });
}


//forgot password

exports.vendor_forgot_passwrod = (req, res, next) => {

  let user_name = req.body.username;
  // console.log("-------data----");
  console.log(user_name);
  const otp = otpGenerator.generate(6, { alphabets: false, upperCase: false, specialChars: false, });
  console.log("sent otp", otp);
  connection.query("select * from vendor where email= ?", [user_name], (err, result) => {
    // if any error while executing above query, throw error
    if (result.length == 0 || err) {
      console.log('UserName does not exist');
      let response = {
        status: 'UserName does not exist',
        statuscode: 401
      };
      response = JSON.stringify(response);
      // console.log("response",response)
      res.send(response);
    }
    else {


      console.log("send otp using mob number");
      /////////////////////////////////////
      // create reusable transporter object using the default SMTP transport
      let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: 'amajjagi1997@gmail.com', // generated ethereal user
          pass: 'kuktevazmyjlnwaw'// generated ethereal password
        },
        tls: {
          rejectUnauthorized: false
        }
      });

      // send mail with defined transport object
      let mailOptions = {
        from: '"Multivendor " <amajjagi1997@gmail.com>', // sender address
        to: user_name, // list of receivers
        subject: "Reset Password OTP", // Subject line
        text: "Hi,Please find the OTP to enter.", // plain text body
        html: otp // html body
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
        }
        //////////////////////////////////

        // console.log("Message sent: %s", info.messageId);
        // // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

        // // Preview only available when sending through an Ethereal account
        // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        // // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
      });

      console.log("data inserted", result[0].vendor_id);
      // console.log(otp);
      var sql_query = "UPDATE `vendor` SET otp = ? WHERE vendor_id= ?";
      connection.query(sql_query, [otp, result[0].vendor_id], function (err, results, fields) {
        // console.log(results);
        // if any error while executing above query, throw error
        if (err) throw err;
        else {
          let response = {
            status: 'success',
            statuscode: 200
          };
          response = JSON.stringify(response);
          res.send(response)

        }
      });
    }
  });

}

//verify OTP

exports.vendor_verify_otp = (req, res, next) => {

  let otp = req.body.otp;
  console.log(otp);
  connection.query("select * from vendor where otp= ?", [otp], (err, result) => {
    // if any error while executing above query, throw error
    console.log("otp", result);

    if (result.length == 0 || err) {
      console.log('OTP does not match');
      let response = {
        status: 'OTP does not match',
        statuscode: 401
      };
      response = JSON.stringify(response);
      // console.log("response",response)
      res.send(response);
    }
    else {
      console.log(" otp is matched");
      let response = {
        status: 'success',
        statuscode: 200,
        response: {
          vendor_id: result[0].vendor_id
        }
      };
      response = JSON.stringify(response);
      res.send(response)

    }
  });

}

//verify password

exports.vendor_verify_password = (req, res, next) => {

  let password = req.body.newpassword;
  console.log("res", password);
  let vendor_id = req.body.id;
  console.log("res", vendor_id);

 // bcrypt.hash(password, saltRounds, function (err, hash) {
    console.log(password);

    var sql_query = "UPDATE `vendor` SET password = ? WHERE vendor_id= ?";
    connection.query(sql_query, [password, vendor_id], function (err, results, fields) {
      console.log(results);
      if (results.length == 0 || err) {
        console.log('Password Not Updated');
        let response = {
          status: 'Password Not Updated',
          statuscode: 401
        };
        response = JSON.stringify(response);
        // console.log("response",response)
        res.send(response);
      }
      else {
        console.log("Password Updated Successfully");
        let response = {
          status: 'Password Updated Successfully',
          statuscode: 200
        };
        response = JSON.stringify(response);
        res.send(response)

      }
    });
  //});

}

exports.change_vendor_password = (req, res, next) => {
  let old_pwd = req.body.old_pwd;
  let new_pwd = req.body.new_pwd;

  console.log("res", old_pwd)
  console.log("res", new_pwd);
  let vendor_id = req.body.vendor_id;
  console.log("res", vendor_id);

  connection.query("select * from vendor where vendor_id=? ", [vendor_id], (err, results) => {

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
     // bcrypt.hash(new_pwd, saltRounds, function (err, new_pwd_hash) {

       // bcrypt.compare(old_pwd, results[0].password, function (err, resp) {
          if (results[0].password == old_pwd) {

           // console.log(resp);

            var sql_query = "UPDATE `vendor` SET password = ? WHERE vendor_id= ?";
            connection.query(sql_query, [new_pwd, vendor_id], function (err, results, fields) {
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
        //});
     // });
    }
  });
}
//Update Data
exports.update_vendor_registration = (req, res, next) => {
  console.log("content");
  const data = JSON.parse(req.body.data)
  console.log("data", data);


  let mob_number = JSON.parse(data.mob_no)
  let account_no = JSON.stringify(data.account_no)

  let ifsc_code = JSON.stringify(data.ifsc_code)

  var pwd_hash = CryptoJS.AES.encrypt(data.password, 'multivendor@123').toString();
  var mob_hash = CryptoJS.AES.encrypt(data.mob_no, 'multivendor@123').toString();
  var bank_name_hash = CryptoJS.AES.encrypt(data.bank_name, 'multivendor@123').toString();
  var branch_name_hash = CryptoJS.AES.encrypt(data.branch_name, 'multivendor@123').toString();
  var account_no_hash = CryptoJS.AES.encrypt(account_no, 'multivendor@123').toString();
  var ifsc_code_hash = CryptoJS.AES.encrypt(ifsc_code, 'multivendor@123').toString();
  console.log(pwd_hash, mob_hash, bank_name_hash, branch_name_hash, account_no_hash, ifsc_code_hash);


  let Mob_Four_Char = JSON.stringify(data.mob_no)
  var MobFirstFour = Mob_Four_Char.substring(1, 5);
  var VendorNameFirstFour = data.vendor_name.substring(0, 4);

  console.log(VendorNameFirstFour);
  console.log(MobFirstFour);
  const vendor_unique_id = VendorNameFirstFour.concat(MobFirstFour)
  console.log(vendor_unique_id);
  var filename = path.parse(data.files).base;

  console.log("data", data)
  let datas = {
    vendor_image: filename,
    vendor_name: data.vendor_name,
    mob_no: mob_hash,
    outlet_name: data.outlet_name,
    outlet_tele_no: data.outlet_tele_no,
    email: data.email,

    outlet_address: data.outlet_address,
    outlet_time: data.outlet_time,
    city: data.city,
    area_pincode: data.area_pincode,
    gst: data.gst,
    category_outlet: data.category_outlet,
    bank_name: bank_name_hash,
    branch_name: branch_name_hash,
    account_no: account_no_hash,
    ifsc_code: ifsc_code_hash,
    password: pwd_hash,
    // data.password,
    vendor_unique_id: vendor_unique_id,
    created_by: data.created_by,
    status: '0'
  }

  //   console.log("data",[datas,req.body.vendor_id])

  console.log("data", datas)
  // console.log("res",pwd_hash);
  var sql_query = "UPDATE `vendor` SET ? WHERE vendor_id= ?";
  connection.query(sql_query, [datas, data.id], function (err, result, fields) {
    console.log("result", result);
    if (err) {
      res.json({ statuscode: "401", status: "Failure", message: "Unable to Update Vendor details" });
    } else {
      res.json({
        statuscode: "200",
        status: "Success",
        message: "Successfully Updated Vendor details",
      });
    }

  });
}





//change password



//vendor management
exports.fetch_vendor = (req, res, next) => {
  connection.query(`SELECT * FROM vendor`, function (err, result) {

    if (err) {
      res.json({
        statuscode: 401,
        status: "error",
        message: "Failed to fetch data"
      });
    }
    else {
      console.log('data fetched', result);
      res.json({
        statuscode: 200,
        status: "success",
        message: "vendor fetched Sucessfully",
        data: result,
        fileURL: fileURL

      });
    }
  });
}


exports.add_vendor = (req, res, next) => {

  let data = req.body;
  console.log("data", data)

  let mob_no = String(req.body.mob_no);
  let account_no = String(data.account_no);
  let ifsc_code = String(data.ifsc_code);

  var pwd_hash = CryptoJS.AES.encrypt(data.password, 'multivendor@123').tostring();
  var mob_no_hash = CryptoJS.AES.encrypt(mob_no, 'multivendor@123').tostring();
  var bank_name_hash = CryptoJS.AES.encrypt(data.bank_name, 'multivendor@123').tostring();
  var branch_name_hash = CryptoJS.AES.encrypt(data.branch_name, 'multivendor@123').tostring();
  var account_no_hash = CryptoJS.AES.encrypt(account_no, 'multivendor@123').tostring();
  var ifsc_code_hash = CryptoJS.AES.encrypt(ifsc_code, 'multivendor@123').tostring();

  console.log(pwd_hash, mob_no_hash, bank_name_hash, branch_name_hash, account_no_hash, ifsc_code_hash);



  // bcrypt.hash(data.password, saltRounds, function (err, pwd_hash) {
  // bcrypt.hash(mob_no, saltRounds, function (err, mob_no_hash) {
  // bcrypt.hash(data.bank_name, saltRounds, function (err, bank_name_hash) {
  // bcrypt.hash(data.branch_name, saltRounds, function (err, branch_name_hash) {
  // bcrypt.hash(account_no, saltRounds, function (err, account_no_hash) {
  // bcrypt.hash(ifsc_code, saltRounds, function (err, ifsc_code_hash) {
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
  console.log("data", datas)
  console.log("res", pwd_hash);
  var sql_query = "select * from vendor where email= ?";
  connection.query(sql_query, req.body.email, function (err, resu) {

    console.log("resu", resu);

    if (!resu.length == 0 || err) {
      console.log("res", resu.length == 0);

      res.json({
        statuscode: 401,
        status: "Vendor already exist"
      });

    } else {

      var sql_query = "INSERT INTO vendor (vendor_name,mob_no,outlet_name,outlet_tele_no,email,outlet_address,outlet_time,city,area_pincode,gst,category_outlet,bank_name,branch_name,account_no,ifsc_code,password) values ?";
      connection.query(sql_query, [datas], function (err, results) {
        console.log(err);
        if (err) {
          res.json({ status: "Failure", message: "Unable to Save" });

        } else {
          console.log(results);
          res.json({
            statuscode: 200,
            status: "Success",
            message: "Vendor added Successfully",
            // data: results
          });
        }

      });
    }
  });



}


//get vendor by id

exports.get_vendor = (req, res, next) => {
  console.log("vendor_id", req.params.vendor_id);

  let vendor_id = req.params.vendor_id;
  console.log("vendor_id", vendor_id);
  connection.query(`SELECT * FROM vendor where vendor_id = ${vendor_id} `, function (err, results) {
    if (err) {
      res.json({
        statuscode: 401,
        status: "error",
        message: "Failed to fetch data"
      });
    }
    else {
      console.log('data fetched', results);

      // var bytes1 = CryptoJS.AES.decrypt(results[0].password, 'multivendor@123').tostring(CryptoJS.enc.utf8);
      // var bytes2 = CryptoJS.AES.decrypt(results[0].mob_no, 'multivendor@123').tostring(CryptoJS.enc.utf8);



      // var bytes3 = CryptoJS.AES.decrypt(results[0].bank_name, 'multivendor@123').tostring(CryptoJS.enc.utf8);
      // console.log(bytes3);


      // var bytes4 = CryptoJS.AES.decrypt(results[0].branch_name, 'multivendor@123').tostring(CryptoJS.enc.utf8);
      // var bytes5 = CryptoJS.AES.decrypt(results[0].account_no, 'multivendor@123').tostring(CryptoJS.enc.utf8);
      // var bytes6 = CryptoJS.AES.decrypt(results[0].ifsc_code, 'multivendor@123').tostring(CryptoJS.enc.utf8);

      // var password = bytes1.toString(CryptoJS.enc.Utf8);
      // var mob_no = bytes2.toString(CryptoJS.enc.Utf8);
      // var bank_name = bytes3.toString(CryptoJS.enc.Utf8);
      // var branch_name = bytes4.toString(CryptoJS.enc.Utf8);
      // var account_no = bytes5.toString(CryptoJS.enc.Utf8);
      // var ifsc_code = bytes6.toString(CryptoJS.enc.Utf8);

    //  console.log(password, mob_no, bank_name, branch_name, account_no, ifsc_code);
      dataDecrypt = {
        "password": results[0].password,
        "mob_no": results[0].mob_no,
        "bank_name": results[0].bank_name,
        "branch_name": results[0].branch_name,
        "account_no": results[0].account_no,
        "ifsc_code": results[0].ifsc_code
      };
      console.log(dataDecrypt);




      res.json({
        statuscode: 200,
        status: "success",
        message: "vendor fetched Sucessfully",
        data: results,
        fileURL: fileURL,
        data1: dataDecrypt

      });
    }
  });
}


//Update Data
exports.update_vendor = (req, res, next) => {
  console.log("content");

  const data = JSON.parse(req.body.data)
  console.log("aaa", data);

  let vendor_image = path.basename(data.files)
  console.log("dgdsgfsdfs", path.basename(data.files))

  let mob_no = String(data.mob_no);
  let account_no = String(data.account_no);
  let ifsc_code = String(data.ifsc_code);

  // var pwd_hash = CryptoJS.AES.encrypt(data.password, 'multivendor@123').tostring();
  // var mob_no_hash = CryptoJS.AES.encrypt(mob_no, 'multivendor@123').tostring();
  // var bank_name_hash = CryptoJS.AES.encrypt(data.bank_name, 'multivendor@123').tostring();
  // var branch_name_hash = CryptoJS.AES.encrypt(data.branch_name, 'multivendor@123').tostring();
  // var account_no_hash = CryptoJS.AES.encrypt(account_no, 'multivendor@123').tostring();
  // var ifsc_code_hash = CryptoJS.AES.encrypt(ifsc_code, 'multivendor@123').tostring();

 // console.log(pwd_hash, mob_no_hash, bank_name_hash, branch_name_hash, account_no_hash, ifsc_code_hash);
  let datas = [
    vendor_image,
    data.vendor_name,
    mob_no,
    data.outlet_name,
    data.outlet_tele_no,
    data.email,
    data.outlet_address,
    data.outlet_time,
    data.city,
    data.area_pincode,
    data.gst,
    data.category_outlet,
    data.bank_name,
    data.branch_name,
    account_no,
    ifsc_code,
    data.password,
    data.id
  ];
  // console.log("data",[datas,req.body.vendor_id])

  console.log("data", datas)
  // console.log("res",pwd_hash);

  connection.query('UPDATE vendor SET vendor_image = ?,vendor_name = ?,mob_no = ?,outlet_name = ?,outlet_tele_no = ?,email = ?,outlet_address = ?,outlet_time = ?,city = ?,area_pincode = ?,gst = ?,category_outlet = ?,bank_name = ?,branch_name = ?,account_no = ?,ifsc_code = ?,password = ? WHERE vendor_id = ?', datas, (err, result) => {
    console.log("result", result);
    if (err) throw err;
    else {
      // res.send(result);
      res.json({
        statuscode: 200,
        status: "Success",
        message: "Vendor Updated Successfully",
        // data: results
      });
    }
  });


}


//Delete Data
exports.delete_vendor = (req, res, next) => {

  var vendor_id = req.body.vendor_id;
  console.log(vendor_id);
  var sql_query = "DELETE FROM `vendor` WHERE vendor_id= ?";
  connection.query(sql_query, [req.params.vendor_id], function (err, result) {

    if (err) throw err;
    else {
      console.log('data deleted', result);
      //res.send(result);
      res.json({
        statuscode: 200,
        status: "Success",
        message: "Vendor Deleted Successfully",
        // data: results
      });
    }

  });

}


// fetch_active_vendor_list
exports.fetch_active_vendor_list = (req, res, next) => {

  var sql_query = "Select vendor_id,vendor_name FROM vendor WHERE status= 1";
  console.log(sql_query);
  connection.query(sql_query, function (err, result) {
    if (err) {
      console.log(err)
      res.json({ status: "Failure", message: "Unable to Fetch Active Vendor Details" });
    } else {
      console.log(result)
      res.json({
        status: "Success",
        message: "SuccessFully Fetched Active Vendor Details.",
        data: result
      });
    }

  });

}


