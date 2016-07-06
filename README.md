# Coquito Express

Just another ES6 expressjs + bookshelf boilerplate

## Features

* Initially just for APIs but you can add 'views' easily
* ES6 support via [babel](https://babeljs.io)
* Vagrant with [PostgreSQL](https://www.postgresql.org): just for test purpose, if you have other database supported by [Bookshelf](http://bookshelfjs.org/) just have to change de [Database Configuration](https://github.com/dolcalmi/coquito-express/blob/master/config/database.js)
* Useful [middlewares](https://github.com/dolcalmi/coquito-express/blob/master/app/middlewares/vendor.js)
* Ember like structure. Just begin with app/app.js
* Independent [Business Core](https://github.com/dolcalmi/coquito-express/tree/master/lib/myapp-core) from API Layer
* i18n support (english and spanish)
* API with:
    * Security by [Passport](http://passportjs.org/) and [passport-jwt](https://github.com/themikenicholson/passport-jwt)
    * Preconfigured [routes](https://github.com/dolcalmi/coquito-express/blob/master/app/router.js) signup, activate account, login, change password, forgot password, reset password and a demo path for 'users'
    * Emails not included but you can add them [here](https://github.com/dolcalmi/coquito-express/blob/master/lib/myapp-core/repositories/production/notification.js)
* Preconfigured npm commands:
    * db:create [migration file name]: create a new db migration file
    * db:migrate : run pending migrations
    * db:rollback : rollback the last migration
    * db:create:seed [seed file name]: create a seed file
    * db:seed : run the seeds


## Prerequisites

You will need the following things properly installed on your computer.

* [Git](http://git-scm.com/)
* [Node.js](http://nodejs.org/) (with NPM)
* [Vagrant](https://www.vagrantup.com/)

## Installation / Initial setup

* `git clone git@github.com:dolcalmi/coquito-express.git`
* change into the new directory
* `rm -rf .git && git init && npm init` (optional, make it yours)
* `npm install`
* `vagrant up` (may take a while)
* `npm run db:migrate`
* `npm run db:seed` (create an active user john.doe@gmail.com with password 123456)


## Running / Development

* `npm start`
* Visit your app at [http://localhost:3000/v1](http://localhost:3000/v1).
* Also, you can test it using [Postman](https://chrome.google.com/webstore/detail/postman/fhbjgbiflinjbdggehcddcbncdddomop?hl=en) json (MyApp.Postman.json) or [Ember client for Coquito Express](https://github.com/dolcalmi/ember-coquito-express)

### Deploying

* Update your database connection in config/database.js
* `npm run build` (compiles with babel and move all to dist folder)
* deploy dist folder and run `NODE_ENV=production node dist/bin/www.js` or
* `NODE_ENV=production npm run serve`

## This project code and structure were inspired by

* [ember-cli](http://ember-cli.com/)
* [Express' application generator](https://github.com/expressjs/generator)
* [Express' Production Best Practices: Security](http://expressjs.com/en/advanced/best-practice-security.html)
* [Express & ES6 REST API Boilerplate](https://github.com/developit/express-es6-rest-api)
* [Example Node Server w/ Babel](https://github.com/babel/example-node-server)
