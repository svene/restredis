#RestRedis


checkout node, restify, redis combination

##Installation

- install redis DB
- install node.js
- install restify  (rest server for node.js): `npm install restify`

- install [node-redis](https://github.com/mranney/node_redis) (rest server for node.js) `npm install redis`

###Development tools:
- optional: install [nodemon](https://github.com/remy/nodemon) (automatic reloading of changed files ): `sudo npm install nodemon -g`

- optional: install [nodeunit](https://github.com/remy/nodemon) (unittests for node.js, NOTE: I was not successful testing rest calls with nodeunit): `sudo npm install nodeunit -g`

##Running
Run the server with `node restserver.js` or `nodemon restserver.js`.
Especially during development I recommend to start the server with nodemon because it automatically restarts the server
when it detects changes on the js files.

Run the client (currently in the form of tests) with `node unittest.js`

