import database from 'config/database';

/* jshint node: true */
module.exports = function(environment) {
    var ENV = {
        environment: environment.NODE_ENV || 'development',
        baseURL: '/',
        APP: {
            /* please check https://www.grc.com/passwords.htm*/
            secretOrKey: environment.JWT_SECRET || 'mySuperSecureString',
            loginExpiresIn: "1h",
            verificationTokenExpiresIn: "365d",
            resetPasswordTokenExpiresIn: "3h",
            i18n: {
                updateFiles: false,
                objectNotation: true,
                locales:['en', 'es'],
                directory: __dirname + '/locales'
            },
            DEFAULT_PORT: '3000',
            JWT : {
                issuer: environment.DOMAIN || 'myapp.com',
                audience: environment.DOMAIN || 'myapp.com'
            }
        },
        bodyParser: {
            limit : '100kb'
        },
    };

    if (ENV.environment === 'development') {
        ENV.APP.database = database.development;
    }

    if (ENV.environment === 'staging') {
        ENV.APP.database = database.staging;
    }

    if (ENV.environment === 'production') {
        ENV.APP.database = database.production;
    }

    return ENV;
};
