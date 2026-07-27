class NotFoundError extends Error{
    constructor(message){
        super(message);
        this.name = "NotFoundError"
        this.statusCode = 404;
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}
module.exports = {NotFoundError};