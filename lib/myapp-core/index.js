import UserService from './services/user';
import AccountService from './services/account';

export default function (repositories, config) {
    let context = {
        config      : config,
        repositories: repositories
    };
    let services = {};
    services.user =  new UserService(context);
    services.account = new AccountService(context);
    return services;
}
