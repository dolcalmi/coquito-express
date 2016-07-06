import {InvalidArgumentError} from '../../errors';
import Promise from 'bluebird';
import jwt from 'jsonwebtoken';
import _ from 'lodash';

export default function (activationToken) {

    return decodeVerificationToken
        .call( this, activationToken )
        .bind( this )
        .then( checkIfExists )
        .then( activateUser )
        .catch( function(err) {
            throw err instanceof InvalidArgumentError ? err : new InvalidArgumentError('myapp-core.errors.account.activate');
        });
}

function decodeVerificationToken( token ) {

    let jwtConfig = _.clone(this.config.jwt);

    return Promise.promisify( jwt.verify )( token, this.config.secretOrKey, jwtConfig )
        .then(function (decoded) {
            if (decoded.verifiedUserId > 0) {
                return decoded.verifiedUserId;
            }
            throw new InvalidArgumentError('myapp-core.errors.account.invalid-verification-token');
        })
        .catch( function(err) {
            throw new InvalidArgumentError('myapp-core.errors.account.invalid-verification-token');
        });
}

function checkIfExists( id ) {
    return this.userRepo.findUnverifiedById( id );
}

function activateUser( user ) {
    let date = new Date();
    return user.save({
        emailVerified: true,
        emailVerifiedAt: date,
        lastLoginAt: date,
        updatedAt: date
    }, { patch: true });
}
