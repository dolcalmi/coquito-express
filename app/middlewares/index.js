import { Router } from 'express';
import vendor from './vendor';

export default function(appContext) {
	let router = Router();

	// must be the first
	router.use(vendor(appContext));

	//here other middlewares

	return router;
}
