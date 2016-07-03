import jwt from 'jsonwebtoken';
import _ from 'lodash';

export default {
    login({body, app}, res, next) {
        let service = app.locals.appContext.services.account;
        let config = app.locals.appContext.config.APP;

        let result = service.login(body.email, body.password)
        .then((result) => {
            let token = createToken(result.id, config);
            result.set('token', token);
            return { user : result };
		})
        .catch(next);

        res.json(result);
    },

    signup({body, app}, res, next) {
        let service = app.locals.appContext.services.account;

        let result = service.signup(body)
        .then((result) => {
            return { message : res.__("app.success.signup") };
		})
        .catch(next);

        res.json(result);
    },

    activate({body, app}, res, next) {
        let service = app.locals.appContext.services.account;
        let config = app.locals.appContext.config.APP;

        let result = service.activate(body.activationToken)
        .then((result) => {
            let token = createToken(result.id, config);
            result.set('token', token);
            return { user : result };
		})
        .catch(next);

        res.json(result);
    },

    changePassword({user, body, app}, res, next) {
        let service = app.locals.appContext.services.account;
        let config = app.locals.appContext.config.APP;

        let result = service.changePassword(user, body.currentPassword, body.newPassword)
        .then((result) => {
            return { message : res.__("app.success.change-password") };
		})
        .catch(next);

        res.json(result);
    },

    forgotPassword({body, app}, res, next) {
        let service = app.locals.appContext.services.account;
        let config = app.locals.appContext.config.APP;

        let result = service.forgotPassword(body.email)
        .then((result) => {
            return { message : res.__("app.success.forgot-password") };
		})
        .catch(next);

        res.json(result);
    },

    resetPassword({body, app}, res, next) {
        let service = app.locals.appContext.services.account;
        let config = app.locals.appContext.config.APP;

        let result = service.resetPassword(body.newPassword, body.resetPasswordToken)
        .then((result) => {
            return { message : res.__("app.success.reset-password") };
		})
        .catch(next);

        res.json(result);
    }
};

function createToken( userId, config ) {
    let jwtConfig = _.clone(config.JWT);
    jwtConfig.expiresIn = config.loginExpiresIn;

    return jwt.sign({ userId: userId }, config.secretOrKey, jwtConfig);
}
