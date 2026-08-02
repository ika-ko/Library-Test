const { ValidationError } = require("../errors/ValidationError");

function validateBookInputs(req,res,next){
    const {title,genre,authorId,publishedYear} = req.body;

    if(!title || typeof title!=='string' || !title.trim()){
        return next (new ValidationError("Book title is required"));
    }
    if(title.length > 255){
        return next(new ValidationError("Book title must be 255 characters or fewer"));
    }
    if(genre != null && (typeof genre !== 'string' || genre.length > 100)){
        return next(new ValidationError("Genre must be a string of 100 characters or fewer"));
    }
    // Anything non-integer here reaches Postgres as-is and comes back as a 500.
    if(!Number.isInteger(authorId) || authorId < 1){
        return next(new ValidationError("authorId must be a positive integer"));
    }
    if(publishedYear != null && (!Number.isInteger(publishedYear) || publishedYear < 1 || publishedYear > 2099)){
        return next(new ValidationError("publishedYear must be an integer between 1 and 2099"));
    }
    next();
}
module.exports = validateBookInputs;
