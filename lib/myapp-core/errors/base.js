export default class BaseError extends Error {
    constructor(code, message) {
        super(message);
        this.name = this.constructor.name;
        this.code = code;
        this.message = message;
        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(this, this.constructor);
        } else {
            this.stack = (new Error(message)).stack;
        }
    }
} 
