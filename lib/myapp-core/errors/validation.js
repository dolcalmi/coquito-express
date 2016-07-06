import BaseError from './base';

export default class ValidationError extends BaseError {
    constructor(errors, message = '') {
        super(1377, message || "myapp-core.errors.validation-error");
        this.validations = errors;
    }
}
