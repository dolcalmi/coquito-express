import { Router } from 'express';

export default function(appContext) {
    let isDev = appContext.config.environment === 'development';

	return [error404, isDev ? error500Dev : error500];
}

function error404(req, res, next) {
    var err = new Error(res.__('app.errors.not-found'));
    err.status = 404;
    next(err);
}

function error500(err, req, res, next) {
    let error = errorParse(err, res);
    res.status(err.status || 500);
    res.json({errors: [error]});
}

function error500Dev(err, req, res, next) {
    let error = errorParse(err, res);
    error.stack = err.stack;

    res.status(err.status || 500);
    res.json({errors: [error]});
}

function errorParse(err, res) {
    let code = err.code || err.status || 500;
    let message = code > 1300 ? res.__(err.message) : err.message;

    let error = {
        code: code,
        message: message
    };

    if (err.validations) {
        error.validations = err.validations;
    }

    return error;
}
