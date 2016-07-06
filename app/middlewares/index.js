import { Router } from 'express';
import vendor from './vendor';
import setBodyLanguage from './body-language';

export default function(appContext) {
	let router = Router();

	// must be the first
	router.use(vendor(appContext));

	//here custom middlewares
	router.use(setBodyLanguage(appContext));

	return router;
}
