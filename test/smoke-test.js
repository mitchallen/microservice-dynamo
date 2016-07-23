/**
    Module: @mitchallen/microservice-dynamo
      Test: smoke-test
    Author: Mitch Allen
*/

"use strict";

var request = require('supertest'),
    should = require('should'),
    testName = require("../package").name,
    testVersion = require("../package").version,
    verbose = process.env.TEST_VERBOSE || false,
    testPort = process.env.TEST_SERVICE_PORT || 8200,
    testHost = "http://localhost:" + testPort;

describe('dynamo service smoke test', function() {

      it('should not throw an error', function(done) {
        var options = {
            name: testName,
            version: testVersion,
            verbose: verbose,
            port: testPort,
            apiVersion: "/admin",
            method: function(info) {
                var router = info.router;
                return router;
            }
        }
        var modulePath = '../index';
        // Needed for cleanup between tests
        delete require.cache[require.resolve(modulePath)];
        var obj = require(modulePath)(options);
        should.exist(obj);
        var server = obj.server;
        should.exist(server);
        server.close(done);
    });


    it('should get url', function(done) {

        let prefix = "/test1";
        let path = "/table/list";

        var options = {
            name: testName,
            version: testVersion,
            verbose: verbose,
            port: testPort,
            apiVersion: prefix,
            method: function(info) {
                var router = info.router,
                    dynamo = info.connection.dynamo;
                router.get( path, function (req, res) {
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
        }
        
        var modulePath = '../index';
        // Needed for cleanup between tests
        delete require.cache[require.resolve(modulePath)];
        var obj = require(modulePath)(options);
        should.exist(obj);
        var server = obj.server;
        should.exist(server);
        
        var testUrl =  prefix + path;
        request(testHost)
            .get(testUrl)
            .expect(200)
            .end(function (err, res){
                should.not.exist(err);
                // Is body / TableNames returned if no tables yet?
                should.exist(res.body);
                should.exist(res.body.TableNames);
                server.close(done);
            });
    });
});