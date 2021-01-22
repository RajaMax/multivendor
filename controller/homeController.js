const { connection } = require('../db/db.js');
const { text } = require('express');
const url = 'http://dev.dxminds.online:6500/';
const categoryImageURL = url + 'category-banner/';
const homeBanner1ImageURL = url + 'home-banner1/';
const homeBanner2ImageURL = url + 'home-banner2/';
const homeBanner3ImageURL = url + 'home-banner3/';
const homeBanner4ImageURL = url + 'home-banner4/';
const returnPolicyImageURL = url + 'return-policy/';
const productImageURL = url + 'product-images/';


exports.fetch_all_mbl_home_screen_api_details = (req, res, next) => {
    let sql_query = "SELECT * FROM category  WHERE status = 1 ORDER BY category_id";
    connection.query(sql_query, async function (err, results, fields) {
        if (err) {
            console.log(err);
            res.json({ status: "Failure", message: "Unable to Fetch home screen API details" });
        } else {
            let dataArray = [];
            let data = {};


            data = {
                category_details: [],
                updated_return_policy_details: [],
                home_banner1_details: [],
                home_banner2_details: [],
                home_banner3_details: [],
                home_banner4_details: [],
                deals_of_the_day_details: [],
                featured_product_details: [],
                recommended_product_details: [],
            }
            if (results && results.length) {
                for (let i = 0; i < results.length; i++) {
                    let category = {
                        category_id: results[i].category_id,
                        category_name: results[i].category_name,
                        category_image: categoryImageURL + results[i].category_image,
                    }
                    data['category_details'].push(category);
                }
            }
            //get Return Policy Details
            return_policy = '';
            await getReturnPolicyDetails().then((data) => {
                return_policy = data;
                console.log('=======================return_policy===================');
                console.log(return_policy);
            });
            if (return_policy.length > 0) {
                for (let i = 0; i < return_policy.length; i++) {
                    let reurn_data = {
                        return_policy_id: return_policy[i].return_policy_id,
                        title: return_policy[i].title,
                        description: return_policy[i].description,
                        policy_image: returnPolicyImageURL + return_policy[i].policy_image,

                    }
                    data['updated_return_policy_details'].push(reurn_data);
                }
            }

            //get Home Banner1 Details
            home_banner1 = '';
            await getHomeBanner1Details().then((data) => {
                home_banner1 = data;
                console.log('=======================home_banner1===================');
                console.log(home_banner1);
            });
            if (home_banner1.length > 0) {
                for (let i = 0; i < home_banner1.length; i++) {
                    let home1_data = {
                        home_banner1_id: home_banner1[i].home_banner1_id,
                        home_banner1_name: home_banner1[i].home_banner1_name,
                        home_banner1_image: homeBanner1ImageURL + home_banner1[i].home_banner1_image,

                    }
                    data['home_banner1_details'].push(home1_data);
                }
            }

            //get Home Banner2 Details
            home_banner2 = '';
            await getHomeBanner2Details().then((data) => {
                home_banner2 = data;
                console.log('=======================home_banner2===================');
                console.log(home_banner2);
            });
            if (home_banner2.length > 0) {
                for (let i = 0; i < home_banner2.length; i++) {
                    let home2_data = {
                        home_banner2_id: home_banner2[i].home_banner2_id,
                        home_banner2_name: home_banner2[i].home_banner2_name,
                        home_banner2_image: homeBanner2ImageURL + home_banner2[i].home_banner2_image,

                    }
                    data['home_banner2_details'].push(home2_data);
                }
            }

            //get Home Banner3 Details
            home_banner3 = '';
            await getHomeBanner3Details().then((data) => {
                home_banner3 = data;
                console.log('=======================home_banner3===================');
                console.log(home_banner3);
            });
            if (home_banner3.length > 0) {
                for (let i = 0; i < home_banner3.length; i++) {
                    let home3_data = {
                        home_banner3_id: home_banner3[i].home_banner3_id,
                        home_banner3_name: home_banner3[i].home_banner3_name,
                        home_banner3_image: homeBanner3ImageURL + home_banner3[i].home_banner3_image,

                    }
                    data['home_banner3_details'].push(home3_data);
                }
            }

            //get Home Banner4 Details
            home_banner4 = '';
            await getHomeBanner4Details().then((data) => {
                home_banner4 = data;
                console.log('=======================home_banner4===================');
                console.log(home_banner4);
            });
            if (home_banner4.length > 0) {
                for (let i = 0; i < home_banner4.length; i++) {
                    let home3_data = {
                        home_banner4_id: home_banner4[i].home_banner4_id,
                        home_banner4_name: home_banner4[i].home_banner4_name,
                        home_banner4_image: homeBanner4ImageURL + home_banner4[i].home_banner4_image,

                    }
                    data['home_banner4_details'].push(home3_data);
                }
            }

            //get Deals of the Day Details
            deals_day = '';
            await getDealsOfTheDayDetails().then((data) => {
                deals_day = data;
                console.log('=======================deals_day===================');
                console.log(deals_day);
            });
            if (deals_day.length > 0) {
                for (let i = 0; i < deals_day.length; i++) {
                    let deals = {
                        vendr_product_id: deals_day[i].vendor_product_id,
                        vendr_id: deals_day[i].vendor_id,
                        product_id: deals_day[i].product_id,
                        product_name: deals_day[i].product_name,
                        product_description: deals_day[i].product_description,
                        product_image: productImageURL + deals_day[i].product_image,
                        base_price: deals_day[i].base_price,
                        total_quantity: deals_day[i].total_quantity,
                        product_warranty: deals_day[i].product_warranty,
                        product_return_policy: deals_day[i].product_return_policy,
                        product_options_id: deals_day[i].product_options_id,
                        unit_id: deals_day[i].unit_id,
                        unit_name: deals_day[i].unit_name,
                        sub_unit_id: deals_day[i].sub_unit_id,
                        sub_unit_name: deals_day[i].sub_unit_name,
                        unit_value_id: deals_day[i].unit_value_id,
                        unit_value_name: deals_day[i].unit_value_name,

                        product_special_id: deals_day[i].product_special_id,
                        product_special_price: deals_day[i].product_special_price,
                        product_special_start_date: deals_day[i].product_special_start_date,
                        product_special_end_date: deals_day[i].product_special_end_date,
                        product_discount_id: deals_day[i].product_discount_id,
                        product_discount_price: deals_day[i].product_discount_price,
                        product_discount_qty: deals_day[i].product_discount_qty,
                        product_discount_start_date: deals_day[i].product_discount_start_date,
                        product_discount_end_date: deals_day[i].product_discount_end_date,

                    }
                    data['deals_of_the_day_details'].push(deals);
                }
            }

            //get Featured Product Details
            featured_list = '';
            await getFeaturedProductDetails().then((data) => {
                featured_list = data;
                console.log('=======================featured_list===================');
                console.log(featured_list);
            });
            if (featured_list.length > 0) {
                let featured_data = {};
                for (let i = 0; i < featured_list.length; i++) {
                    featured_data[featured_list[i].vendor_product_id] = {
                        vendr_product_id: featured_list[i].vendor_product_id,
                        vendr_id: featured_list[i].vendor_id,
                        product_id: featured_list[i].product_id,
                        product_name: featured_list[i].product_name,
                        product_description: featured_list[i].product_description,
                        product_image: productImageURL + featured_list[i].product_image,
                        base_price: featured_list[i].base_price,
                        total_quantity: featured_list[i].total_quantity,
                        product_warranty: featured_list[i].product_warranty,
                        product_return_policy: featured_list[i].product_return_policy,
                        product_options_id: featured_list[i].product_options_id,
                        unit_id: featured_list[i].unit_id,
                        unit_name: featured_list[i].unit_name,
                        sub_unit_id: featured_list[i].sub_unit_id,
                        sub_unit_name: featured_list[i].sub_unit_name,
                        unit_value_id: featured_list[i].unit_value_id,
                        unit_value_name: featured_list[i].unit_value_name,

                        product_special_id: featured_list[i].product_special_id,
                        product_special_price: featured_list[i].product_special_price,
                        product_special_start_date: featured_list[i].product_special_start_date,
                        product_special_end_date: featured_list[i].product_special_end_date,
                        product_discount_id: featured_list[i].product_discount_id,
                        product_discount_price: featured_list[i].product_discount_price,
                        product_discount_qty: featured_list[i].product_discount_qty,
                        product_discount_start_date: featured_list[i].product_discount_start_date,
                        product_discount_end_date: featured_list[i].product_discount_end_date,

                    }
                    data['featured_product_details'].push(featured_data[featured_list[i].vendor_product_id]);
                }
            }

            //get Recommended Product Details
            recommended_list = '';
            await getRecommendedProductDetails().then((data) => {
                recommended_list = data;
                console.log('=======================recommended_list===================');
                console.log(recommended_list);
            });
            if (recommended_list.length > 0) {
                for (let i = 0; i < recommended_list.length; i++) {
                    let recommended_data = {
                        vendr_product_id: recommended_list[i].vendor_product_id,
                        vendr_id: recommended_list[i].vendor_id,
                        product_id: recommended_list[i].product_id,
                        product_name: recommended_list[i].product_name,
                        product_description: recommended_list[i].product_description,
                        product_image: productImageURL + recommended_list[i].product_image,
                        base_price: recommended_list[i].base_price,
                        total_quantity: recommended_list[i].total_quantity,
                        product_warranty: recommended_list[i].product_warranty,
                        product_return_policy: recommended_list[i].product_return_policy,
                        unit_id: recommended_list[i].unit_id,
                        unit_name: recommended_list[i].unit_name,
                        sub_unit_id: recommended_list[i].sub_unit_id,
                        sub_unit_name: recommended_list[i].sub_unit_name,
                        unit_value_id: recommended_list[i].unit_value_id,
                        unit_value_name: recommended_list[i].unit_value_name,

                        product_special_id: recommended_list[i].product_special_id,
                        product_special_price: recommended_list[i].product_special_price,
                        product_special_start_date: recommended_list[i].product_special_start_date,
                        product_special_end_date: recommended_list[i].product_special_end_date,
                        product_discount_id: recommended_list[i].product_discount_id,
                        product_discount_price: recommended_list[i].product_discount_price,
                        product_discount_qty: recommended_list[i].product_discount_qty,
                        product_discount_start_date: recommended_list[i].product_discount_start_date,
                        product_discount_end_date: recommended_list[i].product_discount_end_date,

                    }
                    data['recommended_product_details'].push(recommended_data);
                }
            }


            dataArray.push(data);
            res.json({
                status: "Success",
                message: "Successfully Fetched home screen API  details",
                data: dataArray
            });
        }
    });
}


function getReturnPolicyDetails() {

    return new Promise((resolve, reject) => {
        let query = `SELECT * FROM return_policy WHERE status = 1 ORDER BY return_policy_id `;
        connection.query(query, function (err, results, fields) {
            if (err) return reject(err);
            console.log('results');
            console.log(results);
            resolve(results);
        });
    });
}

function getHomeBanner1Details() {

    return new Promise((resolve, reject) => {
        let query = `SELECT * FROM home_banner1 WHERE status = 1 ORDER BY home_banner1_id  `;
        connection.query(query, function (err, results, fields) {
            if (err) return reject(err);
            console.log('results');
            console.log(results);
            resolve(results);
        });
    });
}
function getHomeBanner2Details() {

    return new Promise((resolve, reject) => {
        let query = `SELECT * FROM home_banner2 WHERE status = 1 ORDER BY home_banner2_id  `;
        connection.query(query, function (err, results, fields) {
            if (err) return reject(err);
            console.log('results');
            console.log(results);
            resolve(results);
        });
    });
}

function getHomeBanner3Details() {

    return new Promise((resolve, reject) => {
        let query = `SELECT * FROM home_banner3 WHERE status = 1 ORDER BY home_banner3_id  `;
        connection.query(query, function (err, results, fields) {
            if (err) return reject(err);
            console.log('results');
            console.log(results);
            resolve(results);
        });
    });
}

function getHomeBanner4Details() {

    return new Promise((resolve, reject) => {
        let query = `SELECT * FROM home_banner4 WHERE status = 1 ORDER BY home_banner4_id  `;
        connection.query(query, function (err, results, fields) {
            if (err) return reject(err);
            console.log('results');
            console.log(results);
            resolve(results);
        });
    });
}

function getFeaturedProductDetails() {
    return new Promise((resolve, reject) => {
        let query = `SELECT
        vendor_product_details.vendor_product_id,
        product_details.product_id,
        product_details.product_name,
        product_details.product_description,
        product_details.featured_product,
        product_details.recommended_product,
        product_details.product_image,
        MIN(vendor_product_details.base_price) AS base_price,
        vendor_product_details.vendor_id,
        vendor_product_details.total_quantity,
        vendor_product_details.status,
        product_options.product_option_id,
        unit_master.unit_id,
        unit_master.unit_name,
        sub_unit_master.sub_unit_id,
        sub_unit_master.sub_unit_name,
        unit_value_master.unit_value_id,
        unit_value_master.unit_value_name,
        product_specials.product_special_id,
        product_specials.product_special_price,
        product_specials.product_special_start_date,
        product_specials.product_special_end_date,
        product_discounts.product_discount_id,
        product_discounts.product_discount_price,
        product_discounts.product_discount_qty,
        product_discounts.product_discount_start_date,
        product_discounts.product_discount_end_date
    FROM
        vendor_product_details
    JOIN product_details ON product_details.product_id = vendor_product_details.product_id
    JOIN product_options ON product_options.vendor_product_id = vendor_product_details.vendor_product_id
    JOIN unit_master ON unit_master.unit_id = product_options.unit_id
    JOIN sub_unit_master ON sub_unit_master.sub_unit_id = product_options.sub_unit_id
    JOIN unit_value_master ON unit_value_master.unit_value_id = product_options.unit_value_id
    LEFT JOIN product_specials ON product_specials.vendor_product_id = vendor_product_details.vendor_product_id AND product_specials.product_special_start_date >= CURDATE() AND product_specials.product_special_end_date <= CURDATE()
    LEFT JOIN product_discounts ON product_discounts.vendor_product_id = vendor_product_details.vendor_product_id AND product_discounts.product_discount_start_date >= CURDATE() AND product_discounts.product_discount_end_date <= CURDATE()
    WHERE
        product_details.status = 1 AND vendor_product_details.status = 1 AND product_options.product_option_price = 0 AND product_details.featured_product = 1
    GROUP BY
        product_details.product_name, product_details.product_description, product_details.featured_product, 
        product_details.recommended_product, product_details.product_image, vendor_product_details.vendor_product_id, 
        vendor_product_details.vendor_id, vendor_product_details.base_price, vendor_product_details.total_quantity, 
        vendor_product_details.status, product_options.product_option_id, unit_master.unit_id, unit_master.unit_name, 
        sub_unit_master.sub_unit_id, sub_unit_master.sub_unit_name, unit_value_master.unit_value_id, unit_value_master.unit_value_name,
         product_specials.product_special_id, product_specials.product_special_price, product_specials.product_special_start_date, 
         product_specials.product_special_end_date, product_discounts.product_discount_id, product_discounts.product_discount_price, product_discounts.product_discount_qty,
         product_discounts.product_discount_start_date, product_discounts.product_discount_end_date`;
        connection.query(query, function (err, results, fields) {
            if (err) return reject(err);
            console.log('results');
            console.log(results);
            resolve(results);
        });
    });
}

function getRecommendedProductDetails() {
    return new Promise((resolve, reject) => {
        let query = `SELECT
        vendor_product_details.vendor_product_id,
        product_details.product_id,
        product_details.product_name,
        product_details.product_description,
        product_details.featured_product,
        product_details.recommended_product,
        product_details.product_image,
        MIN(vendor_product_details.base_price) AS base_price,
        vendor_product_details.vendor_id,
        vendor_product_details.total_quantity,
        vendor_product_details.status,
        product_options.product_option_id,
        unit_master.unit_id,
        unit_master.unit_name,
        sub_unit_master.sub_unit_id,
        sub_unit_master.sub_unit_name,
        unit_value_master.unit_value_id,
        unit_value_master.unit_value_name,
        product_specials.product_special_id,
        product_specials.product_special_price,
        product_specials.product_special_start_date,
        product_specials.product_special_end_date,
        product_discounts.product_discount_id,
        product_discounts.product_discount_price,
        product_discounts.product_discount_qty,
        product_discounts.product_discount_start_date,
        product_discounts.product_discount_end_date
    FROM
        vendor_product_details
    JOIN product_details ON product_details.product_id = vendor_product_details.product_id
    JOIN product_options ON product_options.vendor_product_id = vendor_product_details.vendor_product_id
    JOIN unit_master ON unit_master.unit_id = product_options.unit_id
    JOIN sub_unit_master ON sub_unit_master.sub_unit_id = product_options.sub_unit_id
    JOIN unit_value_master ON unit_value_master.unit_value_id = product_options.unit_value_id
    LEFT JOIN product_specials ON product_specials.vendor_product_id = vendor_product_details.vendor_product_id AND product_specials.product_special_start_date >= CURDATE() AND product_specials.product_special_end_date <= CURDATE()
    LEFT JOIN product_discounts ON product_discounts.vendor_product_id = vendor_product_details.vendor_product_id AND product_discounts.product_discount_start_date >= CURDATE() AND product_discounts.product_discount_end_date <= CURDATE()
    WHERE
        product_details.status = 1 AND vendor_product_details.status = 1 AND product_options.product_option_price = 0 AND product_details.recommended_product = 1
    GROUP BY
        product_details.product_name, product_details.product_description, product_details.featured_product, product_details.recommended_product, product_details.product_image, vendor_product_details.vendor_product_id, vendor_product_details.vendor_id, vendor_product_details.base_price, vendor_product_details.total_quantity, vendor_product_details.status, product_options.product_option_id, unit_master.unit_id, unit_master.unit_name, sub_unit_master.sub_unit_id, sub_unit_master.sub_unit_name, unit_value_master.unit_value_id, unit_value_master.unit_value_name, product_specials.product_special_id, product_specials.product_special_price, product_specials.product_special_start_date, product_specials.product_special_end_date, product_discounts.product_discount_id, product_discounts.product_discount_price, product_discounts.product_discount_qty, product_discounts.product_discount_start_date,
         product_discounts.product_discount_end_date`;
        connection.query(query, function (err, results, fields) {
            if (err) return reject(err);
            console.log('results');
            console.log(results);
            resolve(results);
        });
    });
}


function getDealsOfTheDayDetails() {
    return new Promise((resolve, reject) => {
        let query = `        
        SELECT        
            vendor_product_details.vendor_product_id,        
        product_details.product_id,
            product_details.product_name,        
            product_details.product_description,        
            product_details.featured_product,        
            product_details.recommended_product,        
            product_details.product_image,        
            MIN(vendor_product_details.base_price) AS base_price,        
            vendor_product_details.vendor_id,        
            vendor_product_details.total_quantity,        
            vendor_product_details.status,        
            product_options.product_option_id,        
            unit_master.unit_id,        
            unit_master.unit_name,        
            sub_unit_master.sub_unit_id,        
            sub_unit_master.sub_unit_name,        
            unit_value_master.unit_value_id,        
            unit_value_master.unit_value_name,        
            product_specials.product_special_id,        
            product_specials.product_special_price,        
            product_specials.product_special_start_date,        
            product_specials.product_special_end_date,        
            product_discounts.product_discount_id,    
            product_discounts.product_discount_price,        
            product_discounts.product_discount_qty,        
            product_discounts.product_discount_start_date,        
            product_discounts.product_discount_end_date        
        FROM        
            vendor_product_details    
        JOIN product_details ON product_details.product_id = vendor_product_details.product_id        
        JOIN product_options ON product_options.vendor_product_id = vendor_product_details.vendor_product_id        
        JOIN unit_master ON unit_master.unit_id = product_options.unit_id        
        JOIN sub_unit_master ON sub_unit_master.sub_unit_id = product_options.sub_unit_id        
        JOIN unit_value_master ON unit_value_master.unit_value_id = product_options.unit_value_id        
        LEFT JOIN product_specials ON product_specials.vendor_product_id = vendor_product_details.vendor_product_id AND product_specials.product_special_start_date >= CURDATE() AND product_specials.product_special_end_date <= CURDATE()        
        LEFT JOIN product_discounts ON product_discounts.vendor_product_id = vendor_product_details.vendor_product_id AND product_discounts.product_discount_start_date >= CURDATE() AND product_discounts.product_discount_end_date <= CURDATE()        
        WHERE        
            product_details.status = 1 AND vendor_product_details.status = 1 AND product_options.product_option_price = 0        
        GROUP BY        
            product_details.product_name, product_details.product_description, product_details.featured_product, 
            product_details.recommended_product, product_details.product_image, vendor_product_details.vendor_product_id,
             vendor_product_details.vendor_id, vendor_product_details.base_price, vendor_product_details.total_quantity, 
             vendor_product_details.status, product_options.product_option_id, unit_master.unit_id, unit_master.unit_name, 
             sub_unit_master.sub_unit_id, sub_unit_master.sub_unit_name, unit_value_master.unit_value_id, unit_value_master.unit_value_name,
              product_specials.product_special_id, product_specials.product_special_price, product_specials.product_special_start_date, 
              product_specials.product_special_end_date, product_discounts.product_discount_id, product_discounts.product_discount_price `;
        connection.query(query, function (err, results, fields) {
            if (err) return reject(err);
            console.log('results');
            console.log(results);
            resolve(results);
        });
    });
}
