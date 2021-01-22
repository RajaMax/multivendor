const { connection } = require('../db/db');

// ADd product in cart

exports.addToCart = (req, res, next) => {
    //console.log(req.body);
    let dt = req.body;


    let sql_query = `SELECT * FROM cart WHERE product_id='${dt.product_id}' and  customer_id='${dt.customer_id}' and product_option_id ='${dt.product_option_id}'`;

    console.log(sql_query);
    connection.query(sql_query, function (err, results, fields) {
        if (err) {
            console.log(err);
            res.json({ status: "Failure", message: "Unable to Fetch details" });
        } else {
            if (results && results.length > 0) {
                res.json({
                    status: "Failure",
                    message: "This Data Already Exist",
                });
            } else {
                let banner_data = [[
                    dt.customer_id,
                    dt.product_id,
                    dt.product_option_id,
                    dt.quantity,
                    dt.created_by,
                    '0',
                    dt.vendor_id,
                    dt.unit_id,
                    dt.sub_unit_id,
                    dt.unit_value_id,
                ]];               
                let sql_query = "INSERT INTO cart (customer_id,product_id, product_option_id,quantity,created_by,status,vendor_id,unit_id,sub_unit_id,unit_value_id) VALUES ?";
                connection.query(sql_query, [banner_data], function (err, results, fields) {
                    if (err) {
                        console.log(err);
                        res.json({ status: "Failure", message: "Unable to Save home cart details" });
                    } else {
                        console.log(results);
                        res.json({
                            status: "Success",
                            message: "Successfully saved product details",
                        });
                    }
                });
            }


        }
    });

}

exports.cartListForCustomer = (req, res, next) => {


    let sql_query = `select c.cart_id,c.product_option_id,c.quantity,c.customer_id,pd.product_name,pd.base_price,
    po.product_option_price,po.unit_value_id,po.sub_unit_id,um.unit_name,sum.sub_unit_name   
    product_ from cart c  
    join product_details pd on(c.product_id=pd.product_id)
    left join product_options po on(c.product_option_id=po.product_option_id)
    left join unit_value_master uvm on(po.unit_value_id = uvm.unit_value_id)
    left join unit_master um on(uvm.unit_id = um.unit_id)
    left join sub_unit_master sum on(po.sub_unit_id = sum.sub_unit_id)

    
    where c.customer_id = ${req.params.customer_id}`;
    connection.query(sql_query, (err, result, field) => {
        if (err) {
            console.log(err);
            res.json({ status: "Failure", message: "Unable to fatch details" });
        } else {
            res.json({
                statuscode: 200,
                status: "Success",
                message: "Cart List Get Successfully",
                data: result
            });
        }
    });
}

exports.update_cart_status_data_by_id = (req, res, next) => {
    if (!req.params.id) {
        res.json({ status: "failure", message: "Failed to update" });
    } else {
        var sql_query = "UPDATE `cart` SET ? WHERE cart_id= ?";
        connection.query(sql_query, [req.body, req.params.id], function (err, results, fields) {
            if (err) {
                res.json({ status: "Failure", message: "Unable to Update cart Status details" });

            } else {
                res.json({
                    status: "Success",
                    message: "Successfully Updated cart Status details",
                    data: results
                });
            }
        });
    }

}
// fetch_all_user_cart_list_admin_side_data

exports.fetch_all_user_cart_list_admin_side_data = (req, res, next) => {
    let sql_query = `
    SELECT
    COUNT(1) AS total_products,
    customer.customer_id,
    customer.first_name,
    customer.last_name,
    customer.mob_no
FROM
    cart where customer.status=0
JOIN customer ON customer.customer_id = cart.cart_id
GROUP BY
    cart.customer_id`;
    connection.query(sql_query, function (err, results, fields) {
        if (err) {
            res.json({ status: "Failure", message: "Unable to Fetch Admin side cart list details" });
        } else {
            // console.log(results);
            res.json({
                status: "Success",
                message: "Successfully Fetched Admin side cart list details",
                data: results
            });
        }
    });
}

// exports.cartListForCustomer = (req, res, next) => {
//     let sql_query = `select c.cart_id,c.product_option_id,c.quantity,c.customer_id,pd.product_name,pd.
//     po.product_option_price,po.unit_value_id,po.sub_unit_id,um.unit_name,sum.sub_unit_name   
//     product_ from cart c  
//     join product_details pd on(c.product_id=pd.product_id)
//     left join product_options po on(c.product_option_id=po.product_option_id)
//     left join unit_value_master uvm on(po.unit_value_id = uvm.unit_value_id)
//     left join unit_master um on(uvm.unit_id = um.unit_id)
//     left join sub_unit_master sum on(po.sub_unit_id = sum.sub_unit_id)

    
//     where c.customer_id = ${req.params.customer_id}`;
//     connection.query(sql_query, (err, result, field) => {
//         if (err) {
//             console.log(err);
//             res.json({ status: "Failure", message: "Unable to fatch details" });
//         } else {
//             res.json({
//                 statuscode: 200,
//                 status: "Success",
//                 message: "Cart List Get Successfully",
//                 data: result
//             });
//         }

//     });
// }

        // save_admin_side_customer_cart_details

        exports.save_admin_side_customer_cart_details = (req, res, next) => {

            let dt = req.body;
            console.log('req.body');
            console.log(dt);
            let prod = req.body.product_data

            let prod_data = [];
            for (let i = 0; i < prod.length; i++) {
                prod_data[i] = [dt.customer_id, prod[i].product_id, prod[i].unit_id, prod[i].sub_unit_id, prod[i].option_id, prod[i].unit_value_id, prod[i].product_qty, 1, 0];
            }
            let sql_query = "INSERT INTO cart (customer_id,product_id,unit_id,sub_unit_id,unit_value_id, product_option_id,quantity,created_by,status) VALUES ?";
            connection.query(sql_query, [prod_data], function (err, results, fields) {
                if (err) {
                    console.log(err);
                    res.json({ status: "Failure", message: "Unable to Save admin side cart details" });
                } else {
                    console.log(results);
                    res.json({
                        status: "Success",
                        message: "Successfully saved admin side cart details",
                    });
                }
            });
        }

        // check_user_cart_list_admin_side_data
        exports.check_user_cart_list_admin_side_data = (req, res, next) => {
            let sql_query = `SELECT * FROM cart WHERE customer_id=${req.params.id}`;
            connection.query(sql_query, function (err, results, fields) {
                if (err) {
                    res.json({ status: "Failure", message: "Unable to Fetch customer cart list details" });
                } else {
                    res.json({
                        status: "Success",
                        message: "Successfully Fetched customer cart list details",
                        data: results.length
                    });
                }
            });
        }

        // fetch_product_cart_list_admin_side_data_by_id
        exports.fetch_product_cart_list_admin_side_data_by_id = (req, res, next) => {
            let sql_query = `SELECT * FROM cart WHERE customer_id=${req.params.id}`;
            connection.query(sql_query, function (err, results, fields) {
                if (err) {
                    res.json({ status: "Failure", message: "Unable to Fetch customer cart list details" });
                } else {
                    res.json({
                        status: "Success",
                        message: "Successfully Fetched customer cart list details",
                        data: results
                    });
                }
            });
        }

        // delete_sub_product_cart_data_by_id
        exports.delete_sub_product_cart_data_by_id = (req, res, next) => {
            let sql_query = "DELETE FROM `cart` WHERE cart_id = ?";
            connection.query(sql_query, [req.params.id], function (err, results, fields) {
                if (err) {
                    res.json({ status: "Failure", message: "Unable to Delete sub Product cart details" });

                } else {
                    res.json({
                        status: "Success",
                        message: "Successfully Deleted sub Product cart details"
                    });
                }
            });
        }

        // update_admin_side_customer_cart_details
        exports.update_admin_side_customer_cart_details = (req, res, next) => {

            let dt = req.body;
            console.log('req.body');
            console.log(dt);
            let prod = req.body.product_data
            if (prod.length > 0) {
                prod.forEach(element => {
                    if (element.hidden_id) {
                        //Updating admin side cart Data
                        var updateOption = {
                            customer_id: dt.customer_id,
                            product_id: element.product_id,
                            unit_id: element.unit_id,
                            sub_unit_id: element.sub_unit_id,
                            unit_value_id: element.option_id,
                            product_option_id: element.unit_value_id,
                            product_qty: element.product_qty,
                        }
                        var update_query = "UPDATE `cart` SET ? WHERE cart_id = ?";
                        connection.query(update_query, [updateOption, element.hidden_id], function (err, results, fields) {
                            if (err) {
                                console.log(err);
                                res.json({ status: "Failure", message: "Unable to Update admin side cart product details" });
                            } else {
                                console.log(results);
                            }
                        });
                    } else {
                        let prod_data = [[
                            dt.customer_id,
                            element.product_id,
                            element.unit_id,
                            element.sub_unit_id,
                            element.option_id,
                            element.unit_value_id,
                            element.product_qty,
                            1, 0
                        ]];
                        let sql_query = "INSERT INTO cart (customer_id,product_id,unit_id,sub_unit_id,unit_value_id, product_option_id,quantity,created_by,status) VALUES ?";
                        connection.query(sql_query, [prod_data], function (err, results, fields) {
                            if (err) {
                                res.json({ status: "Failure", message: "Unable to Update admin side cart details" });
                            } else {
                                console.log(results);
                            }
                        });


                    }
                });
            }
        }

        // delete cart prduct
        exports.deleteCartProduct = (req, res, next) => {
            let sql_query = 'delete from cart where cart_id = ?';
            connection.query(sql_query, [req.params.id], (err, result, field) => {
                if (err) {
                    // return console.log(err);
                    res.json({ status: "Failure", message: "Unable to delete details" });
                } else {
                    res.json({
                        statuscode: 200,
                        status: "Success",
                        message: "Cart Product Delete Successfully",
                    });
                }
            });
        }

        //update cart product quantity by cart id
        exports.updateQuantity = (req, res, next) => {
            body_data = req.body;
            var data = {
                quantity: body_data.quantity
            }
            var sql_query = "UPDATE `cart` SET ? WHERE cart_id= ?";
            connection.query(sql_query, [data, body_data.cart_id], function (err, results, fields) {
                console.log(err);
                if (err) {
                    res.json({ status: "Failure", message: "Unable to Update details" });
                } else {
                    res.json({
                        status: "Success",
                        message: "Successfully Updated details",
                    });
                }
            });
        }
