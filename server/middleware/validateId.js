const { ValidationError } = require("../errors/ValidationError");

function validateId(req,res,next){
    const id = Number(req.params.id);
    // Number("1.5") is 1.5 and Number("") is 0 — both pass an isNaN check but neither is
    // a valid SERIAL value, and Postgres rejects them with a raw 500 further down.
    if(!Number.isInteger(id) || id < 1){
        return next(new ValidationError('ID must be a positive integer'));
    }
    req.parsedId = id;
    next();
}
module.exports = validateId;
