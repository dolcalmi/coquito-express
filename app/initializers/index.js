import configuration from 'config/environment';
import passport from './passport';
import locales from './locales';
import coreServices from './myapp-core';

const config = configuration(process.env);

export default {
    config      : config,
    locales     : locales(config),
    passport    : passport(config),
    services    : coreServices(config)
};
