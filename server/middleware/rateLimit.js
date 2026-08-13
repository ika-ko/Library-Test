const {rateLimit} = require('express-rate-limit');

const limiter = rateLimit({
    windowMs: 5*60*1000,
    limit: 10,
    standardHeaders: 'draft-8',
    legacyHeaders : false,
    ipv6Subnet: 52,
    handler : (req,res,next,options)=>{
        return res.status(options.statusCode).json({
            status:"error",
            statusCode: options.statusCode,
            message: "Too many attempts, try again in a few minutes"
        });
    }
})
module.exports = limiter;