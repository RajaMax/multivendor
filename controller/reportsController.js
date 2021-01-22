const { connection } = require('../db/db');
var fs=require('fs');
var csv=require('fast-csv')



//This is for listing
exports.activeUser = (req, res, next) => {
sql_query="select * from customer where status=1";
  connection.query(sql_query,(err,result,field)=>{
    if(err){

      res.json({
      
        status: "failures",
        message: "NO have any record",
       data: result
      });
      return console.log(err);
    }else{
    res.json({
       statuscode:200,
       status: "Success",
       message: "Active Customer List Get Successfully",
       data: result
  });
}
  });
}

exports.inActiveUser = (req, res, next) => {
    sql_query="select * from customer where status=0";
      connection.query(sql_query,(err,result,field)=>{
        if(err){
    
          res.json({
          
            status: "failures",
            message: "NO have any customer",
           data: result
          });
          return console.log(err);
        }else{
        res.json({
           statuscode:200,
           status: "Success",
           message: "Active Customer List Get Successfully",
           data: result
      });
    }
      });
    }


    
exports.monthlySaleReport = (req, res, next) => {
    if (!req.params.id) {
        res.json({ status: "failure", message: "Failed to faitch" });
    } else {

    sql_query="select * from user_order where month(created_at)=?";
      connection.query(sql_query, [req.params.id],(err,result,field)=>{
        if(err){
    
          res.json({
          
            status: "failures",
            message: "NO have any record",
           data: result
          });
          return console.log(err);
        }else{
        res.json({
           statuscode:200,
           status: "Success",
           message: " Sale List Get Successfully",
           data: result
      });
    }
      });

    }


    }

       


exports.weeklySaleReport = (req, res, next) => {
   
    console.log(req.params);

    value1=req.params.date1;
     value2=req.params.date2;
   
    sql_query=`select * from user_order where date(created_at) BETWEEN '${req.params.date1}' AND '${req.params.date2}'`;
    //console.log(sql_query)
    connection.query(sql_query,(err,result,field)=>{

       
        if(err){
          res.json({
            status: "failures",
            message: "NO have any record",
           data: result
          });
          return console.log(err);
        }else{
        res.json({
           statuscode:200,
           status: "Success",
           message: "Sale List Get Successfully",
           data: result
      });
    }
      });

    


    }



     
exports.monthlySaleReportForVendor = (req, res, next) => {
  if (!req.params) {
      res.json({ status: "failure", message: "Failed to faitch" });
  } else {
    //console.log(req.params);

  sql_query=`select op.created_at,op.order_product_id,op.order_id,op.quantity,op.price,op.total_price,pd.product_name from order_product op  LEFT JOIN product_details pd on(op.product_id = pd.product_id) where month(op.created_at)=${req.params.month} and op.vendor_id=${req.params.vendor_id}`;
 // console.log(sql_query);
  connection.query(sql_query,(err,result,field)=>{
      if(err){
  
        res.json({
        
          status: "failures",
          message: "NO have any record",
         data: result
        });
        return console.log(err);
      }else{
      res.json({
         statuscode:200,
         status: "Success",
         message: " Sale List Get Successfully",
         data: result
    });
  }
    });

  }


  }


   
exports.yearlySaleReportForVendor = (req, res, next) => {
  if (!req.params) {
      res.json({ status: "failure", message: "Failed to faitch" });
  } else {
   // console.log(req.params);

  sql_query=`select op.created_at,op.order_product_id,op.order_id,op.quantity,op.price,op.total_price,pd.product_name from order_product op  LEFT JOIN product_details pd on(op.product_id = pd.product_id) where year(op.created_at)=${req.params.year} and op.vendor_id=${req.params.vendor_id}`;
  //console.log(sql_query);
  connection.query(sql_query,(err,result,field)=>{
      if(err){
  
        res.json({
        
          status: "failures",
          message: "NO have any record",
         data: result
        });
        return console.log(err);
      }else{
      res.json({
         statuscode:200,
         status: "Success",
         message: " Sale List Get Successfully",
         data: result
    });
  }
    });

  }


  }


     

  
exports.dateWiseSaleReportForVendor = (req, res, next) => {
  if (!req.params) {
      res.json({ status: "failure", message: "Failed to faitch" });
  } else {
    //console.log(req.params);

  sql_query=`select op.created_at,op.order_product_id,op.order_id,op.quantity,op.price,op.total_price,pd.product_name from order_product op  LEFT JOIN product_details pd on(op.product_id = pd.product_id) where year(op.created_at)='${req.params.date}' and op.vendor_id=${req.params.vendor_id}`;
  //console.log(sql_query);
  connection.query(sql_query,(err,result,field)=>{
      if(err){
  
        res.json({
        
          status: "failures",
          message: "NO have any record",
         data: result
        });
        return console.log(err);
      }else{


      res.json({
         statuscode:200,
         status: "Success",
         message: " Sale List Get Successfully",
         data: result
    });
  }
    });

  }


  }


     

  exports.weeklySaleReportForVendor = (req, res, next) => {
   
    //console.log(req.params);

    value1=req.params.date1;
     value2=req.params.date2;
     value2=req.params.vendor_id;
   
    sql_query=`select op.created_at,op.order_product_id,op.order_id,op.quantity,op.price,op.total_price,pd.product_name from order_product op  LEFT JOIN product_details pd on(op.product_id = pd.product_id) where op.vendor_id=${req.params.vendor_id} and date(op.created_at)  BETWEEN '${req.params.date1}' AND '${req.params.date2}'`;
    //console.log(sql_query)
    connection.query(sql_query,(err,result,field)=>{

       
        if(err){
          res.json({
            status: "failures",
            message: "NO have any record",
           data: result
          });
          return console.log(err);
        }else{

          
// var ws=fs.createReadStream('my.csv');
// csv.write([["a1","b1"],
// ["ba1" ,"b"]],{headers:true}).pipe(ws);

        res.json({
           statuscode:200,
           status: "Success",
           message: "Sale List Get Successfully",
           data: result
      });
    }
      });

    


    }



    