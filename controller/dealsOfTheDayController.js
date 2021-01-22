const { connection } = require('../db/db');


exports.get_deals_of_the_day = (req, res, next) => {
    console.log("saddddd")
    connection.query(` select * FROM product_details AS d  
                        LEFT JOIN product_specials AS p  
                        ON d.product_id=p.product_id  
                        where (CURDATE() between p.product_special_start_date and p.product_special_end_date);`, function (err, result) {
  
      if (err) throw err;
      else {
        console.log('data fetched', result);
        res.send(result);
      }
    });
  }
  