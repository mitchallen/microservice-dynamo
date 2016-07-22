"use strict";

var service = {
    
    name: require("./package").name,
    version: require("./package").version,

    verbose: true,

    apiVersion: process.env.ADMIN_API_VERSION || '/admin',

    port: process.env.TABLE_LIST_PORT || 8001,

    method: function(info) {
        var router = info.router,
            dynamo = info.connection.dynamo;

        router.get( '/table/list', function (req, res) {

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

module.exports = require('@mitchallen/microservice-dynamo')(service);