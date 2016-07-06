import {InvalidArgumentError} from '../../errors';
import Promise from 'bluebird';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import _ from 'lodash';

export default function (newPassword, resetPasswordToken) {

    let payload = {
        password : newPassword,
        resetPasswordToken : resetPasswordToken
    };

    return decodeResetPasswordToken
        .call( this, payload )
        .bind( this )
        .then( checkIfExistsAndSetNewPassword )
        .then( generateHash )
        .then( resetPassword )
        .catch( function(err) {
            throw err instanceof InvalidArgumentError ? err : new InvalidArgumentError('myapp-core.errors.account.reset-password');
        });
}

function decodeResetPasswordToken( payload ) {

    let jwtConfig = _.clone(this.config.jwt);

    return Promise.promisify( jwt.verify )( payload.resetPasswordToken , this.config.secretOrKey, jwtConfig )
        .then(function (decoded) {
            if (decoded.resetPasswordUserId > 0) {
                payload.userId = decoded.resetPasswordUserId;
                return  payload;
            }
            throw new InvalidArgumentError('myapp-core.errors.account.invalid-reset-token');
        })
        .catch( function(err) {
            throw new InvalidArgumentError('myapp-core.errors.account.invalid-reset-token');
        });
}

function checkIfExistsAndSetNewPassword( payload ) {
    return this.userRepo.findVerifiedById( payload.userId )
        .then(function (user) {
            if (user.get('pendingReset')) {
                user.set('password', payload.password);
                return user;
            }
            throw new InvalidArgumentError('myapp-core.errors.account.reset-password');
        });
}

function generateHash( user ) {
    return Promise.promisify( bcrypt.hash )( user.get("password"), 10 )
        .then(function (hash) {
            user.set("password", hash);
            return user;
        });
}

function resetPassword( user ) {
    return user.save({ password: user.get("password"), pendingReset: false, updatedAt: new Date() }, { patch: true });
}
