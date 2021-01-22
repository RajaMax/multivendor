const { connection } = require('../db/db');


exports.fetch_shop_by_category = (req, res, next) => {
    console.log("saddddd",req)
    connection.query(` select * FROM category where category_id = ?`,[req.body.category_id],function (err, result) {
  
      if (err) throw err;
      else {
        console.log('data fetched', result);
        res.send(result);
      }
    });
  }
  