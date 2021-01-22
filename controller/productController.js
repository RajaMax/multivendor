const { connection } = require('../db/db.js');
const { text } = require('express');

const fileURL = 'http://dev.dxminds.online:6500/product-images/';


exports.fetch_all_product_data = (req, res, next) => {
    let sql_query = "SELECT * FROM  product_details join category on category.category_id=product_details.category_id join sub_category on sub_category.sub_category_id=product_details.sub_category_id";
    connection.query(sql_query, function (err, results, fields) {
        if (err) {
            console.log(err);
            res.json({ status: "Failure", message: "Unable to Fetch product details" });
        } else {
            console.log(results);
            res.json({
                status: "Success",
                message: "Successfully Fetch product details",
                fileURL: fileURL,
                data: results
            });
        }
    });
}


// Save unit Data
exports.save_product_data = (req, res, next) => {


    dt = JSON.parse(req.body.Data);

    console.log("req.body");
    console.log(req.body);

    // return false;

    let sql_query = `SELECT * FROM product_details WHERE category_id=${dt.category_id} and sub_category_id=${dt.sub_category_id} and 
    sub_category2_id=${dt.sub_category2_id} and product_type_id=${dt.product_type_id} and brand_id=${dt.brand_id} and 
    product_name ='${dt.product_name}'`;

    connection.query(sql_query, function (err, results, fields) {
        if (err) {
            console.log(err);
            res.json({ status: "Failure", message: "Unable to Save product details" });
        } else {
            if (results && results.length > 0) {
                res.json({
                    status: "Failure",
                    message: "This Data Already Exist",
                });
            } else {
                let created_by = 0;
                if (dt.user_id !== undefined) {
                    created_by = dt.user_id;
                }
                var values = [[
                    dt.category_id,
                    dt.sub_category_id,
                    dt.sub_category2_id,
                    dt.product_type_id,
                    dt.brand_id,
                    dt.product_name,
                    dt.product_description,
                    dt.product_meta_title,
                    dt.product_meta_description,
                    dt.product_sku,
                    dt.featured_product == true ? 1 : 0,
                    dt.recommended_product == true ? 1 : 0,
                    dt.product_tax_type,
                    dt.product_manufacturer,
                    dt.product_hsn_code,
                    dt.product_commission,
                    dt.product_image,
                    dt.status,
                    created_by
                ]];
                console.log(values);
                // return false;
                let sql_query = `INSERT INTO product_details (category_id,sub_category_id,sub_category2_id,product_type_id,
                    brand_id,product_name,product_description,product_meta_title,product_meta_description,sku,featured_product,
                    recommended_product,tax_type_id,manufacturer_id,product_hsn_code,product_commission,product_image,status,created_by) VALUES ?`;
                connection.query(sql_query, [values], function (err, results, fields) {
                    if (err) {
                        console.log(err);
                        res.json({ status: "Failure", message: "Unable to Save product details" });
                    } else {
                        let insertId = results.insertId;
                        if (insertId) {

                            //related product 
                            let rel_products = dt.related_products;
                            if (rel_products.length > 0) {
                                let relatated_data = [];
                                for (let i = 0; i < rel_products.length; i++) {
                                    relatated_data[i] = [insertId, rel_products[i], 0, created_by];
                                }
                                let sql_query = "INSERT INTO related_products (product_id,related_product,status,created_by) VALUES ?";
                                connection.query(sql_query, [relatated_data], function (err, results, fields) {
                                    if (err) {
                                        res.json({ status: "Failure", message: "Unable to Save product details" });
                                    } else {
                                        console.log(results);
                                    }
                                });

                            }
                            //product sub Images
                            let prod_sub_img = dt.product_sub_images;
                            if (prod_sub_img.length > 0) {
                                let prod_sub_img_data = [];
                                for (let i = 0; i < prod_sub_img.length; i++) {
                                    prod_sub_img_data[i] = [insertId, prod_sub_img[i].product_sub_image, prod_sub_img[i].product_sub_image_sort_order, 0, created_by];
                                }
                                let sql_query = "INSERT INTO product_sub_images (product_id,product_sub_image_name,sort_order,status,created_by) VALUES ?";
                                connection.query(sql_query, [prod_sub_img_data], function (err, results, fields) {
                                    if (err) {
                                        res.json({ status: "Failure", message: "Unable to Save product Sub Images details" });
                                    } else {
                                        console.log(results);
                                    }
                                });
                            }
                        }
                        console.log(results);
                        res.json({
                            status: "Success",
                            message: "Successfully Saved Product details",
                        });
                    }
                });
            }


        }
    });


}


//edit-product-details-data
exports.fetch_product_data_by_id = (req, res, next) => {
    if (!req.params.id) {
        res.json({ status: "failure", message: "Failed to update" });
    } else {
        var sql_query = `SELECT * FROM product_details WHERE product_id =${req.params.id}`;
        connection.query(sql_query, async function (err, results, fields) {
            if (err) {
                console.log(err);
                res.json({ status: "Failure", message: "Unable to Fetch Product details by id" });
            } else {
                var related_product_data = '';
                var product_sub_images_data = '';
                if (results.length > 0) {
                    //Fecthing  related product  Data
                    await getRelatedProductsData(req.params.id).then((data) => {
                        related_product_data = data;
                        console.log('=======================related_product_data===================');
                        console.log(related_product_data);
                    });
                    //Fecthing product sub images Data
                    await getProductSubImagesData(req.params.id).then((data) => {
                        product_sub_images_data = data;
                        console.log('=======================product_sub_images_data===================');
                        console.log(product_sub_images_data);
                    });

                }
                res.json({
                    status: "Success",
                    message: "Successfully Fetched Product details by id",
                    image_path: fileURL,
                    related_product_data: related_product_data,
                    product_sub_images_data: product_sub_images_data,
                    data: results
                });
            }
        });
    }

}

function getRelatedProductsData(id) {

    return new Promise((resolve, reject) => {
        let query = `SELECT * FROM related_products WHERE product_id = ${id} ORDER BY related_product_id`;
        connection.query(query, function (err, results, fields) {
            if (err) return reject(err);
            console.log('results');
            console.log(results);
            resolve(results);
        });
    });
}

function getProductOptionData(id) {

    return new Promise((resolve, reject) => {
        let query = `SELECT * FROM product_options WHERE vendor_product_id = ${id} ORDER BY product_option_id `;
        connection.query(query, function (err, results, fields) {
            if (err) return reject(err);
            console.log('results');
            console.log(results);
            resolve(results);
        });
    });
}
function getProductDiscountData(id) {

    return new Promise((resolve, reject) => {
        let query = `SELECT * FROM product_discounts WHERE vendor_product_id = ${id} ORDER BY product_discount_id `;
        connection.query(query, function (err, results, fields) {
            if (err) return reject(err);
            console.log('results');
            console.log(results);
            resolve(results);
        });
    });
}

function getProductSpecialData(id) {

    return new Promise((resolve, reject) => {
        let query = `SELECT * FROM product_specials WHERE vendor_product_id = ${id} ORDER BY product_special_id  `;
        connection.query(query, function (err, results, fields) {
            if (err) return reject(err);
            console.log('results');
            console.log(results);
            resolve(results);
        });
    });
}

function getProductSubImagesData(id) {

    return new Promise((resolve, reject) => {
        let query = `SELECT * FROM product_sub_images WHERE product_id = ${id} ORDER BY product_sub_image_id `;
        connection.query(query, function (err, results, fields) {
            if (err) return reject(err);
            console.log('results');
            console.log(results);
            resolve(results);
        });
    });
}

//update-product-status-data

exports.update_product_status_data_by_id = (req, res, next) => {
    if (!req.params.id) {
        res.json({ status: "failure", message: "Failed to update" });
    } else {
        var sql_query = "UPDATE `product_details` SET ? WHERE product_id= ?";
        connection.query(sql_query, [req.body, req.params.id], function (err, results, fields) {
            if (err) {
                res.json({ status: "Failure", message: "Unable to Update Product Status details" });

            } else {
                res.json({
                    status: "Success",
                    message: "Successfully Updated Product Status details",
                    data: results
                });
            }
        });
    }

}



//Delete sub Product Option Data by Id
exports.delete_sub_product_option_data = (req, res, next) => {
    let sql_query = "DELETE FROM `product_options` WHERE product_option_id = ?";

    connection.query(sql_query, [req.params.id], function (err, results, fields) {
        if (err) {
            res.json({ status: "Failure", message: "Unable to Delete Product Option details" });

        } else {
            res.json({
                status: "Success",
                message: "Successfully Deleted Product Option details"
            });
        }
    });
}

//Delete sub Product Discount Data by Id
exports.delete_sub_product_discount_data = (req, res, next) => {
    let sql_query = "DELETE FROM `product_discounts` WHERE product_discount_id = ?";

    connection.query(sql_query, [req.params.id], function (err, results, fields) {
        if (err) {
            res.json({ status: "Failure", message: "Unable to Delete Product Discount details" });

        } else {
            res.json({
                status: "Success",
                message: "Successfully Deleted Product Discount details"
            });
        }
    });
}

//Delete sub Product special Data by Id
exports.delete_sub_product_special_data = (req, res, next) => {
    let sql_query = "DELETE FROM `product_specials` WHERE product_special_id = ?";

    connection.query(sql_query, [req.params.id], function (err, results, fields) {
        if (err) {
            res.json({ status: "Failure", message: "Unable to Delete Product special details" });

        } else {
            res.json({
                status: "Success",
                message: "Successfully Deleted Product special details"
            });
        }
    });
}

//Delete sub Product sub images Data by Id
exports.delete_sub_product_images_data = (req, res, next) => {
    let sql_query = "DELETE FROM `product_sub_images` WHERE product_sub_image_id  = ?";

    connection.query(sql_query, [req.params.id], function (err, results, fields) {
        if (err) {
            res.json({ status: "Failure", message: "Unable to Delete Product sub images details" });

        } else {
            res.json({
                status: "Success",
                message: "Successfully Deleted Product sub images details"
            });
        }
    });
}
//update_product_details_data_by_id
exports.update_product_details_data_by_id = (req, res, next) => {

    dt = JSON.parse(req.body.Data);

    console.log("req.body");
    console.log(req.body);
    let created_by = 0;
    if (dt.user_id !== undefined) {
        created_by = dt.user_id
    }
    if (!dt) {
        res.json({ status: "failure", message: err });
    } else {
        var data = {
            category_id: dt.category_id,
            sub_category_id: dt.sub_category_id,
            sub_category2_id: dt.sub_category2_id,
            product_type_id: dt.product_type_id,
            brand_id: dt.brand_id,
            product_name: dt.product_description,
            product_description: dt.product_description,
            product_meta_title: dt.product_meta_title,
            product_meta_description: dt.product_meta_description,
            sku: dt.product_sku,
            tax_type_id: dt.product_tax_type,
            status: dt.status,
            manufacturer_id: dt.product_manufacturer,
            featured_product: dt.featured_product == true ? 1 : 0,
            recommended_product: dt.recommended_product == true ? 1 : 0,
            product_hsn_code: dt.product_hsn_code,
            product_commission: dt.product_commission,
            product_image: dt.product_image,
            created_by: created_by
        }
        var sql_query = "UPDATE `product_details` SET ? WHERE product_id= ?";
        connection.query(sql_query, [data, dt.id], function (err, results, fields) {
            console.log(err);
            if (err) {
                res.json({ status: "Failure", message: err });
            } else {

                let insertId = dt.id;
                if (insertId) {
                    let rel_products = dt.related_products;
                    if (rel_products.length > 0) {
                        var sql_query = "DELETE FROM `related_products` WHERE product_id= ?";
                        connection.query(sql_query, [dt.id], function (err, results, fields) {
                            if (err) {
                                res.json({ status: "Failure", message: err });
                            } else {
                                console.log(results);
                                if (results) {
                                    if (rel_products.length > 0) {
                                        let relatated_data = [];
                                        for (let i = 0; i < rel_products.length; i++) {
                                            relatated_data[i] = [dt.id, rel_products[i], 0, 1];
                                        }
                                        let sql_query = "INSERT INTO related_products (product_id,related_product,status,created_by) VALUES ?";
                                        connection.query(sql_query, [relatated_data], function (err, results, fields) {
                                            if (err) {
                                                res.json({ status: "Failure", message: "Unable to Save related Product details" });
                                            } else {
                                                console.log(results);
                                            }
                                        });

                                    }
                                }
                            }
                        });
                    }
                    //Updating Product Sub Images Data
                    let prod_sub_img = dt.product_sub_images;
                    if (prod_sub_img.length > 0) {
                        prod_sub_img.forEach(sub_img => {
                            if (sub_img.hidden_sub_img_id) {
                                var updateSubImg = {
                                    product_id: dt.id,
                                    product_sub_image_name: sub_img.product_sub_image,
                                    sort_order: sub_img.product_sub_image_sort_order,
                                    created_by: created_by
                                }
                                var update_courses_query = "UPDATE `product_sub_images` SET ? WHERE product_sub_image_id = ?";
                                connection.query(update_courses_query, [updateSubImg, sub_img.hidden_sub_img_id], function (err, results, fields) {
                                    if (err) {
                                        console.log(err);
                                        res.json({ status: "Failure", message: err });
                                    } else {
                                        console.log(results);
                                    }
                                });

                            } else {
                                let prod_sub_img_data = [[
                                    dt.id, sub_img.product_sub_image, sub_img.product_sub_image_sort_order, 0, created_by
                                ]];
                                let sql_query = "INSERT INTO product_sub_images (product_id,product_sub_image_name,sort_order,status,created_by) VALUES ?";
                                connection.query(sql_query, [prod_sub_img_data], function (err, results, fields) {
                                    if (err) {
                                        console.log(err);

                                        res.json({ status: "Failure", message: err });
                                    } else {
                                        console.log(results);
                                    }
                                });


                            }
                        });
                    }
                }
                res.json({
                    status: "Success",
                    message: "Successfully Updated Product details",
                });
            }
        });
    }

}

//Delete sub Product Details Data by Id
exports.delete_product_details_data_by_id = (req, res, next) => {
    let sql_query = "DELETE FROM `product_details` WHERE product_id = ?";

    connection.query(sql_query, [req.params.id], function (err, results, fields) {
        if (err) {
            res.json({ status: "Failure", message: "Unable to Delete Product Details details" });

        } else {
            res.json({
                status: "Success",
                message: "Successfully Deleted Product Details details"
            });
        }
    });
}

//fetch_all_active_product_details_data

exports.fetch_all_active_product_details_data = (req, res, next) => {
    let sql_query = "SELECT * FROM  product_details where status=1 order by product_id";
    connection.query(sql_query, async function (err, results, fields) {
        if (err) {
            console.log(err);
            res.json({ status: "Failure", message: "Unable to Fetch active product details" });
        } else {
            console.log(results);
            let data = {};
            let dataArray = [];
            if (results.length > 0) {
                for (let i = 0; i < results.length; i++) {
                    if (data[results[i].product_id] == undefined) {
                        data[results[i].product_id] = {
                            product_id: results[i].product_id,
                            category_id: results[i].category_id,
                            sub_category_id: results[i].sub_category_id,
                            sub_category2_id: results[i].sub_category2_id,
                            product_type_id: results[i].product_type_id,
                            brand_id: results[i].brand_id,
                            product_image: fileURL + results[i].product_image,
                            product_name: results[i].product_name,
                            product_description: results[i].product_description,
                            sku: results[i].sku,
                            featured_product: results[i].featured_product,
                            recommended_product: results[i].recommended_product,
                            tax_type_id: results[i].tax_type_id,
                            manufacturer_id: results[i].manufacturer_id,
                            product_hsn_code: results[i].product_hsn_code,
                            status: results[i].status,
                            avg_rating: 0,
                            total_users_rating: 0,
                            related_product_details: [],
                        }
                        dataArray.push(data[results[i].product_id]);
                    }

                    let related_product_data = '';
                    let product_sub_images_data = '';
                    let product_avg_ratings_data = '';
                    let product_id = results[i].product_id;
                    await getRelatedProductsData(results[i].product_id).then((data) => {
                        related_product_data = data;
                        console.log('=======================related_product_data===================');
                        console.log(related_product_data);
                    });
                    if (related_product_data.length > 0) {
                        for (let i = 0; i < related_product_data.length; i++) {
                            let rel_prod = {
                                related_product_id: related_product_data[i].related_product_id,
                                product_id: related_product_data[i].product_id,
                                related_product: related_product_data[i].related_product,
                            }
                            data[product_id]['related_product_details'].push(rel_prod);
                        }
                    }
                    //Fecthing product sub images Data
                    await getProductSubImagesData(product_id).then((data) => {
                        product_sub_images_data = data;
                        console.log('=======================product_sub_images_data===================');
                        console.log(product_sub_images_data);
                    });
                    if (product_sub_images_data.length > 0) {
                        for (let i = 0; i < product_sub_images_data.length; i++) {
                            let sub_img_prod = {
                                product_sub_image_id: product_sub_images_data[i].product_sub_image_id,
                                product_id: product_sub_images_data[i].product_id,
                                product_sub_image_name: product_sub_images_data[i].product_sub_image_name ? fileURL + product_sub_images_data[i].product_sub_image_name : null,
                                sort_order: product_sub_images_data[i].sort_order,

                            }
                            // data[product_id]['product_sub_images_details'].push(sub_img_prod);
                        }
                    }
                    //Fecthing product average ratings Data
                    await getProductsAverageRatingsData(product_id).then((data) => {
                        product_avg_ratings_data = data;
                        console.log('=======================product_avg_ratings_data===================');
                        console.log(product_avg_ratings_data);
                    });

                    if (product_avg_ratings_data.length > 0) {
                        for (let i = 0; i < product_avg_ratings_data.length; i++) {
                            let rating_val = 0;
                            let total_users = 0;

                            rating_val = ((product_avg_ratings_data[i].total_user_ratings / (product_avg_ratings_data[i].total_users * 5)) * 5).toFixed(1);
                            total_users = product_avg_ratings_data[i].total_users;

                            data[product_id]['avg_rating'] = rating_val;
                            data[product_id]['total_users_rating'] = total_users;
                        }
                    }
                }
            }
            res.json({
                status: "Success",
                message: "Successfully Fetch active product details",
                fileURL: fileURL,
                data: dataArray
            });
        }
    });
}

function getProductsAverageRatingsData(id) {

    return new Promise((resolve, reject) => {
        let query = `SELECT
        COUNT(1) AS total_users,
        SUM(customer_rating) AS total_user_ratings
    FROM
        product_feedback
    WHERE
        product_id = ${id}
    GROUP BY
        product_id`;
        connection.query(query, function (err, results, fields) {
            if (err) return reject(err);
            console.log('results');
            console.log(results);
            resolve(results);
        });
    });
}


// save_vendor_product_data
exports.save_vendor_product_data = (req, res, next) => {


    dt = JSON.parse(req.body.Data);

    console.log("req.body");
    console.log(req.body);

    // return false;

    let sql_query = `SELECT * FROM vendor_product_details WHERE product_id =${dt.product_id} and vendor_id=${dt.vendor_id}`;

    connection.query(sql_query, function (err, results, fields) {
        if (err) {
            console.log(err);
            res.json({ status: "Failure", message: "Unable to Save vendor product details" });
        } else {
            if (results && results.length > 0) {
                res.json({
                    status: "Failure",
                    message: "This Data Already Exist",
                });
            } else {
                let created_by = 0;
                if (dt && dt.created_by !== undefined) {
                    created_by = dt.created_by;
                } else {
                    created_by = dt.vendor_id;
                }
                var values = [[
                    dt.vendor_id,
                    dt.product_id,
                    dt.priority,
                    dt.product_commission,
                    dt.product_base_price,
                    dt.product_quantity,
                    dt.product_minimun_qty,
                    dt.product_stock_status,
                    "0",
                    dt.product_warranty,
                    dt.product_return_policy,
                    dt.total_product_weight,
                    dt.product_hsn_code,
                    dt.unit_id,
                    dt.option_required,
                    created_by
                ]];

                console.log(values);
                // return false;
                let sql_query = `INSERT INTO vendor_product_details (vendor_id,product_id,priority,product_commission,base_price,total_quantity,
                    minimum_quantity,stock_status_id, status,product_warranty,product_return_policy,total_product_weight,product_hsn_code,
                    unit_id,option_required_id,created_by) VALUES ?`;
                connection.query(sql_query, [values], function (err, results, fields) {
                    if (err) {
                        console.log(err);
                        res.json({ status: "Failure", message: err });
                    } else {
                        let insertId = results.insertId;
                        if (insertId) {
                            //product options
                            let prod_options = dt.product_options;
                            if (prod_options.length > 0) {
                                let prod_option_data = [];
                                for (let i = 0; i < prod_options.length; i++) {
                                    prod_option_data[i] = [insertId, prod_options[i].sub_unit_id, prod_options[i].unit_value_id, prod_options[i].product_option_qty, prod_options[i].product_option_price, prod_options[i].product_option_image, 0, 1];
                                }
                                let sql_query = "INSERT INTO product_options (product_id,sub_unit_id,unit_value_id,product_option_qty,product_option_price,product_option_image,status,created_by) VALUES ?";
                                connection.query(sql_query, [prod_option_data], function (err, results, fields) {
                                    if (err) {
                                        res.json({ status: "Failure", message: "Unable to Save  vendor product options details" });
                                    } else {
                                        console.log(results);
                                    }
                                });

                            }

                            //product discounts
                            let prod_discounts = dt.product_discounts;
                            if (prod_discounts.length > 0) {
                                let prod_discount_data = [];
                                for (let i = 0; i < prod_discounts.length; i++) {
                                    prod_discount_data[i] = [insertId, prod_discounts[i].product_discount_qty, prod_discounts[i].product_discount_priority, prod_discounts[i].product_discount_price, prod_discounts[i].product_discount_start_date, prod_discounts[i].product_discount_end_date, 0, 1];
                                }
                                let sql_query = "INSERT INTO product_discounts (product_id,product_discount_qty,product_discount_priority,product_discount_price,product_discount_start_date,product_discount_end_date,status,created_by) VALUES ?";
                                connection.query(sql_query, [prod_discount_data], function (err, results, fields) {
                                    if (err) {
                                        res.json({ status: "Failure", message: "Unable to Save vendor product discounts details" });
                                    } else {
                                        console.log(results);
                                    }
                                });

                            }

                            //product specials
                            let prod_specials = dt.product_specials;
                            if (prod_specials.length > 0) {
                                let prod_special_data = [];
                                for (let i = 0; i < prod_specials.length; i++) {
                                    prod_special_data[i] = [insertId, prod_specials[i].product_special_priority, prod_specials[i].product_special_price, prod_specials[i].product_special_start_date, prod_specials[i].product_special_end_date, 0, 1];
                                }
                                let sql_query = "INSERT INTO product_specials (product_id,product_special_priority,product_special_price,product_special_start_date,product_special_end_date,status,created_by) VALUES ?";
                                connection.query(sql_query, [prod_special_data], function (err, results, fields) {
                                    if (err) {
                                        res.json({ status: "Failure", message: "Unable to Save vendor product specials details" });
                                    } else {
                                        console.log(results);
                                    }
                                });

                            }
                        }
                        console.log(results);
                        res.json({
                            status: "Success",
                            message: "Successfully Saved vendor Product details",
                        });
                    }
                });
            }


        }
    });


}
//edit-vendor-product-details-data
exports.fetch_vendor_product_data_by_id = (req, res, next) => {
    if (!req.params.id) {
        res.json({ status: "failure", message: "Failed to update" });
    } else {
        var sql_query = `SELECT * FROM vendor_product_details WHERE vendor_product_id =${req.params.id}`;
        connection.query(sql_query, async function (err, results, fields) {
            if (err) {
                console.log(err);
                res.json({ status: "Failure", message: "Unable to Fetch Vendor Product details by id" });

            } else {

                var related_product_data = '';
                var product_option_data = '';
                var product_discount_data = '';
                var product_special_data = '';
                var product_sub_images_data = '';

                if (results.length > 0) {
                    //Fecthing  related product  Data
                    await geRelatedVendorProductsData(req.params.id).then((data) => {
                        related_product_data = data;
                        console.log('=======================related_product_data===================');
                        console.log(related_product_data);
                    });

                    //Fecthing product option Data
                    await getVendorProductOptionData(req.params.id).then((data) => {
                        product_option_data = data;
                        console.log('=======================product_option_data===================');
                        console.log(product_option_data);
                    });

                    //Fecthing product discounts Data
                    await getVendorProductDiscountData(req.params.id).then((data) => {
                        product_discount_data = data;
                        console.log('=======================product_discount_data===================');
                        console.log(product_discount_data);
                    });

                    //Fecthing product special Data
                    await getVendorProductSpecialData(req.params.id).then((data) => {
                        product_special_data = data;
                        console.log('=======================product_special_data===================');
                        console.log(product_special_data);
                    });

                    //Fecthing product sub images Data
                    await getProductSubImagesData(req.params.id).then((data) => {
                        product_sub_images_data = data;
                        console.log('=======================product_sub_images_data===================');
                        console.log(product_sub_images_data);
                    });

                }
                res.json({
                    status: "Success",
                    message: "Successfully Fetched Vendor Product details by id",
                    image_path: fileURL,
                    related_product_data: related_product_data,
                    product_option_data: product_option_data,
                    product_discount_data: product_discount_data,
                    product_special_data: product_special_data,
                    product_sub_images_data: product_sub_images_data,
                    data: results
                });
            }
        });
    }

}

//update_vendor_product_details_data_by_id
exports.update_vendor_product_details_data_by_id = (req, res, next) => {

    dt = JSON.parse(req.body.Data);

    console.log("req.body");
    console.log(req.body);

    if (!dt) {
        res.json({ status: "failure", message: err });
    } else {
        var data = {
            vendor_id: dt.vendor_id,
            product_id: dt.product_id,
            priority: dt.priority,
            product_commission: dt.product_commission,
            base_price: dt.product_base_price,
            total_quantity: dt.product_quantity,
            minimum_quantity: dt.product_minimun_qty,
            stock_status_id: dt.product_stock_status,
            product_warranty: dt.product_warranty,
            product_return_policy: dt.product_return_policy,
            total_product_weight: dt.total_product_weight,
            product_hsn_code: dt.product_hsn_code,
            unit_id: dt.unit_id,
            option_required_id: dt.option_required,
        }

        var sql_query = "UPDATE `vendor_product_details` SET ? WHERE vendor_product_id= ?";
        connection.query(sql_query, [data, dt.id], function (err, results, fields) {
            console.log(err);
            if (err) {
                res.json({ status: "Failure", message: err });
            } else {

                let insertId = dt.id;
                if (insertId) {
                    //Updating Product Option Data
                    let prod_options = dt.product_options;
                    if (prod_options.length > 0) {
                        prod_options.forEach(element => {
                            if (element.hidden_opt_id) {
                                //Updating Review Data
                                var updateOption = {
                                    product_id: dt.id,
                                    sub_unit_id: element.sub_unit_id,
                                    unit_value_id: element.unit_value_id,
                                    product_option_qty: element.product_option_qty,
                                    product_option_price: element.product_option_price,
                                    product_option_image: element.product_option_image,
                                }
                                var update_courses_query = "UPDATE `product_options` SET ? WHERE product_option_id = ?";
                                connection.query(update_courses_query, [updateOption, element.hidden_opt_id], function (err, results, fields) {
                                    if (err) {
                                        console.log(err);
                                        res.json({ status: "Failure", message: "Unable to Update product options details" });
                                    } else {
                                        console.log(results);
                                    }
                                });

                            } else {

                                let prod_option_data = [[
                                    dt.id,
                                    element.sub_unit_id,
                                    element.unit_value_id,
                                    element.product_option_qty,
                                    element.product_option_price,
                                    element.product_option_image,
                                    0, 1
                                ]];


                                let sql_query = "INSERT INTO product_options (product_id,sub_unit_id,unit_value_id,product_option_qty,product_option_price,product_option_image,status,created_by) VALUES ?";
                                connection.query(sql_query, [prod_option_data], function (err, results, fields) {
                                    if (err) {
                                        res.json({ status: "Failure", message: "Unable to Save product options details" });
                                    } else {
                                        console.log(results);
                                    }
                                });


                            }
                        });
                    }

                    //Updating Product Discount Data
                    let prod_discounts = dt.product_discounts;
                    if (prod_discounts.length > 0) {
                        prod_discounts.forEach(discount => {
                            if (discount.hidden_discount_id) {
                                var updateDiscount = {
                                    product_id: dt.id,
                                    product_discount_qty: discount.product_discount_qty,
                                    product_discount_priority: discount.product_discount_priority,
                                    product_discount_price: discount.product_discount_price,
                                    product_discount_start_date: discount.product_discount_start_date,
                                    product_discount_end_date: discount.product_discount_end_date,
                                }
                                var update_courses_query = "UPDATE `product_discounts` SET ? WHERE product_discount_id  = ?";
                                connection.query(update_courses_query, [updateDiscount, discount.hidden_discount_id], function (err, results, fields) {
                                    if (err) {
                                        console.log(err);
                                        res.json({ status: "Failure", message: "Unable to Update product discounts details" });
                                    } else {
                                        console.log(results);
                                    }
                                });

                            } else {

                                let prod_discount_data = [[
                                    dt.id,
                                    discount.product_discount_qty,
                                    discount.product_discount_priority,
                                    discount.product_discount_price,
                                    discount.product_discount_start_date,
                                    discount.product_discount_end_date,
                                    0, 1
                                ]];

                                let sql_query = "INSERT INTO product_discounts (product_id,product_discount_qty,product_discount_priority,product_discount_price,product_discount_start_date,product_discount_end_date,status,created_by) VALUES ?";
                                connection.query(sql_query, [prod_discount_data], function (err, results, fields) {
                                    if (err) {
                                        res.json({ status: "Failure", message: "Unable to Save product discounts details" });
                                    } else {
                                        console.log(results);
                                    }
                                });



                            }
                        });
                    }

                    //Updating Product Specials Data
                    let prod_specials = dt.product_specials;
                    if (prod_specials.length > 0) {
                        prod_specials.forEach(special => {
                            if (special.hidden_spl_id) {
                                var updateSpecial = {
                                    product_id: dt.id,
                                    product_special_priority: special.product_special_priority,
                                    product_special_price: special.product_special_price,
                                    product_special_start_date: special.product_special_start_date,
                                    product_special_end_date: special.product_special_end_date,
                                }
                                var update_courses_query = "UPDATE `product_specials` SET ? WHERE product_special_id = ?";
                                connection.query(update_courses_query, [updateSpecial, special.hidden_spl_id], function (err, results, fields) {
                                    if (err) {
                                        console.log(err);
                                        res.json({ status: "Failure", message: "Unable to Update product specials details" });
                                    } else {
                                        console.log(results);
                                    }
                                });

                            } else {

                                let prod_special_data = [[
                                    dt.id,
                                    special.product_special_priority,
                                    special.product_special_price,
                                    special.product_special_start_date,
                                    special.product_special_end_date,
                                    0, 1
                                ]];

                                let sql_query = "INSERT INTO product_specials (product_id,product_special_priority,product_special_price,product_special_start_date,product_special_end_date,status,created_by) VALUES ?";
                                connection.query(sql_query, [prod_special_data], function (err, results, fields) {
                                    if (err) {
                                        res.json({ status: "Failure", message: "Unable to Save product specials details" });
                                    } else {
                                        console.log(results);
                                    }
                                });


                            }
                        });
                    }
                }
                res.json({
                    status: "Success",
                    message: "Successfully Updated Vendor Product details",
                });
            }
        });
    }

}



// show_products_by_categories

exports.show_products_by_categories = (req, res, next) => {
    let dt = req.body;
    let sql_query = `SELECT product_id,product_name FROM product_details WHERE category_id=${dt.category_id} and sub_category_id=${dt.sub_category_id} and 
    sub_category2_id=${dt.sub_category2_id} and product_type_id=${dt.product_type_id} and brand_id=${dt.brand_id}`;

    connection.query(sql_query, function (err, results, fields) {
        if (err) {
            console.log(err);
            res.json({ status: "Failure", message: "Unable to Fetch products by categories" });
        } else {
            console.log(results);
            res.json({
                status: "Success",
                message: "Successfully Fetch products by categories",
                data: results
            });
        }
    });
}

// fetch_all_active_product_data

exports.fetch_all_active_product_data = (req, res, next) => {
    let prod_data = [];
    let sql_query = "SELECT * FROM  product_details where status=1 order by product_id";
    connection.query(sql_query, async function (err, results, fields) {
        if (err) {
            console.log(err);
            res.json({ status: "Failure", message: "Unable to Fetch active product details" });
        } else {
            console.log(results);
            dataArray = { product: {}, };
            dataArray['product'] = [];

            for (let i = 0; i < results.length; i++) {
                console.log(dataArray)
                let data = {
                    product_id: results[i].product_id,
                    product_name: results[i].product_name,
                }
                if (data.product_id != null) dataArray['product'].push(data);

                let unit_data = '';
                await getProductsAverageRatingsData(results[i].product_id).then((data) => {
                    unit_data = data;
                    console.log('=======================unit_data===================');
                    console.log(unit_data);
                });
                if (unit_data.length > 0) {

                    for (let j = 0; j < unit_data.length; j++) {
                        //   if (!dataArray['product'][unit_data[i].product_id]) {
                        // dataArray['product'][unit_data[i].product_id] = [];
                        //  }

                        console.log(dataArray);
                        let data1 = {
                            unit_id: unit_data[j].unit_id,
                            unit_name: unit_data[j].unit_name,
                        }

                        // if (data1.unit_id != null) dataArray['product'][results[i].product_id].push(data1);
                    }
                }

            }
            res.json({
                status: "Success",
                message: "Successfully Fetch active product details",
                fileURL: fileURL,
                data: dataArray
            });
        }
    });
}

// save_vendor_products_deatils_data

exports.save_vendor_products_deatils_data = (req, res, next) => {


    dt = JSON.parse(req.body.Data);

    console.log("req.body");
    console.log(req.body);

    let created_by = 0;
    if (dt.user_id !== undefined) {
        created_by = dt.user_id;
    }

    if (dt.product_id == "Other") {

        let sql_query = `SELECT * FROM product_details WHERE category_id=${dt.category_id} and sub_category_id=${dt.sub_category_id} and 
        sub_category2_id=${dt.sub_category2_id} and product_type_id=${dt.product_type_id} and brand_id=${dt.brand_id} and 
        product_name ='${dt.product_name}'`;



        connection.query(sql_query, function (err, results, fields) {
            if (err) {
                console.log(err);
                res.json({ status: "Failure", message: "Unable to Save product details" });
            } else {
                if (results && results.length > 0) {
                    res.json({
                        status: "Failure",
                        message: "This Data Already Exist",
                    });
                } else {

                    var values = [[
                        dt.category_id,
                        dt.sub_category_id,
                        dt.sub_category2_id,
                        dt.product_type_id,
                        dt.brand_id,
                        dt.product_name,
                        dt.product_description,
                        dt.product_meta_title,
                        dt.product_meta_description,
                        dt.product_sku,
                        dt.featured_product == true ? 1 : 0,
                        dt.recommended_product == true ? 1 : 0,
                        dt.product_tax_type,
                        dt.product_manufacturer,
                        dt.product_hsn_code,
                        dt.product_image,
                        dt.status,
                        created_by
                    ]];
                    console.log(values);
                    // return false;
                    let sql_query = `INSERT INTO product_details (category_id,sub_category_id,sub_category2_id,product_type_id,
                        brand_id,product_name,product_description,product_meta_title,product_meta_description,sku,featured_product,
                        recommended_product,tax_type_id,manufacturer_id,product_hsn_code,product_image,status,created_by) VALUES ?`;
                    connection.query(sql_query, [values], function (err, results, fields) {
                        if (err) {
                            console.log(err);
                            res.json({ status: "Failure", message: "Unable to Save product details" });
                        } else {
                            let insertId = results.insertId;
                            if (insertId) {

                                //related product 
                                let rel_products = dt.related_products;
                                if (rel_products.length > 0) {
                                    let relatated_data = [];
                                    for (let i = 0; i < rel_products.length; i++) {
                                        relatated_data[i] = [insertId, rel_products[i], 0, created_by];
                                    }
                                    let sql_query = "INSERT INTO related_products (product_id,related_product,status,created_by) VALUES ?";
                                    connection.query(sql_query, [relatated_data], function (err, results, fields) {
                                        if (err) {
                                            res.json({ status: "Failure", message: "Unable to Save product details" });
                                        } else {
                                            console.log(results);
                                        }
                                    });

                                }
                                //product sub Images
                                let prod_sub_img = dt.product_sub_images;
                                if (prod_sub_img.length > 0) {
                                    let prod_sub_img_data = [];
                                    for (let i = 0; i < prod_sub_img.length; i++) {
                                        prod_sub_img_data[i] = [insertId, prod_sub_img[i].product_sub_image, prod_sub_img[i].product_sub_image_sort_order, 0, created_by];
                                    }
                                    let sql_query = "INSERT INTO product_sub_images (product_id,product_sub_image_name,sort_order,status,created_by) VALUES ?";
                                    connection.query(sql_query, [prod_sub_img_data], function (err, results, fields) {
                                        if (err) {
                                            res.json({ status: "Failure", message: "Unable to Save product Sub Images details" });
                                        } else {
                                            console.log(results);
                                        }
                                    });
                                }
                                // Inserting Vendor Product Data
                                saveVendorProductData(dt, insertId, created_by);
                            }
                            console.log(results);
                            res.json({
                                status: "Success",
                                message: "Successfully Saved Product details",
                            });
                        }
                    });
                }
            }
        });
    } else {
        saveVendorProductData(dt, dt.product_id, created_by);
        res.json({
            status: "Success",
            message: "Successfully Saved Product details",
        });
    }
    // return false;



}

function saveVendorProductData(dt, insertId, created_by) {
    let vendor_id = dt.vendor_id;

    var vendor_values = [[
        vendor_id,
        insertId,
        dt.product_base_price,
        dt.product_quantity,
        dt.product_minimun_qty,
        dt.product_stock_status,
        dt.product_warranty,
        dt.product_return_policy,
        0,
        created_by
    ]];
    console.log(vendor_values);
    // return false;
    let sql_query = "INSERT INTO vendor_product_details (vendor_id,product_id,base_price,total_quantity,minimum_quantity,stock_status_id,product_warranty,product_return_policy,status,created_by) VALUES ?";

    connection.query(sql_query, [vendor_values], function (err, results, fields) {
        if (err) {
            console.log(err);
            // res.json({ status: "Failure", message: "Unable to save Vendor product details" });
        } else {

            let vendor_insertId = results.insertId;
            if (vendor_insertId) {

                let prod_options = dt.product_options;
                if (prod_options.length > 0) {
                    let prod_option_data = [];
                    for (let i = 0; i < prod_options.length; i++) {
                        prod_option_data[i] = [vendor_insertId, prod_options[i].model_type_id, prod_options[i].thickness_dimension_id,
                            prod_options[i].color_id, prod_options[i].unit_id,
                            prod_options[i].sub_unit_id, prod_options[i].unit_value_id, prod_options[i].product_option_qty, prod_options[i].product_option_price,
                            prod_options[i].product_option_image, prod_options[i].total_product_weight, 0, created_by];
                    }
                    let sql_query = "INSERT INTO product_options (vendor_product_id,model_type_id,thickness_dimension_id,color_id,unit_id,sub_unit_id,unit_value_id,product_option_qty,product_option_price,product_option_image,total_product_weight,status,created_by) VALUES ?";
                    connection.query(sql_query, [prod_option_data], function (err, results, fields) {
                        if (err) {
                            console.log(err);
                            // res.json({ status: "Failure", message: "Unable to Save product options details" });
                        } else {
                            console.log(results);
                        }
                    });

                }
                //product discounts
                let prod_discounts = dt.product_discounts;
                if (prod_discounts.length > 0) {
                    let prod_discount_data = [];
                    for (let i = 0; i < prod_discounts.length; i++) {
                        prod_discount_data[i] = [vendor_insertId, prod_discounts[i].product_discount_qty, prod_discounts[i].product_discount_priority, prod_discounts[i].product_discount_price, prod_discounts[i].product_discount_start_date, prod_discounts[i].product_discount_end_date, 0, created_by];
                    }
                    let sql_query = "INSERT INTO product_discounts (vendor_product_id,product_discount_qty,product_discount_priority,product_discount_price,product_discount_start_date,product_discount_end_date,status,created_by) VALUES ?";
                    connection.query(sql_query, [prod_discount_data], function (err, results, fields) {
                        if (err) {
                            console.log(err);
                            // res.json({ status: "Failure", message: "Unable to Save product discounts details" });
                        } else {
                            console.log(results);
                        }
                    });

                }

                //product specials
                let prod_specials = dt.product_specials;
                if (prod_specials.length > 0) {
                    let prod_special_data = [];
                    for (let i = 0; i < prod_specials.length; i++) {
                        prod_special_data[i] = [vendor_insertId, prod_specials[i].product_special_priority, prod_specials[i].product_special_price, prod_specials[i].product_special_start_date, prod_specials[i].product_special_end_date, 0, created_by];
                    }
                    let sql_query = "INSERT INTO product_specials (vendor_product_id,product_special_priority,product_special_price,product_special_start_date,product_special_end_date,status,created_by) VALUES ?";
                    connection.query(sql_query, [prod_special_data], function (err, results, fields) {
                        if (err) {
                            console.log(err);
                            // res.json({ status: "Failure", message: "Unable to Save product specials details" });
                        } else {
                            console.log(results);
                        }
                    });

                }
            }

        }
    });
    // return true;
}

// fetch_vendor_product_data_by_id
exports.fetch_vendor_product_data_by_id = (req, res, next) => {
    if (!req.params.id) {
        res.json({ status: "failure", message: "Failed to update" });
    } else {
        var sql_query = `SELECT * FROM vendor_product_details join product_details on product_details.product_id=vendor_product_details.product_id  WHERE vendor_product_id =${req.params.id}`;
        connection.query(sql_query, async function (err, results, fields) {
            if (err) {
                console.log(err);
                res.json({ status: "Failure", message: "Unable to Fetch Vendor Product details by id" });

            } else {

                var vendor_product_option_data = '';
                var vendor_product_discount_data = '';
                var vendor_product_special_data = '';

                if (results.length > 0) {

                    //Fecthing product option Data
                    await getProductOptionData(req.params.id).then((data) => {
                        vendor_product_option_data = data;
                        console.log('=======================vendor_product_option_data===================');
                        console.log(vendor_product_option_data);
                    });

                    //Fecthing product discounts Data
                    await getProductDiscountData(req.params.id).then((data) => {
                        vendor_product_discount_data = data;
                        console.log('=======================vendor_product_discount_data===================');
                        console.log(vendor_product_discount_data);
                    });

                    //Fecthing product special Data
                    await getProductSpecialData(req.params.id).then((data) => {
                        vendor_product_special_data = data;
                        console.log('=======================vendor_product_special_data===================');
                        console.log(vendor_product_special_data);
                    });

                }
                res.json({
                    status: "Success",
                    message: "Successfully Fetched Vendor Product details by id",
                    image_path: fileURL,
                    vendor_product_option_data: vendor_product_option_data,
                    vendor_product_discount_data: vendor_product_discount_data,
                    vendor_product_special_data: vendor_product_special_data,
                    data: results
                });
            }
        });
    }

}

// update_vendor_product_details_data_by_id

exports.update_vendor_product_details_data_by_id = (req, res, next) => {

    dt = JSON.parse(req.body.Data);

    console.log("req.body");
    console.log(req.body);
    let created_by = 0;
    if (dt.user_id !== undefined) {
        created_by = dt.user_id;
    }

    if (!dt) {
        res.json({ status: "failure", message: err });
    } else {
        var data = {
            // vendor_id: dt.vendor_id,
            vendor_id: dt.vendor_id,
            product_id: dt.product_id,
            base_price: dt.product_base_price,
            total_quantity: dt.product_quantity,
            minimum_quantity: dt.product_minimun_qty,
            stock_status_id: dt.product_sku,
            product_warranty: dt.product_warranty,
            product_return_policy: dt.product_return_policy,
            created_by: dt.created_by
        }
        var sql_query = "UPDATE `vendor_product_details` SET ? WHERE vendor_product_id= ?";
        connection.query(sql_query, [data, dt.id], function (err, results, fields) {
            console.log(err);
            if (err) {
                res.json({ status: "Unable to update Vendor Product details", message: err });
            } else {

                let insertId = dt.id;
                if (insertId) {
                    let rel_products = dt.related_products;
                    //Updating Product Option Data
                    let prod_options = dt.product_options;
                    if (prod_options.length > 0) {
                        prod_options.forEach(element => {
                            if (element.hidden_opt_id) {
                                //Updating Review Data
                                var updateOption = {
                                    vendor_product_id: dt.id,
                                    model_type_id: element.model_type_id,
                                    thickness_dimension_id: element.thickness_dimension_id,
                                    color_id: element.color_id,
                                    unit_id: element.unit_id,
                                    unit_value_id: element.unit_value_id,
                                    product_option_qty: element.product_option_qty,
                                    product_option_price: element.product_option_price,
                                    product_option_image: element.product_option_image,
                                    total_product_weight: element.total_product_weight,
                                }
                                var update_courses_query = "UPDATE `product_options` SET ? WHERE product_option_id = ?";
                                connection.query(update_courses_query, [updateOption, element.hidden_opt_id], function (err, results, fields) {
                                    if (err) {
                                        console.log(err);
                                        res.json({ status: "Failure", message: "Unable to Update vendor product options details" });
                                    } else {
                                        console.log(results);
                                    }
                                });

                            } else {
                                let prod_option_data = [[dt.id, element.model_type_id, element.thickness_dimension_id,
                                element.color_id, element.unit_id,
                                element.sub_unit_id, element.unit_value_id, element.product_option_qty, element.product_option_price,
                                element.product_option_image, element.total_product_weight, 0, created_by]];

                                let sql_query = "INSERT INTO product_options (vendor_product_id,model_type_id,thickness_dimension_id,color_id,unit_id,sub_unit_id,unit_value_id,product_option_qty,product_option_price,product_option_image,total_product_weight,status,created_by) VALUES ?";

                                connection.query(sql_query, [prod_option_data], function (err, results, fields) {
                                    if (err) {
                                        console.log(err);
                                        res.json({ status: "Failure", message: "Unable to Save vendor product options details" });
                                    } else {
                                        console.log(results);
                                    }
                                });


                            }
                        });
                    }

                    //Updating Product Discount Data
                    let prod_discounts = dt.product_discounts;
                    if (prod_discounts.length > 0) {
                        prod_discounts.forEach(discount => {
                            if (discount.hidden_discount_id) {
                                var updateDiscount = {
                                    vendor_product_id: dt.id,
                                    product_discount_qty: discount.product_discount_qty,
                                    product_discount_priority: discount.product_discount_priority,
                                    product_discount_price: discount.product_discount_price,
                                    product_discount_start_date: discount.product_discount_start_date,
                                    product_discount_end_date: discount.product_discount_end_date,
                                }
                                var update_courses_query = "UPDATE `product_discounts` SET ? WHERE product_discount_id  = ?";
                                connection.query(update_courses_query, [updateDiscount, discount.hidden_discount_id], function (err, results, fields) {
                                    if (err) {
                                        console.log(err);
                                        res.json({ status: "Failure", message: "Unable to Update vendor product discounts details" });
                                    } else {
                                        console.log(results);
                                    }
                                });

                            } else {

                                let prod_discount_data = [[
                                    dt.id,
                                    discount.product_discount_qty,
                                    discount.product_discount_priority,
                                    discount.product_discount_price,
                                    discount.product_discount_start_date,
                                    discount.product_discount_end_date,
                                    0, 1
                                ]];

                                let sql_query = "INSERT INTO product_discounts (vendor_product_id,product_discount_qty,product_discount_priority,product_discount_price,product_discount_start_date,product_discount_end_date,status,created_by) VALUES ?";
                                connection.query(sql_query, [prod_discount_data], function (err, results, fields) {
                                    if (err) {
                                        console.log(err);
                                        res.json({ status: "Failure", message: "Unable to Save vendor product discounts details" });
                                    } else {
                                        console.log(results);
                                    }
                                });



                            }
                        });
                    }

                    //Updating Product Specials Data
                    let prod_specials = dt.product_specials;
                    if (prod_specials.length > 0) {
                        prod_specials.forEach(special => {
                            if (special.hidden_spl_id) {
                                var updateSpecial = {
                                    vendor_product_id: dt.id,
                                    product_special_priority: special.product_special_priority,
                                    product_special_price: special.product_special_price,
                                    product_special_start_date: special.product_special_start_date,
                                    product_special_end_date: special.product_special_end_date,
                                }
                                var update_courses_query = "UPDATE `product_specials` SET ? WHERE product_special_id = ?";
                                connection.query(update_courses_query, [updateSpecial, special.hidden_spl_id], function (err, results, fields) {
                                    if (err) {
                                        console.log(err);
                                        res.json({ status: "Failure", message: "Unable to Update Vendor product specials details" });
                                    } else {
                                        console.log(results);
                                    }
                                });

                            } else {

                                let prod_special_data = [[
                                    dt.id,
                                    special.product_special_priority,
                                    special.product_special_price,
                                    special.product_special_start_date,
                                    special.product_special_end_date,
                                    0, 1
                                ]];

                                let sql_query = "INSERT INTO product_specials (vendor_product_id,product_special_priority,product_special_price,product_special_start_date,product_special_end_date,status,created_by) VALUES ?";
                                connection.query(sql_query, [prod_special_data], function (err, results, fields) {
                                    if (err) {
                                        console.log(err);
                                        res.json({ status: "Failure", message: "Unable to Save Vendor product specials details" });
                                    } else {
                                        console.log(results);
                                    }
                                });


                            }
                        });
                    }

                }
                res.json({
                    status: "Success",
                    message: "Successfully Updated Vendor Product details",
                });
            }
        });
    }

}

// fetch_all_vendor_product_details_data

exports.fetch_all_vendor_product_details_data = (req, res, next) => {
    let sql_query = `SELECT
    *
FROM
    vendor_product_details
left JOIN vendor ON vendor.vendor_id = vendor_product_details.vendor_id
left JOIN product_details ON vendor_product_details.product_id = product_details.product_id
left JOIN category ON category.category_id = product_details.category_id
left JOIN sub_category ON sub_category.sub_category_id = product_details.sub_category_id`;
    connection.query(sql_query, function (err, results, fields) {
        if (err) {
            console.log(err);
            res.json({ status: "Failure", message: "Unable to Fetch all vendor product details" });
        } else {
            console.log(results);
            res.json({
                status: "Success",
                message: "Successfully Fetched All vendor product details",
                fileURL: fileURL,
                data: results
            });
        }
    });
}

exports.fetch_all_active_vendor_product_details_data = (req, res, next) => {
    let sql_query = `SELECT
    *
FROM
    vendor_product_details
left JOIN vendor ON vendor.vendor_id = vendor_product_details.vendor_id
left JOIN product_details ON vendor_product_details.product_id = product_details.product_id
left JOIN category ON category.category_id = product_details.category_id
left JOIN sub_category ON sub_category.sub_category_id = product_details.sub_category_id where vendor_product_details.status=1`;
    connection.query(sql_query, function (err, results, fields) {
        if (err) {
            console.log(err);
            res.json({ status: "Failure", message: "Unable to Fetch all vendor product details" });
        } else {
            console.log(results);
            res.json({
                status: "Success",
                message: "Successfully Fetched All vendor product details",
                fileURL: fileURL,
                data: results
            });
        }
    });
}

function getProductsAverageRatingsData(id) {

    return new Promise((resolve, reject) => {
        let query = `SELECT DISTINCT
        product_details.unit_id,
        unit_master.unit_name
    FROM
        product_details
    JOIN unit_master ON unit_master.unit_id = product_details.unit_id
    WHERE
        product_details.product_id = ${id} AND product_details.status = 1
    ORDER BY
        product_details.product_id`;
        connection.query(query, function (err, results, fields) {
            if (err) return reject(err);
            console.log('results');
            console.log(results);
            resolve(results);
        });
    });
}

// fetch_product_unit_data

exports.fetch_product_unit_data = (req, res, next) => {
    let dt = req.body;
    let sql_query = `SELECT DISTINCT
    product_details.unit_id,
    unit_master.unit_name
FROM
    product_details
JOIN unit_master ON unit_master.unit_id = product_details.unit_id
WHERE
    product_details.product_id = ${dt.id} AND product_details.status = 1
ORDER BY
    product_details.product_id`;
    connection.query(sql_query, async function (err, results, fields) {
        if (err) {
            console.log(err);
            res.json({ status: "Failure", message: "Unable to Fetch product unit details" });
        } else {
            dataArray = { unit: {} };
            for (let i = 0; i < results.length; i++) {
                if (!dataArray['unit'][dt.id]) {
                    dataArray['unit'][dt.id] = [];
                }
                let data = {
                    unit_id: results[i].unit_id,
                    unit_name: results[i].unit_name,
                }

                if (data.unit_id != null) dataArray['unit'][dt.id].push(data);
                if (data.unit_id != null) dataArray['unit'][dt.id].push(['sub_unit']);

                console.log(dataArray['unit'][dt.id]['sub_unit']);

                if (!dataArray['unit'][dt.id]['sub_unit']) {
                    dataArray['unit'][dt.id]['sub_unit'] = [];
                }
                // dataArray['unit'][dt.id]['sub_unit'][dt.id].push(data)

            }
            console.log(results);
            res.json({
                status: "Success",
                message: "Successfully Fetch product unit details",
                data: dataArray
            });
        }
    });
}

// update_vendor_product_status_data_by_id
exports.update_vendor_product_status_data_by_id = (req, res, next) => {
    if (!req.params.id) {
        res.json({ status: "failure", message: "Failed to update" });
    } else {
        var sql_query = "UPDATE `vendor_product_details` SET ? WHERE vendor_product_id= ?";
        connection.query(sql_query, [req.body, req.params.id], function (err, results, fields) {
            if (err) {
                res.json({ status: "Failure", message: "Unable to Update Vendor Product Status details" });

            } else {
                res.json({
                    status: "Success",
                    message: "Successfully Updated Vendor  Product Status details",
                    data: results
                });
            }
        });
    }

}

//Delete Vendor Product Details Data by Id
exports.delete_vendor_product_details_data_by_id = (req, res, next) => {
    let sql_query = "DELETE FROM `vendor_product_details` WHERE vendor_product_id = ?";

    connection.query(sql_query, [req.params.id], function (err, results, fields) {
        if (err) {
            res.json({ status: "Failure", message: "Unable to Delete Vendor Product Details" });
        } else {
            res.json({
                status: "Success",
                message: "Successfully Deleted Vendor Product Details"
            });
        }
    });
}

// fetch_all_active_vendor_data
exports.fetch_all_active_vendor_data = (req, res, next) => {
    let sql_query = "Select vendor_id,vendor_name FROM `vendor` WHERE status = 1";

    connection.query(sql_query, function (err, results, fields) {
        if (err) {
            console.log(err);
            res.json({ status: "Failure", message: "Unable to Delete Vendor Details " });
        } else {
            console.log(results);

            res.json({
                status: "Success",
                message: "Successfully Deleted Vendor Details ",
                data: results
            });
        }
    });
}

// fetch_product_sub_unit_data

exports.fetch_product_sub_unit_data = (req, res, next) => {
    let dt = req.body;
    let sql_query = `SELECT DISTINCT
    product_options.sub_unit_id,
    sub_unit_master.sub_unit_name
FROM
    product_details
JOIN product_options ON product_details.product_id = product_options.product_id
JOIN sub_unit_master ON sub_unit_master.sub_unit_id = product_options.sub_unit_id
WHERE product_options.product_id=${dt.product_id} and
    product_details.unit_id =  ${dt.id} `;
    connection.query(sql_query, async function (err, results, fields) {
        if (err) {
            console.log(err);
            res.json({ status: "Failure", message: "Unable to Fetch product sub unit details" });
        } else {
            console.log(results);
            res.json({
                status: "Success",
                message: "Successfully Fetch product sub unit details",
                data: results
            });
        }
    });
}
// fetch_all_active_model_types_data
exports.fetch_all_active_model_types_data = (req, res, next) => {
    console.log("req.body", req.body)
    let dt = req.body;
    let sql_query = `SELECT * FROM model_type WHERE category_id= ${dt.category_id} AND sub_category_id = ${dt.sub_category_id}
    AND sub_category2_id = ${dt.sub_category2_id} AND product_type_id = ${dt.product_type_id} AND brand_id = ${dt.brand_id}  AND status = 1`;
    connection.query(sql_query, function (err, results, fields) {
        if (err) {
            res.json({ status: "Failure", message: "Unable to Fetch Model Types details" });
        } else {
            res.json({
                status: "Success",
                message: "Successfully Fetched Model Types details",
                data: results
            });
        }
    });

}

// fetch_all_active_thickness_dimension_data
exports.fetch_all_active_thickness_dimension_data = (req, res, next) => {
    console.log("req.body", req.body)
    let dt = req.body;
    let sql_query = `SELECT * FROM thickness_and_dimension WHERE  model_type_id = ${dt.model_type_id}  AND status = 1`;

    connection.query(sql_query, function (err, results, fields) {
        if (err) {
            res.json({ status: "Failure", message: "Unable to Fetch Dimension Thickness details" });
        } else {
            res.json({
                status: "Success",
                message: "Successfully Fetched Dimension Thickness details",
                data: results
            });
        }
    });
}


exports.fetch_product_unit_value_data = (req, res, next) => {
    let dt = req.body;
    let sql_query = `SELECT DISTINCT
    product_options.product_option_id,
    product_options.unit_value_id,
    unit_value_master.unit_value_name
FROM
    product_options
JOIN unit_value_master ON unit_value_master.unit_value_id = product_options.unit_value_id
WHERE product_options.product_id=${dt.product_id} and
    product_options.sub_unit_id =  ${dt.id} `;
    connection.query(sql_query, async function (err, results, fields) {
        if (err) {
            console.log(err);
            res.json({ status: "Failure", message: "Unable to Fetch product unit value details" });
        } else {
            console.log(results);
            res.json({
                status: "Success",
                message: "Successfully Fetch product unit value details",
                data: results
            });
        }
    });

}
// fetch_all_active_color_data

exports.fetch_all_active_color_data = (req, res, next) => {
    console.log("req.body", req.body)
    let dt = req.body;
    let sql_query = `SELECT * FROM color WHERE category_id= ${dt.category_id} AND sub_category_id = ${dt.sub_category_id}
    AND sub_category2_id = ${dt.sub_category2_id} AND product_type_id = ${dt.product_type_id} AND brand_id = ${dt.brand_id}  AND status = 1`;
    connection.query(sql_query, function (err, results, fields) {
        if (err) {
            res.json({ status: "Failure", message: "Unable to Fetch Color details" });
        } else {
            res.json({
                status: "Success",
                message: "Successfully Fetched Color details",
                data: results
            });
        }
    });
}

// fetch_sub_unit_value_id_by_using_option_id
exports.fetch_sub_unit_value_id_by_using_option_id = (req, res, next) => {
    let sql_query = `SELECT *    
FROM
    product_options
WHERE
    product_option_id =  ${req.params.id} `;
    connection.query(sql_query, async function (err, results, fields) {
        if (err) {
            console.log(err);
            res.json({ status: "Failure", message: "Unable to Fetch sub unit value id by using option id details" });
        } else {
            console.log(results);
            res.json({
                status: "Success",
                message: "Successfully Fetch  sub unit value id by using option id details",
                data: results
            });
        }
    });
}


//Single row product details by id
exports.get_product_detail_by_id = (req, res, next) => {

    console.log(req.body);
    connection.query('select * from product_details where (status = 1 and  product_id = ? )', req.body.product_id, (err, result, field) => {
        if (err) {
            return console.log(err);
        } else {
            console.log(result);
            let data = {};
            let dataArray = [];

            for (i = 0; i < result.length; i++) {
                if (data[result[i].product_id] == undefined) {
                    data[result[i].product_id] = {

                        product_id: result[i].product_id,
                        product_name: result[i].product_name,
                        product_description: result[i].product_description,
                        product_meta_title: result[i].product_meta_title,
                        product_meta_description: result[i].product_meta_description,
                        sku: result[i].sku,
                        featured_product: result[i].featured_product,
                        recommended_product: result[i].recommended_product,
                        tax_type_id: result[i].tax_type_id,
                        manufacturer_id: result[i].manufacturer_id,
                        category_id: result[i].category_id,
                        sub_category_id: result[i].sub_category_id,
                        sub_category2_id: result[i].sub_category2_id,
                        product_type_id: result[i].product_type_id,
                        product_hsn_code: result[i].product_hsn_code,
                        product_commission: result[i].product_commission,
                        sub_category_id: result[i].sub_category_id,
                        product_image: fileURL + result[i].product_image,
                        created_by: result[i].created_by,

                    }
                    dataArray.push(data[result[i].product_id]);
                }

            }

            res.json({
                statuscode: 200,
                status: "Success",
                message: "Product Detail Get Successfully",
                image_path: fileURL,
                data: dataArray
            });
        }
    });
}
