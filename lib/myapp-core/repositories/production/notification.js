import Promise from 'bluebird';
var debug = require('debug')('myapp:core');

export default class {

    constructor(config) {
        this.config = config;
    }

    sendVerificationEmail( user, token ) {
        debug("verification token for %s: %s", user.get("email"), token);
        // you must replace this and use sendgrind, mailjet, ...
        // send an email with the token
        // handle the url and make a post with the token to /activate with activationToken param
        Promise.resolve(user);
    }

    sendResetPasswordEmail( user, token ) {
        debug("reset password token for %s: %s", user.get("email"), token);
        // you must replace this and use sendgrind, mailjet, ...
        // send an email with the token
        // handle the url and make a post with the token to /reset-password with resetPasswordToken param
        Promise.resolve(user);
    }

}
