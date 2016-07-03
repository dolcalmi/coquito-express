import JsonApiQueryParser from 'jsonapi-query-parser';

module.exports = {
    /** GET / - List all entities */
	get({ user, url, app }, res, next) {
		// please check https://github.com/kideh88/node-jsonapi-query-parser
		let jsonApiQueryParser = new JsonApiQueryParser();
		let params = jsonApiQueryParser.parseRequest(url);
		let service = app.locals.appContext.services.user;

		let result = service.find(user, params.queryData).then((result) => {
			return {
				users		: result.models,
				pagination	: result.pagination
			};
		})
		.catch(next);

		res.json(result);
	}
};
