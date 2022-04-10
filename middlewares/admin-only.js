'use strict';

module.exports = (req, res, next) => {
    // console.log(res.locals.user.role)
    const userRole = res.locals.user.role
    if (userRole !== `admin`)
        return res.status(401).send({
            msg: "Not an admin, sorry"
        });

    next();
};