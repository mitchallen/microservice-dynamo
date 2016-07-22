examples / table-list
=====================

Demo implementing a microservice to list dynamo tables
------------------------------------------------------

For this example to return something you must have at least one table in your local DynamoDB.

### Install

Because the __package.json__ file should already contain what you need, simply use this command to install everything:

    $ npm install

### Install and run the app

From your projects root folder, execute the following at the command line:

    $ node index.js

If it fails to run, make sure the port isn't in use.

### Test the app using curl commands

    curl -i -X GET -H "Content-Type: application/json" http://localhost:8001/admin/table/list

### Test the app in the browser

    http://localhost:8001/admin/table/list

### To stop the test app, in the original console window press __Ctrl-C__.