exports.fetch_register_data = (req, res, next) => {
    res.json({
        status: "Success",
        message: "Successfully Fetch user details",
    });
}
exports.save_register_data = (req, res, next) => {

    res.json({
        status: "Success",
        message: "Successfully Saved user details",
    });

}