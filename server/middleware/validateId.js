const { ValidationError } = require("../errors/ValidationError");

function validateId(req,res,next){
    const id = Number(req.params.id);
    if(isNaN(id)||id<0){
        return next(new ValidationError('ID Must be a positive number'));
    }
    req.parsedId = id;
    next();
}
module.exports = validateId;