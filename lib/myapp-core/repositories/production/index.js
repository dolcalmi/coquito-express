import BaseRepo from './base';
import user from './user';
import NotificationRepo from './notification';

export default function (config) {
    let dbConfig = config.database;
    const repos = {};
    repos.notification = new NotificationRepo(config);
    repos.user = buildRepository(dbConfig, user);
    repos.userCollection = buildCollection(repos.user, dbConfig);

    return repos;
}

function buildRepository(dbConfig, options) {
    const base = BaseRepo(dbConfig);

    return base.Model.extend(options, options.queries);
}

function buildCollection (model, dbConfig) {
    const base = BaseRepo(dbConfig);

    return base.Collection.extend( {
        model: model
    });
}
