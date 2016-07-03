import BaseError from './base';

export default class InvalidArgumentError extends BaseError {
    constructor(message) {
        super(1366, message);
    }
}
