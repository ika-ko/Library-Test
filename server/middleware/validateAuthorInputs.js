const { ValidationError } = require("../errors/ValidationError");

function validateAuthorInputs(req,res,next){
    const {name} = req.body;
    if(!name || typeof name!=='string'){
        return next (new ValidationError("Author name is required"));
    }
    next();
}
module.exports = validateAuthorInputs;