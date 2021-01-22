const http = require('http');
const express = require('express');
var router = express.Router();
const bodyparser = require('body-parser');
const jwt = require('jsonwebtoken');
const cors = require('cors');
 const morgan = require('morgan');
 const dotenv = require('dotenv');

 const path = require("path");
 const multer = require("multer");

const { mysql } = require('./db/db.js');
const port = process.env.PORT || 6501;
const { connection } = require('./db/db.js');
dotenv.config({ path: './config/config.env' });
var app = express();
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(morgan('common'));
app.use(cors({ origin: '*' }));

app.use(express.static(__dirname + '/public'));


app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

var crud = require('./routes/crudRoute');
var category = require('./routes/categoryRoute');
var subCategory = require('./routes/subCategoryRoute');
var categoryBanner = require('./routes/categoryBannerRoute');
var unit = require('./routes/unitRoute');
var subUnit = require('./routes/subUnitRoute');
var unitValue = require('./routes/unitValueRoute');
var stockStatus = require('./routes/stockStatusRoute');
var productDetails = require('./routes/productRoute');
var login = require('./routes/loginRoute');
var uploadListFile = require('./routes/uploadListRoute');
var customerAddress = require('./routes/customerAddressRoute');
var offerRoute = require('./routes/offerRoute');
var feedbackRoute = require('./routes/feedbackRoute');
var manufacturerRoute = require('./routes/manufacturerRoute');
var featuredProduct = require('./routes/featuredProductRoute');
var recommendedProduct = require('./routes/recommendedProductRoute');
var dealsOfTheDay = require('./routes/dealsOfTheDayRoute');
var shopByCategory = require('./routes/shopByCategoryRoute');
var bankDetails = require('./routes/bankDetailsRoute');

var faq = require('./routes/faqRoute');
var contactus = require('./routes/contactusRoute');
var aboutus = require('./routes/aboutusRoute');
var help = require('./routes/helpRoute');
var term_and_policy = require('./routes/termAndPolicyRoute');
var vendor_enquery = require('./routes/vendorEnqueryRoute');
var idea_section = require('./routes/ideaSectionRoute');
var commision = require('./routes/commisionRoute');
var return_policy = require('./routes/returnPolicyRoute');
var delivery_request = require('./routes/deliveryRequestRoute');
var brand_master = require('./routes/brandMasterRoute');
var order = require('./routes/orderRoute');
var product_type = require('./routes/productTypeRoute');
var sub_category2 = require('./routes/subCategory2Route');
var model_type = require('./routes/modelTypeRoute');
var thickness_and_dimension = require('./routes/thicknessandDimensionRoute');
var color = require('./routes/colorRoute');
var customerEditProfile = require('./routes/customerEditProfileRoute');
var searchBar = require('./routes/searchBarRoute');
var deliveryCharge = require('./routes/deliveryChargeRoute');
var privacyPolicy = require('./routes/privacyPolicyRoute');
var filterAndSorting = require('./routes/filterAndSortingRoute');
var cart = require('./routes/cartRoute');


var homeBanner1 = require('./routes/homeBanner1Route');
var homeBanner2 = require('./routes/homeBanner2Route');
var homeBanner3 = require('./routes/homeBanner3Route');
var homeBanner4 = require('./routes/homeBanner4Route');

var home = require('./routes/homeRoute');
// var rating_and_feedback = require('./routes/ratingAndFeedbackRoute');
var rating_and_feedback = require('./routes/ratingAndFeedbackRoute');
var manual_payment = require('./routes/ManualPaymentRoute');
var vendor_setting = require('./routes/vendorRangeRoute');
var reports = require('./routes/reportsRoute');


var server = app.listen(port,
    () => {
        console.log('Server started at port: ' + port);
    }
);

app.post('/api/hello', (req, res) => {
    return res.status(200).json({
        message: "Hello World"
    })
})
app.post('/api/jwt-login', (req, res) => {
    const user = {
        id: 1,
        username: "Praveen",
        email: "praveen@gmail.com"
    }
    jwt.sign({ user: user }, 'secret', (err, token) => {
        res.json({
            token: token
        })
    })
})

// FORMENT TOKEN
//Authorization :Bearer <access_token>
//Verify Token
// function verifyToken(req, res, next) {
//     //get Auth header Value
//     const bearerHeader = req.headers['Authorization'];

//     //check if bearer is undefined
//     if (typeof bearerHeader !== 'undefined') {
//         //split at space
//         const bearer = bearerHeader.split(' ');
//         //get token form array
//         const bearerToken = bearer[1];
//         //set the token
//         req.token = bearerToken;
//         //next middleware
//         next();
//     } else {
//         //Forbidden
//         res.sendStatus(403);
//     }
// }

app.use('/crud', crud);
app.use('/category', category);
app.use('/sub-category', subCategory);
app.use('/category-banner', categoryBanner);
app.use('/unit', unit);
app.use('/sub-unit', subUnit);
app.use('/unit-value', unitValue);
app.use('/stock-status', stockStatus);
// app.use('/manufacturer', manufacturer);
app.use('/product-details', productDetails);
app.use('/login', login);
app.use('/uploadListFile',uploadListFile);
app.use('/customerAddress',customerAddress);
app.use('/offer',offerRoute)
app.use('/feedback',feedbackRoute)
app.use('/faq', faq);
app.use('/contactus', contactus);
app.use('/aboutus', aboutus);
app.use('/help', help);
app.use('/term_and_policy', term_and_policy);
app.use('/vendor_enquery', vendor_enquery);
app.use('/idea_section', idea_section);
app.use('/commision', commision);
app.use('/return_policy', return_policy);
app.use('/delivery_request', delivery_request);
app.use('/brand_master', brand_master);
app.use('/manufacturer',manufacturerRoute)
app.use('/featuredProduct',featuredProduct)
app.use('/recommendedProduct',recommendedProduct)
app.use('/dealsOfTheDay',dealsOfTheDay)
app.use('/shopByCategory',shopByCategory)
app.use('/order', order);
// app.use('/rating_and_feedback', rating_and_feedback);

app.use('/cart', cart);


app.use('/home-banner1', homeBanner1);
app.use('/home-banner2', homeBanner2);
app.use('/home-banner3', homeBanner3);
app.use('/home-banner4', homeBanner4);
app.use('/product_type',product_type);
app.use('/sub_category2',sub_category2)
app.use('/model_type',model_type)
app.use('/thickness_and_dimension',thickness_and_dimension)
app.use('/color',color)
app.use('/customerEditProfile',customerEditProfile)
app.use('/searchBar',searchBar)
app.use('/deliveryCharge',deliveryCharge)
app.use('/privacyPolicy',privacyPolicy)
app.use('/filter_and_sorting',filterAndSorting)
app.use('/bankDetails',bankDetails)

app.use('/sub_category2',sub_category2);
app.use('/model_type',model_type);
app.use('/thickness_and_dimension',thickness_and_dimension);
app.use('/color',color);

app.use('/home',home);
app.use('/cart', cart);
app.use('/rating_and_feedback', rating_and_feedback);
app.use('/manual_payment', manual_payment);
app.use('/vendor_setting', vendor_setting);
app.use('/reports', reports);








app.use(express.static(__dirname + '/public'));
