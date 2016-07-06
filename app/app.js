// import path from 'path';
import express from 'express';
import initializers from './initializers';
import buildMiddlewares from './middlewares';
import buildRoutes from './router';
import errorHandling from './middlewares/error-handling';

var app = express();

// initializers
const appContext = app.locals.appContext = initializers;

// middlewares
app.use(buildMiddlewares(appContext));

// api router
app.use(appContext.config.app.baseURL, buildRoutes(appContext));

//app.use(express.static(path.join(__dirname, 'public')));

//must be the last
app.use(errorHandling(appContext));

export default app;
