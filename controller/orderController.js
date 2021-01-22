const { connection } = require('../db/db');




// Add oder using databes database cart 

exports.addOrder = (req, res, next) => {
  //console.log(req.body);
  let dt = req.body;
  var cart_query = `SELECT c.*, pd.base_price,ps.product_special_price,po.product_option_price FROM cart c
     LEFT JOIN product_specials ps on(c.product_id = ps.vendor_product_id)
     LEFT JOIN product_details pd on(c.product_id = pd.product_id)
     LEFT JOIN product_options po on(c.product_option_id = po.product_option_id)
    WHERE c.customer_id=${dt.customer_id}`;
  console.log(cart_query);
  connection.query(cart_query, function (err, cart_result, fields) {
    if (err) {
    //  console.log(err);
      res.json({ status: "Failure", message: "Unable to Fetch Cart details" });
    } else {
      //console.log(cart_result);
      if (cart_result.length < 1) {
        res.json({

          status: "Failure",
          message: "Your cart have no any product please add",

        });
      }

      var order_data = [[
        dt.customer_id,
        dt.firstname,
        dt.lastname,
        dt.email,
        dt.telephone,
        dt.payment_firstname,
        dt.payment_lastname,
        dt.payment_company,
        dt.payment_address,
        dt.payment_city,
        dt.payment_postcode,
        dt.payment_country,
        dt.payment_country_id,
        dt.payment_zone_id,
        dt.payment_method,
        dt.payment_code,
        dt.shipping_firstname,
        dt.shipping_lastname,
        dt.shipping_company,
        dt.shipping_address,
        dt.shipping_city,
        dt.shipping_postcode,
        dt.shipping_country,
        dt.shipping_country_id,
        dt.shipping_zone_id,
        dt.shipping_method,
        dt.shipping_code,
        dt.comment,
        dt.ip,
        dt.created_by,
        dt.delivery_charge,
      ]];
      //console.log(order_data);

      var delivery_charge = dt.delivery_charge;

      let sql_query = "INSERT INTO user_order (customer_id,firstname,lastname ,email,telephone,payment_firstname,payment_lastname,payment_company, payment_address,payment_city, payment_postcode,payment_country,payment_country_id,payment_zone_id,payment_method,payment_code,shipping_firstname,shipping_lastname,shipping_company,shipping_address,shipping_city,shipping_postcode,shipping_country,shipping_country_id,shipping_zone_id,shipping_method,shipping_code,comment,ip,created_by,delivery_charge)VALUES ?";
      connection.query(sql_query, [order_data], function (err, results, fields) {
        if (err) {
         // console.log(err);
          res.json({ status: "Failure", message: "Unable to Save order details" });
        } else {

          let order_id = results.insertId;
          //console.log(results);

          let cart_data = [];
          let product_option_price = 0;
          let base_price = 0;
          let product_special_price = 0;
          let price = 0;
          let product_total_price = 0;
          let total=0;


          for (let i = 0; i < cart_result.length; i++) {



            product_option_price = cart_result[i].product_option_price ? cart_result[i].product_option_price : 0;
            base_price = cart_result[i].base_price ? cart_result[i].base_price : 0;
            product_special_price = cart_result[i].product_special_price ? cart_result[i].product_special_price : 0;


           // console.log(product_option_price);
           // console.log(base_price);
            //console.log(product_special_price);

            if (product_special_price > 0) 
            {
              price = product_special_price + product_option_price;
              product_total_price = (product_special_price + product_option_price) * cart_result[i].quantity;

            } else {
              price = base_price + product_option_price;
              product_total_price = (base_price + product_option_price) * cart_result[i].quantity;

            }


//console.log(product_total_price);

total=total+product_total_price;

//console.log(total);

            cart_data[i] = [order_id,
              cart_result[i].customer_id,
              cart_result[i].product_id,
              cart_result[i].product_option_id,
              cart_result[i].quantity,
              price,
              product_total_price,
              cart_result[i].sub_unit_id,
              cart_result[i].unit_value_id,
              cart_result[i].unit_id,
              cart_result[i].vendor_id,

            ];






          }

        
          let sql_query = "INSERT INTO order_product (order_id,customer_id,product_id,product_option_id,quantity,price,total_price,sub_unit_id,unit_value_id,unit_id,vendor_id)VALUES ?";
          connection.query(sql_query, [cart_data], function (err, results, fields) {
            if (err) {
             // console.log(err);
              res.json({ status: "Failure", message: "Unable to Save  order product details" });
            } else {

              let cart_query = "DELETE FROM `cart` WHERE customer_id = ?";
              //[dt.customer_id]
              connection.query(cart_query, [2], function (err, results, fields) {
                if (err) {
                //  console.log(err);
                  res.json({ status: "Failure", message: "Unable to Delete cart Product details" });

                } else {



                  //console.log(total);

                  var data = {
                    total:total+delivery_charge,
                    sub_total:total,
                  }
                  var sql_query = "UPDATE `user_order` SET ? WHERE order_id= ?";
                  connection.query(sql_query, [data,order_id], function (err, results, fields) {
                   // console.log(err);
                    if (err) {
                      res.json({ status: "Failure", message: "Unable to Update total price" });
                    } else {
                      res.json({
                        status: "Success",
                        message: "Successfully saved order details",
                      });
                    }
                  });


                }

              });


            }
          });

        
          //console.log(cart_data);


        }
      });

    }
  });

}

//this api call after payment success or if cod than call ,here i am creting order with whatever details you give
exports.addOrderApiForMobile = (req, res, next) => 
{
  //console.log(req.body);
  let dt = req.body;

  let cart_result =dt.cart_products;

  if(cart_result.length <= 0)
  {
    res.json({ status: "Failure", message: "Unable to Save order details" });
  }

  let customer_id=dt.customer_id;

      var order_data = [[
        dt.customer_id,
        dt.firstname,
        dt.lastname,
        dt.email,
        dt.telephone,
        dt.payment_firstname,
        dt.payment_lastname,
        dt.payment_company,
        dt.payment_address,
        dt.payment_city,
        dt.payment_postcode,
        dt.payment_country,
        dt.payment_country_id,
        dt.payment_zone_id,
        dt.payment_method,
        dt.payment_code,
        dt.shipping_firstname,
        dt.shipping_lastname,
        dt.shipping_company,
        dt.shipping_address,
        dt.shipping_city,
        dt.shipping_postcode,
        dt.shipping_country,
        dt.shipping_country_id,
        dt.shipping_zone_id,
        dt.shipping_method,
        dt.shipping_code,
        dt.comment,
        dt.ip,
        dt.created_by,
        dt.total
      ]];
      //console.log(order_data);

      let sql_query = "INSERT INTO user_order (customer_id,firstname,lastname ,email,telephone,payment_firstname,payment_lastname,payment_company, payment_address,payment_city, payment_postcode,payment_country,payment_country_id,payment_zone_id,payment_method,payment_code,shipping_firstname,shipping_lastname,shipping_company,shipping_address,shipping_city,shipping_postcode,shipping_country,shipping_country_id,shipping_zone_id,shipping_method,shipping_code,comment,ip,created_by,total )VALUES ?";
      connection.query(sql_query, [order_data], function (err, results, fields) {
        if (err) {
          console.log(err);
          res.json({ status: "Failure", message: "Unable to Save order details" });
        } else {

          let order_id = results.insertId;
          let cart_data=[];
          //this order id use for add product in this order
          for (let i = 0; i < cart_result.length; i++) {

//console.log(total);
            cart_data[i] = [order_id,
                       customer_id,
              cart_result[i].product_id,
              cart_result[i].product_option_id,
              cart_result[i].quantity,
              cart_result[i].price,
              cart_result[i].product_total_price,
              cart_result[i].sub_unit_id,
              cart_result[i].unit_value_id,
              cart_result[i].unit_id,
            ];
          }       
          let sql_query = "INSERT INTO order_product (order_id,customer_id,product_id,product_option_id,quantity,price,total_price,sub_unit_id,unit_value_id,unit_id)VALUES ?";
          connection.query(sql_query, [cart_data], function (err, results, fields) {
            if (err) {
              console.log(err);
              res.json({ status: "Failure", message: "Unable to Save  order product details" });
            } else {
              //product added succesfully
              res.json({
                status: "Success",
                message: "Successfully saved order details",
              });
            }
          });//add order product query end
                  //console.log(cart_data);
        }
      });
    }




exports.OrderList = (req, res, next) => {
  let sql_query = "SELECT user_order.*, order_status_type.name as order_status FROM  user_order left join order_status_type ON(order_status_type.order_status_id=user_order.order_status_id) order by order_id DESC";
  connection.query(sql_query, async function (err, results, fields) {
    if (err) {
      console.log(err);
      res.json({ status: "Failure", message: "Unable to fatch order List" });
    } else {
      //console.log(results);

      let order_data = [];

      for (let i = 0; i < results.length; i++) {
        let order_id = results[i].order_id;

        order_data[i] = {
          order_id: order_id,
          order_name: results[i].order_name,
          customer_id: results[i].customer_id,
          firstname: results[i].firstname,
          lastname: results[i].lastname,
          email: results[i].email,
          telephone: results[i].telephone,
          payment_firstname: results[i].payment_firstname,
          payment_lastname: results[i].payment_lastname,
          payment_company: results[i].payment_company,
          payment_address: results[i].payment_address,
          payment_city: results[i].payment_city,
          payment_postcode: results[i].payment_postcode,
          payment_country: results[i].payment_country,
          payment_country_id: results[i].payment_country_id,
          payment_zone_id: results[i].payment_zone_id,
          payment_method: results[i].payment_method,
          payment_code: results[i].payment_code,
          shipping_firstname: results[i].shipping_firstname,
          shipping_lastname: results[i].shipping_lastname,
          shipping_company: results[i].shipping_company,
          shipping_address: results[i].shipping_address,
          shipping_city: results[i].shipping_city,
          shipping_postcode: results[i].shipping_postcode,
          shipping_country: results[i].shipping_country,
          shipping_country_id: results[i].shipping_country_id,
          shipping_zone_id: results[i].shipping_zone_id,
          shipping_method: results[i].shipping_method,
          shipping_code: results[i].shipping_code,
          comment: results[i].comment,
          ip: results[i].ip,
          created_by: results[i].created_by,
          total: results[i].total,
          order_status_id: results[i].order_status_id,
          order_status: results[i].order_status,
          created_at: results[i].created_at,
          updated_at: results[i].updated_at
        };

      } // for loop
      //console.log(order_data);
      res.json({
        status: "Success",
        message: "Order List Get Successfully",
        data: order_data,
      });

    }//else 


  }); // function

} // 

//order Details by Order id

exports.OrderDetailsByOrderId = (req, res, next) => {
  let sql_query = `SELECT user_order.*, order_status_type.name as order_status FROM  user_order left join order_status_type ON(order_status_type.order_status_id=user_order.order_status_id) where user_order.order_id=${req.params.id} order by order_id DESC`;
  connection.query(sql_query, async function (err, results, fields) {
    if (err) {
      console.log(err);
      res.json({ status: "Failure", message: "Unable to fatch order List" });
    } else {
      //console.log(results);

      let order_details = [];
      let payment_details = [];
      let shipping_details = [];
      
      for (let i = 0; i < results.length; i++) {
        let order_id = results[i].order_id;

        order_details[i] = {
          order_id: order_id,
          order_name: results[i].order_name,
          customer_id: results[i].customer_id,
          firstname: results[i].firstname,
          lastname: results[i].lastname,
          email: results[i].email,
          telephone: results[i].telephone,
          comment: results[i].comment,
          ip: results[i].ip,
          created_by: results[i].created_by,
          total: results[i].total,
          sub_total: results[i].sub_total,
          delivery_charge: results[i].delivery_charge,
          order_status_id: results[i].order_status_id,
          order_status: results[i].order_status,
          created_at: results[i].created_at,
          updated_at: results[i].updated_at
        };

        payment_details[i] = {
          payment_firstname: results[i].payment_firstname,
          payment_lastname: results[i].payment_lastname,
          payment_company: results[i].payment_company,
          payment_address: results[i].payment_address,
          payment_city: results[i].payment_city,
          payment_postcode: results[i].payment_postcode,
          payment_country: results[i].payment_country,
          payment_country_id: results[i].payment_country_id,
          payment_zone_id: results[i].payment_zone_id,
          payment_method: results[i].payment_method,
          payment_code: results[i].payment_code,
        };

          shipping_details[i] = {
          shipping_firstname: results[i].shipping_firstname,
          shipping_lastname: results[i].shipping_lastname,
          shipping_company: results[i].shipping_company,
          shipping_address: results[i].shipping_address,
          shipping_city: results[i].shipping_city,
          shipping_postcode: results[i].shipping_postcode,
          shipping_country: results[i].shipping_country,
          shipping_country_id: results[i].shipping_country_id,
          shipping_zone_id: results[i].shipping_zone_id,
          shipping_method: results[i].shipping_method,
          shipping_code: results[i].shipping_code,
          };

         

      } // for loop
      //console.log(order_data);

//producr list array
let sql_query = `SELECT * FROM  order_product left join product_details ON(product_details.product_id =order_product.product_id) where order_id  = ${req.params.id}`;
connection.query(sql_query, async function (err, product_details, fields) {
  if (err) {
    console.log(err);
    res.json({ status: "Failure", message: "Unable to fatch order product List" });
  } else {
    //console.log(product_details);
    res.json({
      status: "Success",
      message: "Order product details get successfully",
      order_details: order_details,
      shipping_details : shipping_details,
      payment_details : payment_details,
      product_details: product_details,
    });

  }

});

    }//else 


  }); // function

} // 






// Payment method List
exports.PaymentMethodList = (req, res,next) => {

let sql_query = "select * from payment_method where status=1";
  connection.query(sql_query,(err,result,field)=>{
    if(err){
      res.json({ status: "Failure", message: "Unable to fatch Payment List" });
    }else{
    res.json({
      statuscode:200,
      status: "Success",
      message: "Payment Method List  Get Successfully",
     data: result
  });
}
  });
}






exports.OrderProductList = (req, res, next) => {
  let sql_query = "SELECT * FROM  order_product left join product_details ON(product_details.product_id =order_product.product_id) where order_id  = ?";
  connection.query(sql_query, [req.params.id], async function (err, results, fields) {
    if (err) {
      console.log(err);
      res.json({ status: "Failure", message: "Unable to fatch order product List" });
    } else {
      //console.log(results);
      res.json({
        status: "Success",
        message: "Order product details get successfully",
        data: results,
      });


    }

  });
}


exports.customerOrderList = (req, res, next) => {

  let sql_query = "SELECT user_order.*, order_status_type.name as order_status  FROM  user_order left join order_status_type ON(order_status_type.order_status_id=user_order.order_status_id)  order by order_id DESC";
  connection.query(sql_query, async function (err, results, fields) {
    if (err) {
      console.log(err);
      res.json({ status: "Failure", message: "Unable to fatch order List" });
    } else {
      //console.log(results);

      let order_data = [];

      for (let i = 0; i < results.length; i++) {
        let order_id = results[i].order_id;

        order_data[i] = {
          order_id: order_id,
          order_name: results[i].order_name,
          customer_id: results[i].customer_id,
          firstname: results[i].firstname,
          lastname: results[i].lastname,
          email: results[i].email,
          telephone: results[i].telephone,
          payment_firstname: results[i].payment_firstname,
          payment_lastname: results[i].payment_lastname,
          payment_company: results[i].payment_company,
          payment_address: results[i].payment_address,
          payment_city: results[i].payment_city,
          payment_postcode: results[i].payment_postcode,
          payment_country: results[i].payment_country,
          payment_country_id: results[i].payment_country_id,
          payment_zone_id: results[i].payment_zone_id,
          payment_method: results[i].payment_method,
          payment_code: results[i].payment_code,
          shipping_firstname: results[i].shipping_firstname,
          shipping_lastname: results[i].shipping_lastname,
          shipping_company: results[i].shipping_company,
          shipping_address: results[i].shipping_address,
          shipping_city: results[i].shipping_city,
          shipping_postcode: results[i].shipping_postcode,
          shipping_country: results[i].shipping_country,
          shipping_country_id: results[i].shipping_country_id,
          shipping_zone_id: results[i].shipping_zone_id,
          shipping_method: results[i].shipping_method,
          shipping_code: results[i].shipping_code,
          comment: results[i].comment,
          ip: results[i].ip,
          created_by: results[i].created_by,
          order_status_id:  results[i].order_status_id,
          order_status:  results[i].order_status,
          total:  results[i].total,
          sub_total:  results[i].sub_total,
          delivery_charge:  results[i].delivery_charge,
        };

      } // for loop
      //console.log(order_data);
      res.json({
        status: "Success",
        message: "Order Details Successfully",
        data: order_data,
      });

    }//else 


  }); // function

} // 


exports.deleteOrder = (req, res, next) => {
  let sql_query = "delete from user_order where order_id = ?";
  connection.query(sql_query, [req.params.id], (err, result, field) => {
    if (err) {
      return console.log(err);
      res.json({
        status: "Failure",
        message: "Unable to delete Order",
      });
    } else {
      res.json({

        status: "Success",
        message: "Order Delete Successfully",
      });
    }
  });
}


exports.updateOrderShippingStatus = (req, res, next) => {
  body_data = req.body;
  var data = {
    order_status_id: body_data.status
  }
  var sql_query = "UPDATE `user_order` SET ? WHERE order_id= ?";
  connection.query(sql_query, [data, body_data.order_id], function (err, results, fields) {
    console.log(err);
    if (err) {
      res.json({ status: "Failure", message: "Unable to Update Status" });
    } else {

      var data_history = [[
        body_data.order_id,
        body_data.status,
       body_data.updated_by

      ]];

      let sql_query = "INSERT INTO order_status_history (order_id,order_status_id,updated_by)VALUES ?";
      connection.query(sql_query, [data_history], function (err, results, fields) {
        if (err) {
          console.log(err);
          res.json({ status: "Failure", message: "Unable to Save  order history details" });
        } else {

          res.json({
            status: "Success",
            message: "Successfully Updated Status",
          });

        }
      });


      

     
    }
  });
}

//order history list
exports.orderStatusHistoryList = (req, res, next) => {
  sql_query="select oh.created_at,oh.updated_by,oh.order_id,oh.order_status_id,ot.name from order_status_history oh join order_status_type ot ON(oh.order_status_id=ot.order_status_id) where oh.order_id=?";

  connection.query(sql_query, [req.params.order_id],(err, result, field) => {
    if (err) {
      // return console.log(err);
      res.json({ status: "Failure", message: "Unable to fatch Status" });
    } else {
      res.json({
        statuscode: 200,
        status: "Success",
        message: "Order Status List Get Successfully",
        data: result
      });
    }
  });
}



//This is for listing
exports.orderStatusList = (req, res, next) => {

  connection.query('select * from order_status_type', (err, result, field) => {
    if (err) {
      // return console.log(err);
      res.json({ status: "Failure", message: "Unable to fatch Status" });
    } else {
      res.json({
        statuscode: 200,
        status: "Success",
        message: "Order Status List Get Successfully",
        data: result
      });
    }
  });
}


//Add prder status
exports.AddorderStatus = (req, res, next) => {

  let dt = req.body;

  var status_stails = [[
    dt.status_name,
    dt.created_by]];
  sql_query = "INSERT INTO order_status_type (name,created_by) VALUES ?";
  connection.query(sql_query, [status_stails], function (err, result) {
    if (err) {
      //return console.log(err);
      res.json({ status: "Failure", message: "Unable to Save status details" });
    }
    else {
      res.json({
        statuscode: 200,
        status: "Success",
        message: "Status inserted Successfully",
        data: result.insertId
      });

    }
  });

}

exports.addReturnReason = (req, res, next) => {

  let dt = req.body;

  var status_stails = [[
    dt.name,
    dt.created_by]];
  sql_query = "INSERT INTO return_reason (name,created_by) VALUES ?";
  connection.query(sql_query, [status_stails], function (err, result) {
    if (err) {
      //return console.log(err);
      res.json({ status: "Failure", message: "Unable to Save Return Reason" });
    }
    else {
      res.json({
        statuscode: 200,
        status: "Success",
        message: "Return Reason inserted Successfully",
        data: result.insertId
      });

    }
  });

}


exports.UpdateOrderTypeStatus = (req, res, next) => {
  body_data = req.body;
  var data = {
    status: body_data.status
  }
  var sql_query = "UPDATE `order_status_type` SET ? WHERE order_status_id= ?";
  connection.query(sql_query, [data, body_data.id], function (err, results, fields) {
    console.log(err);
    if (err) {
      res.json({ status: "Failure", message: "Unable to Update Status" });
    } else {
      res.json({
        status: "Success",
        message: "Successfully Updated Status",
      });
    }
  });
}



exports.UpdateOrderStatusTypeName = (req, res, next) => {
  body_data = req.body;
  var data = {
    name: body_data.name
  }
  var sql_query = "UPDATE `order_status_type` SET ? WHERE order_status_id= ?";
  connection.query(sql_query, [data, body_data.id], function (err, results, fields) {
    console.log(err);
    if (err) {
      res.json({ status: "Failure", message: "Unable to Update name" });
    } else {
      res.json({
        status: "Success",
        message: "Successfully Updated Name",
      });
    }
  });
}


// row delete by id
exports.OrderStatusTypeDelete = (req, res, next) => {
  connection.query('delete from order_status_type where order_status_id = ?', [req.params.id], (err, result, field) => {
    if (err) {
      //return console.log(err);
      res.json({ status: "Failure", message: "Unable to delete. " });

    } else {
      res.json({
        statuscode: 200,
        status: "Success",
        message: "Order status Delete Successfully",
      });
    }
  });
}



//Add return request by customer

exports.OrderReturnRequest = (req, res, next) => {
  //console.log(req.body);
  let dt = req.body;
  var sql_query = `SELECT * FROM product_return WHERE order_id=${dt.order_id}`;
  //console.log(sql_query);
  connection.query(sql_query, function (err, result, fields) {
    if (err) {
      console.log(err);
      res.json({ status: "Failure", message: "Unable to Save Return Request" });
    } else {

      var order_product_data = [[
        dt.order_id,
        dt.customer_id,
        dt.firstname,
        dt.lastname,
        dt.email,
        dt.telephone,
        dt.product_id,
        dt.product_name,
        dt.model,
        dt.date_added,
        dt.quantity,
        dt.return_status_id,
        dt.return_reason_id,
        dt.opened,
        dt.comment,
      ]];
      //console.log(order_data);

      let sql_query = "INSERT INTO product_return (order_id,customer_id,firstname,lastname ,email,telephone,product_id,product_name,model, date_ordered,quantity, return_status_id,return_reason_id,opened,comment)VALUES ?";
      connection.query(sql_query, [order_product_data], function (err, results, fields) {
        if (err) {
          console.log(err);
          res.json({ status: "Failure", message: "Unable to Save Return Request" });
        } else {

          res.json({
            status: "Success",
            message: "Successfully saved order details",
          });
        }


      });


    }
  });

}

exports.updateReturnRequestStatus = (req, res, next) => {
  body_data = req.body;
  var data = {
    return_status_id: body_data.return_status_id
  }
  var sql_query = "UPDATE `product_return` SET ? WHERE return_id= ?";
  connection.query(sql_query, [data, body_data.return_id], function (err, results, fields) {
    console.log(err);
    if (err) {
      res.json({ status: "Failure", message: "Unable to Update Status" });
    } else {
      res.json({
        status: "Success",
        message: "Successfully Updated Status",
      });
    }
  });
}


exports.ReturnProductList = (req, res, next) => {
  let sql_query = "SELECT * FROM  product_return";
  connection.query(sql_query, async function (err, results, fields) {
    if (err) {
      console.log(err);
      res.json({ status: "Failure", message: "Unable to fatch return product List" });
    } else {
      //console.log(results);
      res.json({
        status: "Success",
        message: "Successfully Fatch Return Product List",
        data: results,
      });


    }

  });
}


exports.returnReasonList = (req, res, next) => {
  let sql_query = "SELECT * FROM  return_reason";
  connection.query(sql_query, async function (err, results, fields) {
    if (err) {
      console.log(err);
      res.json({ status: "Failure", message: "Unable to fatch return Reason List" });
    } else {
      //console.log(results);
      res.json({
        status: "Success",
        message: "Successfully Fatch Return Reason List",
        data: results,
      });


    }

  });
}


exports.ReturnProductListForCustomer = (req, res, next) => {
  let sql_query = "SELECT pr.*, rr.name as return_reason_name FROM  product_return pr left join  return_reason rr on(pr.return_reason_id=rr.return_reason_id) where customer_id  = ?";
  connection.query(sql_query, [req.params.id], async function (err, results, fields) {
    if (err) {
      console.log(err);
      res.json({ status: "Failure", message: "Unable to fatch order return List" });
    } else {
      //console.log(results);
      res.json({
        status: "Success",
        message: "Return product list get successfully",
        data: results,
      });


    }

  });
}


// row delete by id
exports.productRrturnDelete = (req, res, next) => {
  connection.query('delete from product_return where return_id = ?', [req.params.id], (err, result, field) => {
    if (err) {
      //return console.log(err);
      res.json({ status: "Failure", message: "Unable to delete. " });

    } else {
      res.json({
        statuscode: 200,
        status: "Success",
        message: "return status Delete Successfully",
      });
    }
  });
}

exports.update_order_status_data_by_id = (req, res, next) => {
  if (!req.params.id) {
      res.json({ status: "failure", message: "Failed to update" });
  } else {
      var sql_query = "UPDATE `user_order` SET ? WHERE order_id= ?";
      connection.query(sql_query, [req.body, req.params.id], function (err, results, fields) {
          if (err) {
              res.json({ status: "Failure", message: "Unable to Update order Status details" });

          } else {
              res.json({
                  status: "Success",
                  message: "Successfully Updated order Status details",
                  data: results
              });
          }
      });
  }

}


