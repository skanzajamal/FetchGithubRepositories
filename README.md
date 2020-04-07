Prerequisites

VScode or any IDE to run node project


Install the dependencies and start the server.
$ npm init

$ npm install express nodemon

$ npm body-parser

$ npm start 


Install the dependencies for test

$ npm install --save mochachai supertest mockgoose

Running the tests

$ npm run test 



CRUD OPERATIONS:

GET    /search  => send a query parameter as request which returns the list of repositories of the specified query parameter

POST  /bookmarkById => bookmark a repository by id send user and id as parameter, so it will bookmark the repsository of that particular id for the user sent as parameter

GET   /bookmarks => get all the bookmarked repositories

DELETE /deleteById => remove bookmark by id
