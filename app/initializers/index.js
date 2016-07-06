import configuration from 'config/environment';
import passport from './passport';
import locales from './locales';
import coreServices from './myapp-core';

const config = configuration(process.env);

const initializer = {
    config      : config,
    locales     : locales(config.app),
    passport    : passport(config.app),
    services    : coreServices(config.myapp)
};

export default initializer;
