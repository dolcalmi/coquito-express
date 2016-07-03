import {InvalidArgumentError} from '../../errors';
import Promise from 'bluebird';
import bcrypt from 'bcrypt';

export default function (userId, currentPassword, newPassword) {

    let payload = {
        userId : userId,
        currentPassword : currentPassword,
        newPassword : newPassword
    };

    return checkIfExists
        .call( this, payload )
        .bind( this )
        .then( verifyCredentials )
        .then( generateHash )
        .then( changePassword )
        .catch( function(err) {
            throw err instanceof InvalidArgumentError ? err : new InvalidArgumentError('myapp-core.errors.account.change-password');
        });
}

function checkIfExists( payload ) {
    return this.userRepo.findVerifiedById( payload.userId )
        .then(function (user) {
            user.set('plainPassword', payload.currentPassword);
            user.set('newPassword', payload.newPassword);
            return user;
        });
}

function verifyCredentials( user ) {
    return Promise.promisify( bcrypt.compare )( user.get("plainPassword"), user.get("password") )
        .then( matches => {
            if ( !matches ) {
                throw new Error();
            }
            return user;
        });
}

function generateHash( user ) {
    if (!user.get("newPassword")) {
        throw new InvalidArgumentError('myapp-core.errors.account.change-password');
    }
    return Promise.promisify( bcrypt.hash )( user.get("newPassword"), 10 )
        .then(function (hash) {
            user.set("password", hash);
            return user;
        });
}

function changePassword( user ) {
    return user.save({ password: user.get("password"), pendingReset: false, updatedAt: new Date() }, { patch: true });
}
