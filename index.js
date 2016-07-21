"use strict";

module.exports = function(spec) {

    var AWS = require('aws-sdk'),
        dynamoConfig = require('./dynamo-config'),
        credentials = dynamoConfig.credentials;

    AWS.config.update( credentials );
 
    var connection = {
        dynamo: new AWS.DynamoDB(),
        docClient: new AWS.DynamoDB.DocumentClient()
    }

    var options = {
        service: spec,
        connection: connection,
    }

    return require('@mitchallen/microservice-core')(options);
};