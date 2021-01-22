const { connection } = require('../db/db');



//Rating_and feedback us detail by id
exports.ratingAndFeedbackList = (req, res,next) => {
  connection.query('select pf.product_feedback_id,pf.created_date,pf.customer_rating,pd.product_image,pf.description,pd.product_name,c.category_name,pf.customer_id from product_feedback pf join product_details pd ON(pf.product_id=pd.product_id) Join category c on(pd.category_id=c.category_id) where pf.status = 1 and pf.product_id = ? ',req.params.id,(err,result,field)=>{
    if(err){
     return console.log(err);
      res.json({
     
        status: "Failure",
        message: "Something Went Wrong",
       data: result
    });
    }else{
    res.json({
     
      status: "Success",
      message: "Product Feedback List Get Successfully",
     data: result
  });
}
  });
}



