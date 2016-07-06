import database from 'config/database';

/* jshint node: true */
module.exports = function(environment) {
    var jwt = {
        issuer: environment.DOMAIN || 'myapp.co',
        audience: environment.DOMAIN || 'myapp.co'
    };
    var ENV = {
        environment: environment.NODE_ENV || 'development',
        app: {
            baseURL: '/v1/',
            defaultPort: '3000',
            secretOrKey: environment.API_SECRET || 'mySuperSecureStringForAPILogin',
            loginExpiresIn: "1h",
            jwt : jwt,
            i18n: {
                updateFiles: false,
                objectNotation: true,
                locales:['en', 'es'],
                directory: __dirname + '/locales'
            }
        },
        myapp: {
            secretOrKey: environment.myapp_SECRET || 'mySuperSecureStringForResetAndVerification',
            verificationTokenExpiresIn: "365d",
            resetPasswordTokenExpiresIn: "3h",
            jwt : jwt
        },
        bodyParser: {
            json: { limit : '100kb' },
            urlencoded:{ extended: false }
        },
    };

    if (ENV.environment === 'development') {
        ENV.myapp.database = database.development;
    }

    if (ENV.environment === 'staging') {
        ENV.myapp.database = database.staging;
    }

    if (ENV.environment === 'production') {
        ENV.myapp.database = database.production;
    }

    return ENV;
};
