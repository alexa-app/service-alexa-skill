'use strict';


const log = require('../config/logger');

const wrapperTemplalte = function () {
    return {
        "version": "1.0",
        "sessionAttributes": {},
        "response": {}
    }
};

const replyTemplateBuilder = function (msg, shouldEndSession) {
    const template = wrapperTemplalte();
    template.response = {
        outputSpeech: {
            type: 'PlainText',
            text: msg
        },
        shouldEndSession: shouldEndSession
    };
    return template;
}

module.exports = {
    setup: function (done) {
        const template = wrapperTemplalte();
        template.response = {
            outputSpeech: {
                type: 'PlainText',
                text: "Hello Gunjan, how are you"
            },
            shouldEndSession: false
        };
        done(template);
    },
    helloIntent: function (payload, done) { // maps hello intent with a "name" slot
        log.info({
            payload: payload
        }, 'helloIntent payload');

        done(replyTemplateBuilder('Welcome to Citi Skill handler, please say Alexa ask Citi account balance for <say-as interpret-as="spell-out">1234</say-as> where <say-as interpret-as="spell-out">1234</say-as> is your voice pin', true));
    },
    accountsIntent: function (payload, done) {
        log.info({
            payload: payload
        }, 'accountIntent payload');

        if (undefined !== payload.request.intent.slots && null !== payload.request.intent.slots) {
            const slots = payload.request.intent.slots;
            if (undefined !== slots.account_number && null !== slots.account_number && undefined !== slots.account_number.value && null !== slots.account_number.value) {
                const accountNumberSlot = slots.account_number;

                done(replyTemplateBuilder('Your account balance for ' + accountNumberSlot.value + ' is     $1000 ', false));
            } else {
                done(replyTemplateBuilder('Please provide last four digits of your account number', false));
            }
        } else {
            done(replyTemplateBuilder('Please provide last four digits of your account number', false));
        }
    },
    tearDown: function (done) {
        const template = wrapperTemplalte();
        template.response = {
            outputSpeech: {
                type: 'PlainText',
                text: 'Good bye.'
            },
            shouldEndSession: true
        };
        done(template);
    }
}