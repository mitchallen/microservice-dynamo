/**
    Module: @mitchallen/microservice-dynamo
    Author: Mitch Allen
*/

/*jslint es6 */

"use strict";

module.exports = function (spec) {

    let AWS = require('aws-sdk');
    let dynamoConfig = require('./dynamo-config');
    let credentials = dynamoConfig.credentials;

    AWS.config.update(credentials);

    let connection = {
        dynamo: new AWS.DynamoDB(),
        docClient: new AWS.DynamoDB.DocumentClient()
    };

    let options = {
        service: spec,
        connection: connection
    };

    return require('@mitchallen/microservice-core')(options);
};