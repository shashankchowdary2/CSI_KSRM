const ExpressError = require("./utils/ExpressError");
const { eventSchema,reviewSchema } = require("./schema");

module.exports.isLoggedIn = (req,res,next) => {
    if( !req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl;
        req.flash("error","you must be LogIn to access");
        return res.redirect("/login");
    }
    next();
}

module.exports.isCSI = (req,res,next) => {
    if( !req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl;
        req.flash("error","you must be logged in");
        return res.redirect("/login");
    }
    if(req.user.username==="csi_ksrm"){
        next();
    }
    else{
        req.flash("error","you doesn't have any access");
        return res.redirect("/Events");
    }
}

module.exports.saveRedirectUrl = (req,res,next) => {
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
};

module.exports.eventValidate = (req,res,next) => {
    let {error}=eventSchema.validate(req.body);
    if(error){                                                                                                                                                               
        let errMsg = error.details.map((a)=>a.message).join(",");
       throw new ExpressError(400,errMsg);
    }
    next();
}

module.exports.reviewValidate = (req,res,next) =>{
    let { error } = reviewSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map((a) => a.message).join(",");
        throw new ExpressError(400,errMsg);
    }
    next();
}