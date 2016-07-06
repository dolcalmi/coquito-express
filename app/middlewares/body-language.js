export default function(appContext) {
	return (request, response, next) => {
		request.body.language = appContext.locales.getLocale(request);
		return next();
	};
}
