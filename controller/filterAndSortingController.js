const { connection } = require('../db/db.js');
const fileURL = 'http://dev.dxminds.online:6500/product-images/';

//fetch all active list

exports.fetch_sorting_records = (req, res, next) => {
        console.log(req.body)
        if (!req.body) {
            res.json({ status: "failure", message: "Failed to Load Result" });
        }  else {

                var sql_query = 'SELECT * FROM vendor_product_details INNER JOIN product_details ON vendor_product_details.product_id = product_details.product_id';
             
                if (req.body.price_order) {
                    var price_order = req.body.price_order;
                    console.log("brand")
                    var str2 = ' ORDER BY base_price '+ price_order ;
                    var sql_query = sql_query.concat(str2);
                    
                    console.log(sql_query)
                }
                if (req.body.alphabetical_order == 'yes') {
                    var alphabetical_order = req.body.alphabetical_order;
                    console.log("alphabetical_order",alphabetical_order)     
                    var str3 = ' ORDER BY product_name';
                    var sql_query = sql_query.concat(str3);
                    
                    console.log(sql_query)
                }

                connection.query(sql_query, function (err, results, fields) {
                    if (err) {
                        console.log(err);
                        res.json({ status: "Failure", message: "Unable to Fetch details" });
                    } else {
                        console.log(results);
                        res.json({
                            status: "Success",
                            message: "Successfully Fetched details",
                            results:results,
                            product_image:fileURL + results[0].product_image

                        });
                    }
                });

    


}
    
    }
    


exports.fetch_filter_records = (req, res, next) => {
        console.log(req.body)
        if (!req.body) {
            res.json({ status: "failure", message: "Failed to Load Result" });
        } else {

                                    var sql_query = 'SELECT * FROM vendor_product_details INNER JOIN product_details ON vendor_product_details.product_id = product_details.product_id where';
                                 
                                    if (req.body.brand) {
                                        var brand = req.body.brand;
                                        console.log("brand")
                                        var str2 = ' brand_id IN '+'(' + brand + ')';
                                        var sql_query = sql_query.concat(str2);
                                        
                                        console.log(sql_query)
                                    }
                                    if (req.body.price.length > 0) {
                                        var price_start = req.body.price[0]
                                        var price_end = req.body.price[1] ?  req.body.price[1] : 10000;
                                        console.log("price_start",price_start)        
                                        console.log("price_end",price_end)  
                                        console.log("price")
                                        var str3 = ' AND base_price BETWEEN '+ price_start +' AND '+ price_end;
                                        var sql_query = sql_query.concat(str3);
                                        
                                        console.log(sql_query)
                                    }

                                    connection.query(sql_query, function (err, results, fields) {
                                        if (err) {
                                            console.log(err);
                                            res.json({ status: "Failure", message: "Unable to Fetch details" });
                                        } else {
                                            console.log(results);
                                            res.json({
                                                status: "Success",
                                                message: "Successfully Fetched details",
                                                results:results,
                                                product_image:fileURL + results[0].product_image

                                            });
                                        }
                                    });
    
                        
                   
         
        }
    
    }