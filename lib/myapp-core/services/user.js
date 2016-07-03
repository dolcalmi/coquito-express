import BaseService from './base';
import {InvalidArgumentError} from '../errors';

export default class UserService extends BaseService {

    constructor(context) {
        super(context);
        this.userRepo = this.repositories.user;
    }

    find(userId, options) {
        // TODO: do some filter with userId
        // for options please check https://github.com/kideh88/node-jsonapi-query-parser

        //return this.userRepo.fetchAll();
        //you can use bookshelf directly but is better create a wrapper
        return this.userRepo.forge().fetchJsonApi(options);
    }
}
