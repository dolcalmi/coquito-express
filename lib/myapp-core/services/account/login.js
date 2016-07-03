import {InvalidArgumentError} from '../../errors';
import bcrypt from 'bcrypt';
import Promise from 'bluebird';

export default function (email, password) {

    let user = {
        email   : email,
        password: password
    };

    return findByEmailAndSetPlainPassword
        .call( this, user )
        .bind( this )
        .then( verifyCredentials )
        .then( updateLastLoggedInDate )
        .catch( function(err) {
            throw err instanceof InvalidArgumentError ? err : new InvalidArgumentError('myapp-core.errors.account.login');
        });
}

function findByEmailAndSetPlainPassword( user ) {
    return this.userRepo.findByEmail( user.email )
        .then( u => {
            u.set("plainPassword", user.password);
            return u;
        });
}

function verifyCredentials( user ) {
    if (!user.get("emailVerified")) {
        throw new InvalidArgumentError('myapp-core.errors.account.loginEmailNotVerified');
    }

    return Promise.promisify( bcrypt.compare )( user.get("plainPassword"), user.get("password") )
        .then( matches => {
            if ( !matches ) {
                throw new Error();
            }
            return user;
        });
}

function updateLastLoggedInDate( user ) {
    return user.save({ lastLoginAt: new Date(), pendingReset: false, updatedAt: new Date() }, { patch: true });
}
