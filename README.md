# Coquito Express

Just another expressjs + bookshelf boilerplate

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](http://git-scm.com/)
* [Node.js](http://nodejs.org/) (with NPM)
* [Vagrant](https://www.vagrantup.com/)

## Installation / Initial setup

* `git clone git@github.com:dolcalmi/coquito-express.git`
* change into the new directory
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
