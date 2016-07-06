import {InvalidArgumentError, ValidationError} from '../../errors';
import bcrypt from 'bcrypt';
import Promise from 'bluebird';
import checkit from 'checkit';
import jwt from 'jsonwebtoken';
import _ from 'lodash';

const rules = {
    firstName: 'required',
    lastName: 'required',
    email: ['required', 'email'],
    password: ['required']
};

export default function ( payload ) {

    return validatePayload
        .call( this, payload )
        .bind( this )
        .then( checkIfExists )
        .then( generateHash )
        .then( createUser )
        .then( createVerificationToken )
        .then( sendVerificationEmail );
}

function validatePayload( payload ) {
    let data = {
        firstName : payload.firstName,
        lastName : payload.lastName,
        email : payload.email,
        password : payload.password
    };

    let opts = {
        language : payload.language || 'en',
        labels : payload.labels || {}
    };

    return Promise.resolve(checkit(rules, opts)
        .run(data)
        .catch(function(err) {
            throw new ValidationError(err);
        }));
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

    let jwtConfig = _.clone(this.config.jwt);
    //uncomment the next line if you want to have a limited verification token
    //jwtConfig.expiresIn = this.config.verificationTokenExpiresIn;

    return Promise.promisify( jwt.sign )( { verifiedUserId: user.id }, this.config.secretOrKey, jwtConfig )
        .then(function (token) {
            user.set("verificationToken", token);
            return user;
        });
}

function sendVerificationEmail( user ) {
    return this.notificationRepo.sendVerificationEmail( user, user.get("verificationToken") );
}
