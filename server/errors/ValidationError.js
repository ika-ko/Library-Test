class ValidationError extends Error{
    constructor(message){
        super(message);
        this.name = "ValidationError"
        this.statusCode = 400;
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        }
    } 
}
module.exports = {ValidationError};