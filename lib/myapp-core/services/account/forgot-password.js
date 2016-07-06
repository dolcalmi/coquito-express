import {InvalidArgumentError} from '../../errors';
import bcrypt from 'bcrypt';
import Promise from 'bluebird';
import jwt from 'jsonwebtoken';
import _ from 'lodash';

export default function ( email ) {

    return findByEmail
        .call( this, email )
        .bind( this )
        .then( verifyAndCreateResetToken )
        .then( updatePendingReset )
        .then( sendResetPasswordEmail )
        .catch( function(err) {
            throw err instanceof InvalidArgumentError ? err : new InvalidArgumentError('myapp-core.errors.account.forgot-password');
        });
}

function findByEmail( email ) {
    return this.userRepo.findByEmail( email );
}

function verifyAndCreateResetToken( user ) {
    if (!user.get("emailVerified")) {
        throw new InvalidArgumentError('myapp-core.errors.account.loginEmailNotVerified');
    }

    let jwtConfig = _.clone(this.config.jwt);
    //uncomment the next line if you want to have a limited verification token
    jwtConfig.expiresIn = this.config.resetPasswordTokenExpiresIn;

    return Promise.promisify( jwt.sign )( { resetPasswordUserId: user.id }, this.config.secretOrKey, jwtConfig )
        .then(function (token) {
            user.set("resetPasswordToken", token);
            return user;
        });
}

function updatePendingReset( user ) {
    return user.save({ pendingReset: true, updatedAt: new Date() }, { patch: true });
}

function sendResetPasswordEmail( user ) {
    return this.notificationRepo.sendResetPasswordEmail( user, user.get("resetPasswordToken") );
}
