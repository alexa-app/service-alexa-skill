'use strict'


const log = require('../config/logger');
const verifier = require('alexa-verifier');

const validateRequest = function (req, reply, next) {
    if (!req.headers.signaturecertchainurl) {
        reply({
            status: 'failure',
            statusCode: "401"
        });
    }

    let cert_url, requestBody, signature;

    cert_url = req.headers.signaturecertchainurl;
    signature = req.headers.signature;
    requestBody = JSON.stringify(req.payload);
    verifier(cert_url, signature, requestBody, function (er) {
        if (er) {
            console.error('error validating the alexa cert:', er);
            reply({
                status: 'failure',
                statusCode: "401"
            });
        } else {
            console.info('signature validation complete');
            next();
        }
    });





}


module.exports = function (server, options) {
    const endpoint = options.endpoint || '/';
    const alexaService = options.speechlet;

    server.route({
        method: 'POST',
        path: endpoint,
        handler: function (req, reply) {
            const payload = req.payload;
            const type = payload.request.type;
            validateRequest(req, reply, () => {

                if (type === 'LaunchRequest') {
                    alexaService.setup(reply);
                }

                if (type === "SessionEndedRequest") {
                    alexaService.tearDown(reply);
                }

                if (type === 'IntentRequest') {
                    const intent = payload.request.intent;

                    alexaService[intent.name](payload, reply);
                }
            });


        },
        config: {
            description: 'Takes in requests posted from Amazon Alexa.'
        }
    });
};