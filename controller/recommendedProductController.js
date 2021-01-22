const { connection } = require('../db/db');


exports.get_recommended_product = (req, res, next) => {
    console.log("saddddd")
    connection.query(`SELECT * FROM product_details where (featured_product = 1 AND recommended_product=1)`, function (err, result) {
  
      if (err) throw err;
      else {
        console.log('data fetched', result);
        res.send(result);
      }
    });
  }
  