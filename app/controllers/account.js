import jwt from 'jsonwebtoken';
import _ from 'lodash';

export default {
    login({body, app}, res, next) {
        let service = app.locals.appContext.services.account;
        let config = app.locals.appContext.config.app;

        let result = service.login(body.email, body.password)
        .then((result) => {
            let token = createToken(result.id, config, body.rememberMe == "true" ? "365d" : null);
            result.set('token', token);
            return { user : result };
		})
        .catch(next);

        res.json(result);
    },

    signup(req, res, next) {
        let service = req.app.locals.appContext.services.account;

        req.body.labels = createLabels(req);
        let result = service.signup(req.body)
        .then((result) => {
            return { message : res.__("app.success.signup") };
		})
        .catch(next);

        res.json(result);
    },

    activate({body, app}, res, next) {
        let service = app.locals.appContext.services.account;
        let config = app.locals.appContext.config.app;

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
        let config = app.locals.appContext.config.app;

        let result = service.changePassword(user, body.currentPassword, body.newPassword)
        .then((result) => {
            return { message : res.__("app.success.change-password") };
		})
        .catch(next);

        res.json(result);
    },

    forgotPassword({body, app}, res, next) {
        let service = app.locals.appContext.services.account;
        let config = app.locals.appContext.config.app;

        let result = service.forgotPassword(body.email)
        .then((result) => {
            return { message : res.__("app.success.forgot-password") };
		})
        .catch(next);

        res.json(result);
    },

    resetPassword({body, app}, res, next) {
        let service = app.locals.appContext.services.account;
        let config = app.locals.appContext.config.app;

        let result = service.resetPassword(body.newPassword, body.resetPasswordToken)
        .then((result) => {
            return { message : res.__("app.success.reset-password") };
		})
        .catch(next);

        res.json(result);
    }
};

function createToken( userId, config, expiresIn = null ) {
    let jwtConfig = _.clone(config.jwt);
    jwtConfig.expiresIn = expiresIn || config.loginExpiresIn;

    return jwt.sign({ userId: userId }, config.secretOrKey, jwtConfig);
}

function createLabels(req) {
    return {
        firstName: req.__('fields.user.firstName'),
        lastName: req.__('fields.user.lastName'),
        email: req.__('fields.user.email'),
        password: req.__('fields.user.password')
    };
}
