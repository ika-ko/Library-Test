const { ValidationError } = require("../errors/ValidationError");

function validateBookInputs(req,res,next){
    const {title} = req.body;
    if(!title || typeof title!=='string'){
        return next (new ValidationError("Book title is required"));
    }
    next();
}
module.exports = validateBookInputs;