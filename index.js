/**
    Module: @mitchallen/microservice-dynamo
    Author: Mitch Allen
*/

/*jshint node: true */
/*jshint esversion: 6 */

"use strict";

var core = require('@mitchallen/microservice-core');

module.exports.Service = function (spec) {

    let AWS = require('aws-sdk');

    let dynamoPort = process.env.DYNAMO_PORT || 8000;

    let credentials = {
        accessKeyId:
                process.env.DYNAMO_ACCESS_KEY_ID || "local-test",
        secretAccessKey:
                process.env.DYNAMO_SECRET_ACCESS_KEY || "local-test",
        region:
                process.env.DYNAMO_REGION || "local-test",
        endpoint:
                process.env.DYNAMO_HOST || ('http://localhost:' + dynamoPort)
    };

    AWS.config.update(credentials);

    let connection = {
        dynamo: new AWS.DynamoDB(),
        docClient: new AWS.DynamoDB.DocumentClient()
    };

    let options = {
        service: spec,
        connection: connection
    };

    return core.Service(options);
};