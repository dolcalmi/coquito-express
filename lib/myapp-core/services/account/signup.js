import {InvalidArgumentError} from '../../errors';
import bcrypt from 'bcrypt';
import Promise from 'bluebird';
import jwt from 'jsonwebtoken';
import _ from 'lodash';
export default function (user) {

    return validatePayload
        .call( this, user )
        .bind( this )
        .then( checkIfExists )
        .then( generateHash )
        .then( createUser )
        .then( createVerificationToken )
        .then( sendVerificationEmail );
}

function validatePayload( payload ) {
    return new Promise(function(resolve) {
        resolve({
            firstName : payload.firstName,
            lastName : payload.lastName,
            email : payload.email,
            password : payload.password
        });
    });
}

function checkIfExists( user ) {
    return this.userRepo.findByEmail( user.email, false )
        .then(function (model) {
            if (model) {
                throw new InvalidArgumentError('myapp-core.errors.account.signup-exists');
            }
            return user;
        });
}

function generateHash( user ) {
    return Promise.promisify( bcrypt.hash )( user.password, 10 )
        .then(function (hash) {
            user.password = hash;
            return user;
        });
}

function createUser( user ) {
    return this.userRepo.create( user );
}

function createVerificationToken( user ) {

    let jwtConfig = _.clone(this.config.APP.JWT);
    //uncomment the next line if you want to have a limited verification token
    //jwtConfig.expiresIn = this.config.APP.verificationTokenExpiresIn;

    return Promise.promisify( jwt.sign )( { verifiedUserId: user.id }, this.config.APP.secretOrKey, jwtConfig )
        .then(function (token) {
            user.set("verificationToken", token);
            return user;
        });
}

function sendVerificationEmail( user ) {
    return this.notificationRepo.sendVerificationEmail( user, user.get("verificationToken") );
}
