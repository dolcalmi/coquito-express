// Update with your config settings.

module.exports = {

    development: {
        client: 'postgresql',
        connection: {
            host     : '127.0.0.1',
            port     : '15432',
            user     : 'myapp_usr',
            password : 'my4pp_p4ss',
            database : 'myapp_dev',
            charset  : 'utf8',
            timezone : "UTC"
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tableName: 'knex_migrations',
            directory: './database/migrations'
        },
        seeds: {
            directory: './database/seeds/development'
        }
    },

    staging: {
        client: 'postgresql',
        connection: {
            host     : '127.0.0.1',
            port     : '15432',
            user     : 'myapp_usr',
            password : 'my4pp_p4ss',
            database : 'myapp_dev',
            charset  : 'utf8',
            timezone : "UTC"
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tableName: 'knex_migrations'
        },
        seeds: {
            directory: './database/seeds/staging'
        }
    },

    production: {
        client: 'postgresql',
        connection: {
            host     : '127.0.0.1',
            port     : '15432',
            user     : 'myapp_usr',
            password : 'my4pp_p4ss',
            database : 'myapp_dev',
            charset  : 'utf8',
            timezone : "UTC"
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tableName: 'knex_migrations'
        },
        seeds: {
            directory: './database/seeds/production'
        }
    },

};
