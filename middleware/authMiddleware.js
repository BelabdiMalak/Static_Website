const jwt = require('jsonwebtoken');
const User = require('../models/User');


// check access permission for the actual user
const requireAuth = (req, res, next) => {

    const token = req.cookies.jwt;

    if(token){
        jwt.verify(token, "Malak's secret", (err, decodedToken) => {
            if(err){
                console.log(err.message);
                res.redirect('/connexion');
            }
            else{
                console.log(decodedToken);
                next();
            }
        })
    }
    else{
        res.redirect('/connexion');
    }
};


// check actual user for conditional rendering
const checkUser = (req, res, next) => {

    const token = req.cookies.jwt;

    if(token){
        jwt.verify(token, "Malak's secret", async (err, decodedToken) => {
            if(err){
                console.log(err.message);
                res.locals.user = null;
            }
            if(decodedToken){
                let user = await User.findById(decodedToken.id);
                res.locals.user = user;
                next()
            }
        })
    }
    else{
        res.locals.user = null;
        next();
    }
}

module.exports = {requireAuth, checkUser}