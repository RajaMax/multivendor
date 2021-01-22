const jwt = require('jsonwebtoken');



module.exports = (req, res, next) => {
    try {

        const bearerHeader = req.headers['authorization'];

        if (typeof bearerHeader !== 'undefined') {
            const token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, "secret");
            console.log(token);
            console.log(decoded);
            req.token = decoded;
            next();
        }
        else {
            //Forbidden
            res.sendStatus(403);
            return res.status(403).json({
                message: "Forbidden"
            })
        }


    } catch (error) {
        console.log(error)
        return res.status(401).json({
            message: "Auth Failed"
        })
    }
}