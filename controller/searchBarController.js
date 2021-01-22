const { connection } = require('../db/db');

//Select All Product,Category,subcategory Data

exports.fetch_search_product_data = (req, res, next) => {

        console.log('search data');
    
        const dt = req.body;
    
        let data=[
            dt.searchProduct
        ]
        console.log('search data',dt.searchProduct);

    
        connection.query("select product_name as name ,product_id as id,'product_details' as type from product_details where product_name LIKE ? union select category_name as name, category_id as id,'category' as type from category where category_name LIKE ? union select sub_category_name as name ,sub_category_id as id,'sub_category' as type from sub_category where sub_category_name LIKE ?",['%' + dt.searchProduct + '%','%' + dt.searchProduct + '%','%' + dt.searchProduct + '%'],(err, results, fields) => {
             
                if (results.length == 0 || err) {
                                    console.log(err);
                                    res.json({                                                                             
                                        statuscode:401,
                                        status: "Failure", 
                                        message: "No Search Results Found"
                                 });
                                } 
                                else{
                                    
                                    console.log(results);
                                        res.json({
                                                     statuscode:200,
                                                     status: "Success",
                                                     message: "Successfully Fetched Search Results",
                                                     data: results
                                                });
                                }
            })
      }


//Select All Brand Data

exports.fetch_search_brand_data = (req, res, next) => {

        console.log('search Brand data');
    
        const dt = req.body;
    
        let data=[
            dt.searchBrand
        ]
        console.log('search data',dt.searchBrand);

    
        connection.query("select brand_name as name ,brand_id as id,'brand_master' as type from brand_master where brand_name LIKE ?",['%' + dt.searchBrand + '%'],(err, results, fields) => {
             
                if (results.length == 0 || err) {
                                    console.log(err);
                                    res.json({                                                                             
                                        statuscode:401,
                                        status: "Failure", 
                                        message: "No Brand Search Results Found"
                                 });
                                } 
                                else{
                                    
                                    console.log(results);
                                        res.json({
                                                     statuscode:200,
                                                     status: "Success",
                                                     message: "Successfully Fetched Brand Search Results",
                                                     data: results
                                                });
                                }
            })
      }



      exports.fetch_voice_search_data = (req, res, next) => {

        console.log('search data');
    
        const dt = req.body;
    
        let data=[
            dt.voiceSearch
        ]
        console.log('search data',dt.voiceSearch);

    
        connection.query("select product_name as name ,product_id as id,'product_details' as type from product_details where product_name LIKE ? union select category_name as name, category_id as id,'category' as type from category where category_name LIKE ? union select sub_category_name as name ,sub_category_id as id,'sub_category' as type from sub_category where sub_category_name LIKE ?",['%' + dt.voiceSearch + '%','%' + dt.voiceSearch + '%','%' + dt.voiceSearch + '%'],(err, results, fields) => {
             
                if (results.length == 0 || err) {
                                    console.log(err);
                                    res.json({                                                                             
                                        statuscode:401,
                                        status: "Failure", 
                                        message: "No Voice Search Results Found"
                                 });
                                } 
                                else{
                                    
                                    console.log(results);
                                        res.json({
                                                     statuscode:200,
                                                     status: "Success",
                                                     message: "Successfully Fetched Voice Search Results",
                                                     data: results
                                                });
                                }
            })
      }



