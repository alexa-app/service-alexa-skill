'use strict'

const log = require('./config/logger'),
    settings = require('./config/settings'),
    Hapi = require('hapi'),
    hapiAlexa = require('./lib/hapiAlexa'),
    speechlet = require('./lib/speechlet'),
    server = new Hapi.Server();

server.connection({
    port: settings.port
});

// server.register([{
//         register: hapiAlexa,
//         options: {
//             speechlet: speechlet
//                 // speechlet: {
//                 //     setup: function (done) {
//                 //         done({
//                 //             response: 'setup'
//                 //         });
//                 //     },
//                 //     tearDown: function (done) {
//                 //         done({
//                 //             response: 'goodbye'
//                 //         });
//                 //     },
//                 //     HelloWorld: function (slot1) {
//                 //         done({
//                 //             response: 'hello world'
//                 //         });
//                 //     }
//                 // }
//         }
//     }],
//     function (err) {
//         if (err) {
//             console.error(err);
//         } else {
//             server.start(function () {
//                 log.info('Server started at ' + server.info.uri);
//             });
//         }
//     });

server.start(function () {
    const options = {
        speechlet: speechlet
    };
    hapiAlexa(server, options);
    log.info('Server running at:', server.info.uri);
});