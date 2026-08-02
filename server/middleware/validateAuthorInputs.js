const { ValidationError } = require("../errors/ValidationError");

function validateAuthorInputs(req,res,next){
    const {name,bio,bornYear} = req.body;

    if(!name || typeof name!=='string' || !name.trim()){
        return next (new ValidationError("Author name is required"));
    }
    if(name.length > 255){
        return next(new ValidationError("Author name must be 255 characters or fewer"));
    }
    if(bio != null && typeof bio !== 'string'){
        return next(new ValidationError("Bio must be a string"));
    }
    // Anything non-integer here reaches Postgres as-is and comes back as a 500.
    if(bornYear != null && (!Number.isInteger(bornYear) || bornYear < 1 || bornYear > 2099)){
        return next(new ValidationError("bornYear must be an integer between 1 and 2099"));
    }
    next();
}
module.exports = validateAuthorInputs;
