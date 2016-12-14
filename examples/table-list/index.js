"use strict";

var dmod = require('@mitchallen/microservice-dynamo'),
    urlPath = "/table/list";

var service = {
    
    name: require("./package").name,
    version: require("./package").version,

    verbose: true,

    apiVersion: process.env.ADMIN_API_VERSION || '/admin',

    port: process.env.TABLE_LIST_PORT || 8001,

    method: function(info) {
        var router = info.router,
            dynamo = info.connection.dynamo;

        router.get( urlPath, function (req, res) {

            dynamo.listTables(function (err, data) {
                if( err ) {
                    console.error(err);
                    res
                    .status(500)
                    .send(err);
                } else {
                    if( info.verbose ) {
                        console.log('listTables:', data);
                    }
                    res.json(data);
                }
            });
        });
        return router;
    }
};

console.log(
    "GET URL: http://localhost:%d%s%s", 
    service.port, service.apiVersion, urlPath );

module.exports = dmod.Service(service);