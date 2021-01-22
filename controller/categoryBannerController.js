 
const { connection } = require('../db/db.js');
const fileURL = 'http://dev.dxminds.online:6500/category-banner/';
exports.uploadBanner = (req, res, next) => {
    body_data = req.body;
    const files = req.files;

    for (var i = 0; i < files.length; i++) {

        //  console.log(files);

        filename = req.files[i].filename
        if (files[i].mimetype == 'image/png' || files[i].mimetype == 'image/jpg' || files[i].mimetype == 'image/jpeg') {
            var imges_data = {
                created_by: body_data.created_by,
                category_id: body_data.category_id,
                image: filename,
            }
            connection.query("INSERT INTO category_banner set ?", imges_data, function (err, result) {
                if (err) {
                    res.json({ status: "Failure", message: "Unable to insert images" });
                }

            });

        }
    }
    res.json({
        status: "Success",
        message: "Successfully insert details"
    });
}
  

exports.updateBanner = (req, res, next) => {
    body_data = req.body;
    const files = req.files;

    for (var i = 0; i < files.length; i++) {

        //  console.log(files);

        filename = req.files[i].filename
        if (files[i].mimetype == 'image/png' || files[i].mimetype == 'image/jpg' || files[i].mimetype == 'image/jpeg') {
            var imges_data = {
                created_by: body_data.created_by,
                category_id: body_data.category_id,
                image: filename,
            }
            var sql_query = "UPDATE `category_banner` SET ? WHERE category_banner_id= ?";
            connection.query(sql_query, [imges_data, body_data.id],function (err, result) {
              console.log(err);
                if (err) {
                    res.json({ status: "Failure", message: "Unable to update images" });
                }

            });

        }
    }
    res.json({
        status: "Success",
        message: "Successfully update details"
    });
}


//list
exports.categoryBanner = (req, res, next) => {
  let sql_query='select * from category_banner';
    connection.query(sql_query,(err,result,field)=>{
      if(err){
        return console.log(err);
      }else{
      res.json({
        statuscode:200,
        status: "Success",
        message: "Category Banner List Get Successfully",
       data: result
    });
  }
    });
  }
  //details based on banner id
  exports.singleBannerDetail = (req, res, next) => {
    let sql_query='select * from category_banner where category_banner_id = ? ';

    connection.query(sql_query,req.params.id,(err,result,field)=>{
      if(err){
        return console.log(err);
      }else{
      res.json({
        statuscode:200,
        status: "Success",
        message: "Category Banner Details Get Successfully",
       data: result
    });
  }
    });
  }
  
 
//update status api
exports.updateBannerStatus = (req, res, next) => {
    body_data = req.body;
    var data = {
      status: body_data.status
    }
    var sql_query = "UPDATE `category_banner` SET ? WHERE category_banner_id= ?";
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


  // row delete by id
exports.deleteBanner = (req, res,next) => {
  let sql_query='delete from category_banner where category_banner_id = ?';
  connection.query(sql_query,[req.params.id],(err,result,field)=>{
    if(err){
      return console.log(err);
    }else{
    res.json({
      statuscode:200,
      status: "Success",
      message: "Delete Successfully",
  });
}
  });
}




exports.fetch_all_category_banner_data = (req, res, next) => {
    let sql_query = "SELECT * FROM  category_banners order by category_banner_id";
    connection.query(sql_query, function (err, results, fields) {
        if (err) {
            res.json({ status: "Failure", message: "Unable to fetch Category banner details" });
        } else {
            console.log(results);
            res.json({
                status: "Success",
                message: "Successfully fetch Category banner details",
                data: results
            });
        }
    });
}

// Save Category Data
exports.fetch_save_category_banner_data = (req, res, next) => {

    console.log(req.file.filename);
    console.log(req.body);

    const dt=JSON.parse(req.body.data)
    console.log("dsfsfdsf",dt);



    let sql_query = `SELECT * FROM category_banners WHERE category_banner_name='${dt.category_banner_name}'`;

    connection.query(sql_query, function (err, results, fields) {
        if (err) {
            console.log(err);
            res.json({ status: "Failure", message: "Unable to Fetch Category banner details" });
        } else {
            if (results && results.length > 0) {
                res.json({
                    status: "Failure",
                    message: "This Data Already Exist",
                });
            } else {
                let banner_data = [[
                    dt.category_name,
                    dt.category_banner_name,
                    req.file.filename,
                    dt.sort_order,
                    '0',
                    dt.created_by
                ]];
                let sql_query = "INSERT INTO category_banners (category_name,category_banner_name,category_banner_image,sort_order, status,created_by) VALUES ?";
                connection.query(sql_query, [banner_data], function (err, results, fields) {
                    if (err) {
                        console.log(err);
                        res.json({ status: "Failure", message: "Unable to Save Category banner details" });
                    } else {
                        console.log(results);
                        res.json({
                            status: "Success",
                            message: "Successfully saved Category banner details",
                        });
                    }
                });
            }


        }
    });

}
//Fetch Data By id
exports.fetch_category_banner_data_by_id = (req, res, next) => {

    let sql_query = "SELECT * FROM category_banners WHERE category_banner_id =" + req.params.id;

    connection.query(sql_query, function (err, results, fields) {
        if (err) {
            res.json({ status: "Failure", message: "Unable to fetch Category banner details" });
        } else {
            res.json({
                status: "Success",
                message: "Successfully fetched Category banner details",
                fileURL: fileURL,
                data: results
            });
        }
    });

}
//Update Category by Id
exports.update_category_banner_data_by_id = (req, res, next) => {
    const dt=JSON.parse(req.body.data)
    console.log("dsfsfdsf",dt);
    var data = {
        category_name:dt.category_name,
        category_banner_name:dt.category_banner_name,
        category_banner_image:req.file.filename,
        sort_order:dt.sort_order,
        status:'0',
        created_by:dt.created_by
    }
    var sql_query = "UPDATE `category_banners` SET ? WHERE category_banner_id= ?";
    connection.query(sql_query, [data, dt.id], function (err, results, fields) {
        console.log(err);
        if (err) {
            res.json({ status: "Failure", message: "Unable to Update Category banner details" });
        } else {
            res.json({
                status: "Success",
                message: "Successfully Updated Category banner details",
            });
        }
    });
}
//Delete Data By id
exports.delete_category_banner_data_by_id = (req, res, next) => {

    let sql_query = "DELETE FROM `category_banners` WHERE category_banner_id= ?";

    connection.query(sql_query, [req.params.id], function (err, results, fields) {
        if (err) {
            res.json({ status: "Failure", message: "Unable to Delete Category banner details" });

        } else {
            res.json({
                status: "Success",
                message: "Successfully Deleted Category banner details"
            });
        }
    });

}


exports.update_category_banner_status_data_by_id = (req, res, next) => {
    if (!req.params.id) {
        res.json({ status: "failure", message: "Failed to update" });
    } else {
        var sql_query = "UPDATE `category_banners` SET ? WHERE category_banner_id= ?";
        connection.query(sql_query, [req.body, req.params.id], function (err, results, fields) {
            if (err) {
                res.json({ status: "Failure", message: "Unable to Update Category Banner Status details" });

            } else {
                res.json({
                    status: "Success",
                    message: "Successfully Updated Category Banner Status details",
                    data: results
                });
            }
        });
    }

}
