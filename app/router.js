import path from 'path';
import { express, Router } from 'express';
import ExpressRouteBuilder from 'express-route-builder';
import AccountController from 'app/controllers/account';
import jwtAuthorization from 'app/middlewares/jwt-authorization';

export default function(appContext) {
    const router = Router();
    const baseDir = path.join(__dirname, 'controllers/');
    const builder = new ExpressRouteBuilder(express, router, baseDir);

    builder.addRoute('/', 'index');

    builder.addRoute('/login', { post: AccountController.login });
    builder.addRoute('/signup', { post: AccountController.signup });
    builder.addRoute('/activate', { post: AccountController.activate });
    builder.addRoute('/change-password', { post: AccountController.changePassword }, jwtAuthorization(appContext));
    builder.addRoute('/forgot-password', { post: AccountController.forgotPassword });
    builder.addRoute('/reset-password', { post: AccountController.resetPassword });

    builder.addRoute('/users', 'users', jwtAuthorization(appContext));

    // Or you can explicitly define functions for each route and method.
    // builder.addRoute('/other/data', {
    //   get: (req, res, next) => { ... },
    //   post: (req, res, next) => { ... },
    //   ...
    // })
    return router;
}
