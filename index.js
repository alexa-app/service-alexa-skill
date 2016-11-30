'use strict'

const Hapi = require('hapi');

const speechletHelloWorld = require('./lib/speechletHelloWorld');
const server = new Hapi.Server();

server.connection({
    port: process.env.PORT || 5000
});

server.register([{
        register: require('hapi-alexa'),
        options: {
            speechlet: speechletHelloWorld
                // speechlet: {
                //     setup: function (done) {
                //         done({
                //             response: 'setup'
                //         });
                //     },
                //     tearDown: function (done) {
                //         done({
                //             response: 'goodbye'
                //         });
                //     },
                //     HelloWorld: function (slot1) {
                //         done({
                //             response: 'hello world'
                //         });
                //     }
                // }
        }
    }],
    function (err) {
        if (err) {
            console.error(err);
        } else {
            server.start(function () {
                console.info('Server started at ' + server.info.uri);
            });
        }
    });

server.start(function () {
    console.log('Server running at:', server.info.uri);
});