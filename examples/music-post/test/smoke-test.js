/**
    Module: music-post
      Test: smoke-test
    Author: Mitch Allen
*/

"use strict";

var request = require('supertest'),
    should = require('should'),
    port = process.env.MUSIC_POST_PORT || 8002,
    testServer = process.env.TEST_SERVER || 'localhost',
    testHost = "http://" + testServer + ":" + port,
    testTable = process.env.TEST_TABLE || 'Music',
    testObject = {};

function myRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

describe('music post smoke test', function() {
    var server = null;
    beforeEach(function() {
        // Needed for cleanup between tests
        var modulePath = '../index';
        delete require.cache[require.resolve(modulePath)];
        var retObj = require(modulePath);  // Start POST service
        server = retObj.server;
    });

    afterEach(function(done) {
        server.close(done);            // Stop POST service
    });

    it('should confirm that post works', function (done) {
        var testUrl = "/v1/music";
        testObject = {
            "CatalogID": "b" + myRandom(1000, 1000000),
            "Artist":"The Beatles",
            "SongTitle":"Abbey Road",
            "Album": "Octopus's Garden",
            "Price": myRandom(4, 15) + 0.79
        };
        request(testHost)
            .post(testUrl)
            .send(testObject)
            .set('Content-Type', 'application/json')
            .expect(201)
            .end(function (err, res) {
                should.not.exist(err);
                should.exist(res.body.CatalogID);
                res.body.CatalogID.should.eql(testObject.CatalogID);
                done();
            });
    });

});