
# Application Features

Fetch Github repositories based on the following features.

1. Takes a search term and returns a list of repositories.
2. Allows bookmarking a repository by its id.
3. Get all bookmarked repositories.

# Prerequisites

VScode or any IDE to run node project


# Install the dependencies and start the server.

- Open terminal and run commands

  $ npm init 

  $ npm install express nodemon

  $ npm body-parser

  $ npm start 
  
  This will start the application on url: http://localhost:8080/

- Open browser and go to http://localhost:8080/search

  Send a query parameter as request, in response it will return the list of repositories of the specified query parameter

- Open browser and go to http://localhost:8080/bookmarkById 

 Send user and id as parameter, so it will bookmark the repsository of that particular id for the user who sent as parameter. 

- Open browser and go to http://localhost:8080/bookmarks  

 This will get all the bookmarked repositories

- Open browser and go to http://localhost:8080/deleteById 

 This will remove bookmark by id


# Install the dependencies for test

- On terminal run command

 $ npm install --save mochachai supertest mockgoose

# Running the tests

- On terminal run command

 $ npm run test 

