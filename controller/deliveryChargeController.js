const { connection } = require('../db/db.js');



exports.fetch_all_delivery_charge_data = (req, res, next) => {
    let sql_query = "SELECT * FROM  delivery_charge";
    connection.query(sql_query, function (err, results, fields) {
        if (err) {
            res.json({ status: "Failure", message: "Unable to Fetch delivery charge management details" });
        } else {
            console.log(results);
            let sql_query_child = "SELECT * FROM  delivery_charge_child";
            connection.query(sql_query_child, function (err, result, fields) {
            if (err) {
            res.json({ status: "Failure", message: "Unable to Fetch delivery charge management child details" });
            } else {
            res.json({
                status: "Success",
                message: "Successfully Fetch color details",
                data: results,
                data1: result

            });
        }
    });
}
    });
}


// Save Data
exports.fetch_save_delivery_charge_data = (req, res, next) => {
    dt = req.body;
    console.log("aaaaaaaaaaaaaaaaaa",dt)
    var value = [[
        dt.vendor_id,
        dt.category_id,
        dt.created_by,
        '0'
    ]];

        console.log("value",value)
       

    let sql_query = "INSERT INTO delivery_charge (`vendor_id`,`category_id`,`created_by`,`status`) VALUES ?";

    connection.query(sql_query, [value] , function (err, results, fields) {
        if (err) {
            console.log(err);
            res.json({ status: "Failure", message: "Unable to save  delivery charge management details" });
        } else {

            console.log(results);
            console.log(results.insertId);

            let insertId = results.insertId;
            if (insertId) {
                console.log("sssssssssssssss");
                //related product 
                let deliver_charge_list = dt.deliver_charge_list;
                console.log("gggggggggg", dt.deliver_charge_list);

                if (deliver_charge_list.length > 0) {
                    let delivery_charge_data = [];
                    for (let i = 0; i < deliver_charge_list.length; i++) {
                        delivery_charge_data[i] = [insertId,
                        deliver_charge_list[i].from_quantity,
                        deliver_charge_list[i].to_quantity,
                        deliver_charge_list[i].from_kilometer,
                        deliver_charge_list[i].to_kilometer,
                        deliver_charge_list[i].from_product_weight,
                        deliver_charge_list[i].to_product_weight,
                        deliver_charge_list[i].delivery_charge_amount, dt.created_by, 1];
                        console.log("gggggggggg", delivery_charge_data[i] );

                    }
          

              
                let sql_query_child = "INSERT INTO delivery_charge_child (`delivery_charge_id`,`from_quantity`,`to_quantity`,`from_kilometer`,`to_kilometer`,`from_product_weight`,`to_product_weight`,`delivery_charge_amount`,`created_by`, `status`) VALUES ?";
                connection.query(sql_query_child, [delivery_charge_data] , function (err, results, fields) {
                    if (err) {
                        res.json({statuscode:401, status: "Failure", message: "Unable to Save delivery charge management details" });
                    } else {
                        console.log(results);
                        res.json({
                            statuscode:200,
                            status: "Success",
                            message: "Successfully added delivery charge management details",
                        });
                    }
                });
            }
            }
        }

        });

}
//Fetch Data By id
exports.fetch_delivery_charge_data_by_id = (req, res, next) => {
        if (!req.params.id) {
                res.json({ status: "failure", message: "Failed to update" });
            } else {
    let sql_query = "SELECT * FROM delivery_charge WHERE delivery_charge_id =" + req.params.id;

    connection.query(sql_query,async function (err, results, fields) {
        if (err) {
            res.json({ status: "Failure", message: "Unable to Fetch delivery charge management details" });
        } else {
                var delivery_data = '';
                if (results.length > 0) {
                        //Fecthing child Data
                        await getDeliveryChargeChildData(req.params.id).then((data) => {
                                delivery_data = data;
                            console.log('=======================delivery charge management data===================');
                            console.log(delivery_data);
                        });
                }
            res.json({
                status: "Success",
                message: "Successfully Fetched delivery charge management details",
                data: results,
                delivery_data:delivery_data

            });
       
    }

});
}
}


function getDeliveryChargeChildData(id) {

        return new Promise((resolve, reject) => {
            let query = `SELECT * FROM delivery_charge_child WHERE delivery_charge_id = ${id} ORDER BY delivery_charge_child_id `;
            connection.query(query, function (err, results, fields) {
                if (err) return reject(err);
                console.log('results');
                console.log(results);
                resolve(results);
            });
        });
    }


//Update 
exports.update_delivery_charge_data_by_id = (req, res, next) => {
        dt = req.body;
        if (!dt) {
                res.json({ status: "failure", message: "Failed to update" });
            }
            else{

        console.log("aaaaaaaaaaaaaaaaaa",req.body)
        var value = {
                vendor_id: dt.vendor_id,
                category_id:dt.category_id,
                created_by:dt.created_by,
            status:'0'
        }
    
            console.log("value",value)
           
            
        let sql_query = "UPDATE `delivery_charge` SET ? WHERE delivery_charge_id= ?";
    
        connection.query(sql_query, [value, dt.id] , function (err, results, fields) {
            console.log(err);
            if (err) {   
                res.json({ status: "Failure", message: "Unable to update delivery charge management details" });
            } else {

                let insertId = dt.id;
                if (insertId) {
                    console.log("delivery charge management",results)
                    let deliver_charge_list = dt.deliver_charge_list;
    
                    if (deliver_charge_list.length > 0) {
                        deliver_charge_list.forEach(element => {
                                if (element.hidden_id) {
                                    //Updating Data

                                    var updateOption = {
                                        
                                        delivery_charge_id: dt.id,
                                        from_quantity: element.from_quantity,
                                        to_quantity: element.to_quantity,
                                        from_kilometer: element.from_kilometer,
                                        to_kilometer: element.to_kilometer,
                                        from_product_weight: element.from_product_weight,
                                        to_product_weight: element.to_product_weight,
                                        delivery_charge_amount: element.delivery_charge_amount,
                                        created_by: dt.created_by,
                                        status: '0'
                                    }
                                    var update_delivery = "UPDATE `delivery_charge_child` SET ? WHERE delivery_charge_child_id = ?";
                                    connection.query(update_delivery, [updateOption, element.hidden_id], function (err, results, fields) {
                                        if (err) {
                                            console.log(err);
                                            res.json({ status: "Failure", message: "Unable to Update delivery charge management details" });
                                        } else {
                                            console.log(results);
                                        }
                                    });
    
                                }
                            });
                }
            }

        }
    
            });
        }
}
//Delete Data By id
exports.delete_delivery_charge_data_by_id = (req, res,next) => {
        connection.query('delete from delivery_charge where delivery_charge_id = ?',[req.params.id],(err,result,field)=>{
          if(err){
                res.json({ status: "Failure", message: "Unable to delete delivery charge management details" });
          }else{
      
            connection.query('delete from delivery_charge_child where delivery_charge_id = ?',[req.params.id],(err,result,field)=>{
              if(err){
                res.json({ status: "Failure", message: "Unable to delete delivery charge management details" });
              }
            else{
      
          res.json({
            statuscode:200,
            status: "Success",
            message: "delivery charge management Delete Successfully",
        });
        }
      });
          }
        });
        
      
      
      }
      
//fetch all active list

exports.fetch_all_active_delivery_charge_data = (req, res, next) => {
        let sql_query = "Select * from delivery_charge p, delivery_charge_child a where  (p.delivery_charge_id = a.delivery_charge_id AND (p.status=1 AND a.status=1))";
        connection.query(sql_query, function (err, results, fields) {
            if (err || results.length === 0) {
                res.json({ status: "Failure", message: "Unable to Fetch active delivery charge management details" });
            } else {
                
                console.log(results);
                res.json({
                    status: "Success",
                    message: "Successfully Fetch active delivery charge management details",
                    data: results
                });
            }
        });
      }


      //Delete delivery charge Data by Id
exports.delete_delivery_charge_data = (req, res, next) => {
    let sql_query = "DELETE FROM `delivery_charge_child` WHERE delivery_charge_child_id = ?";

    connection.query(sql_query, [req.params.id], function (err, results, fields) {
        if (err) {
            res.json({ status: "Failure", message: "Unable to Delete Delivery Charge details" });

        } else {
            res.json({
                
                status: "Success",
                message: "Successfully Deleted Delivery Charge details"
            });
        }
    });
}