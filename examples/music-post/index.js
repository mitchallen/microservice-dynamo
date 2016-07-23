/**
    Module: music-post
    Author: Mitch Allen
*/

"use strict";

var service = {
    
    name: require("./package").name,

    version: require("./package").version,
    
    verbose: true,

    apiVersion: process.env.SERVICE_API_VERSION || '/v1',

    port: process.env.MUSIC_POST_PORT || 8002,

    method: function(info) {
        var router = info.router,
            docClient = info.connection.docClient;

        router.post( '/music', function(req, res) {

            if( info.verbose ) {
                console.log(JSON.stringify(req.body));
            } 

            var doc = {
                "TableName":"Music",
                "Item": req.body
            };

            docClient.put(doc, function(err, data) {
                if (err) {
                    console.error("POST / DB.PUT Error JSON:", JSON.stringify(err, null, 2));
                    res
                        .status(500)
                        .send(err);
                } else {
                    var docId = req.body.CatalogID || 'undefined';
                    res
                        .location( req.originalUrl + '/' + docId )
                        .status(201)    // Created
                        .json(req.body);
                }
            });
      
        });

        return router;
    }
};

module.exports = require('@mitchallen/microservice-dynamo')(service);
