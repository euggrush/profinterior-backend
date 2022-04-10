'use strict';

module.exports = (req, res, next) => {
    console.log(req.locals)
    // if (req.user.role !== `admin`)
    //     return res.status(401).send({
    //         msg: "Not an admin, sorry"
    //     });

    // next();
};