import favicon from 'serve-favicon';
import logger from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';
import compression from 'compression';
import helmet from 'helmet';
import { Router } from 'express';
import jsonPromise from 'express-json-promise';

export default function(appContext) {
	let router = Router();

    // uncomment after placing your favicon in /public
    //router.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
    router.use(logger('dev'));
    router.use(helmet());

    // 3rd party middleware
    router.use(compression());

    router.use(cors({
    	exposedHeaders: ['Link']
    }));

    router.use(bodyParser.json(appContext.config.bodyParser.json));
    router.use(bodyParser.urlencoded(appContext.config.bodyParser.urlencoded));
    router.use(appContext.passport.initialize());
	router.use(appContext.locales.init);
	router.use(jsonPromise());

	return router;
}
