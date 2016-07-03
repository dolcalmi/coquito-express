import BaseService from './base';
import actions from './account/';

export default class AccountService extends BaseService {

    constructor ( context ) {
        super(context);
        this.userRepo = this.repositories.user;
        this.notificationRepo = this.repositories.notification;
    }

    // first way - most useful to see what parameters are needed
    signup ( user ) {
        return actions.signup.call(this, user);
    }

    activate ( activationToken ) {
        return actions.activate.call(this, activationToken);
    }

    changePassword ( userId, currentPassword, newPassword ) {
        return actions.changePassword.call(this, userId, currentPassword, newPassword);
    }

    forgotPassword ( email ) {
        return actions.forgotPassword.call(this, email);
    }

    resetPassword ( newPassword, resetPasswordToken ) {
        return actions.resetPassword.call(this, newPassword, resetPasswordToken);
    }
}

// second way - a bit problematic if you want to know what is happening only seeing this file
AccountService.prototype.login = actions.login;
