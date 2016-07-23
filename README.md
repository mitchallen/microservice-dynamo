@mitchallen/microservice-dynamo
===============================

A microservice module for connecting to AWS DynamoDB
----------------------------------------------------
This module extends the [@mitchallen/microservice-core](https://www.npmjs.com/package/@mitchallen/microservice-core) module to create microservice endpoints to connect with Amazon DynamoDB.

For a background on the core and microservices, visit the core npm page.

* * *

## Installation

You must use __npm__ __2.7.0__ or higher because of the scoped package name.

    $ npm init
    $ npm install @mitchallen/microservice-dynamo --save
  
* * *

## Usage

Provides AWS DynamoDB access to a microservice.

### Connection Info

By default the module will attempt to connect with a local DynamoDB on port 8000. To specify different connection info update these environment variable (*never* check sensitive connection info into source!):

    export DYNAMO_PORT=8000;
    export DYNAMO_ACCESS_KEY_ID=local-test
    export DYNAMO_SECRET_ACCESS_KEY=local-test
    export DYNAMO_REGION=local-test
    export DYNAMO_HOST=http://localhost:8000

### Define a Service Object

For Dynamo support the original core service object was extended to return connection info (__info.connect__).  The info.connect object contains two items: __dynamo__ and __docClient__ to access either database level or document level AWS API methods. (Refer to the AWS documentation for more info).

    var service = {
    	name: ...,
    	version: ...,
    	verbose: ...,
    	apiVersion: ...,
    	port: ...,
    	method: function (info) {
    	
    		var router = info.router,
                dynamo = info.connection.dynamo;
    		
    		router.[get,post,put,patch,delete] ... { 
    		   
				// Call a dynamo API method
				dynamo.[method](function(err,...) {
				})
    		};
    		
			return router;
    	}

    };
    
In the above example you can substitute __dynamo__ with __docClient__ to use doc specific methods:

    var router = info.router,
        docClient = info.connection.docClient;
    		
    router.[get,post,put,patch,delete] ... { 
    		   
		// Call a docClient API method
		docClient.[method](function(err,...) {
		})
    };
    
### Pass the Service Object to the microservice-dynamo module:

Pass the __service__ object that you define to the module:

    require('@mitchallen/microservice-dynamo')(service);
    
Or if you want to export the returned value:

    module.exports = require('@mitchallen/microservice-dynamo')(service);
    
#### Return Value
The object returned by the module contains a __server__ field:

    { server: server }

It's a pointer to the express modules server. If you are familiar with express, it's the value returned by __app.listen__. You don't need to actually return anything. 

It was handy for me to use the __close__ method in the unit tests so I wouldn't get port-in-use errors. It's also used internally when the module unexpectedly terminates.

Here is an example of how to create it, then use the server return value to close it (checking for null omitted for brevity):

    var obj = require('@mitchallen/microservice-dynamo')(options);
    var server = obj.server;
    server.close();

### Example

You can find working examples in the examples folder of the git repo.

* __examples / table-list__ - demos how to read a list of tables in the DynamoDB
* __examples / music-post__ - demos how to post a record to the DynamoDB (see music-post README for script to create Music table)

You can also find a working example here:

* [https://bitbucket.org/mitchallen/microservice-demo-table-list](https://bitbucket.org/mitchallen/microservice-demo-table-list)

* * *

## Testing

To test, go to the root folder and type (sans __$__):

    $ npm test
   
* * *
 
## Repo(s)

* [bitbucket.org/mitchallen/microservice-dynamo.git](https://bitbucket.org/mitchallen/microservice-dynamo.git)

* * *

## Contributing

In lieu of a formal style guide, take care to maintain the existing coding style.
Add unit tests for any new or changed functionality. Lint and test your code.

* * *

## Version History

#### Version 0.2.2 release notes

* Updated to use latest core

#### Version 0.2.1 release notes

* Bumped minor version because broke backward compatibility
* Using new core module that now returns __{ server: server }__ instead of just __server__.

#### Version 0.1.5 release notes

* Added examples in the git repo
* Updated the README

#### Version 0.1.4 release notes

* Updated README
* Updated @mitchallen/microservice-core dependency

#### Version 0.1.3 release notes

* (skipped to sync with core version)

#### Version 0.1.2 release notes

* Added .npmignore to filter out test folder, etc

#### Version 0.1.1 release notes

* Ran jslint against index.js and dynamo-config.js
* Added bitbucket to repo listing
* Updated aws-sdk and @mitchallen/microservice-core dependencies
* Added link to working example in README

#### Version 0.1.0 release notes

* Initial release
