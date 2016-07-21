/**
    Module: @mitchallen/microservice-dynamo
    Author: Mitch Allen
      File: dynamo-config.js
*/

"use strict";

var config = {};

config.dynamoPort = process.env.DYNAMO_PORT   || 8000;

config.credentials = {
  accessKeyId:      
    process.env.DYNAMO_ACCESS_KEY_ID      || "local-test",
  secretAccessKey:  
    process.env.DYNAMO_SECRET_ACCESS_KEY  || "local-test",
  region:           
    process.env.DYNAMO_REGION             || "local-test",
  endpoint: 
    process.env.DYNAMO_HOST 
      || 'http://localhost:' + config.dynamoPort,
};

module.exports = config;