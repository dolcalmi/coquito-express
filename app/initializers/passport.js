import passport from "passport";
import {Strategy, ExtractJwt} from 'passport-jwt';
import _ from 'lodash';

export default function(config) {
    let opts = _.clone(config.jwt);
    opts.secretOrKey = config.secretOrKey;
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('Bearer');

    passport.use(new Strategy(opts, function(jwt_payload, done) {
        done(null, jwt_payload.userId);
    }));

    return passport;
}
