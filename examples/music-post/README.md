examples / music-post
=====================

Demo implementing a microservice to post to a dynamo table
----------------------------------------------------------

### Requirements

This demo requires:

1. DynamoDB running locally 
2. A Music table.

To create the music table, paste the following into the local DynamoDB shell and run it:

    var params = {
      TableName : "Music",
      KeySchema: [       
        { AttributeName: "CatalogID", KeyType: "HASH" }, 
      ],
      AttributeDefinitions: [       
        { AttributeName: "CatalogID", AttributeType: "S" },
      ],
      ProvisionedThroughput: {       
        ReadCapacityUnits: 1, 
        WriteCapacityUnits: 1
      }
    };

  dynamodb.createTable(params, function(err, data) {
    if (err)
        console.log(JSON.stringify(err, null, 2));
    else
        console.log(JSON.stringify(data, null, 2));
  });


### Install

Because the __package.json__ file should already contain what you need, simply use this command to install everything:

    $ npm install

### Install and run the app

From your projects root folder, execute the following at the command line:

    $ node index.js

If it fails to run, make sure the port isn't in use.

To test with __curl__:

    curl -i -X POST -H "Content-Type: application/json" -d @data.json http://localhost:8002/v1/music

Press __Ctrl-C__ to stop it.

To generate random data you would have to edit the file each time to create unique catalog numbers.

Instead, I provided a smoke test that doubles as a data generator. Everytime it posts it randomizes the __CatalogID__ and __Price__.

Run the following a few times:

    $ npm test
