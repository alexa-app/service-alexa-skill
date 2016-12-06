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
            type: 'SSML',
            ssml: '<speak> ' + msg + ' </speak>'
        },
        shouldEndSession: shouldEndSession
    };
    return template;
}

module.exports = {
    setup: function (done) {
        done(replyTemplateBuilder('Welcome to Citi Bank ! ', false));
    },
    helloIntent: function (payload, done) { // maps hello intent with a "name" slot
        log.info({
            payload: payload
        }, 'helloIntent payload');

        done(replyTemplateBuilder('Welcome to Citibank Skill handler, please say Alexa ask Citibank account balance for 1 2 3 4 ', false));
    },
    accountsIntent: function (payload, done) {
        log.info({
            payload: payload
        }, 'accountIntent payload');

        if (undefined !== payload.request.intent.slots && null !== payload.request.intent.slots) {
            const slots = payload.request.intent.slots;
            if (undefined !== slots.account_number && null !== slots.account_number && undefined !== slots.account_number.value && null !== slots.account_number.value) {
                const accountNumberSlot = slots.account_number;

                done(replyTemplateBuilder('Your account balance for <say-as interpret-as="digits"> ' + accountNumberSlot.value + ' </say-as> is     $1000 ', false));
            } else {
                done(replyTemplateBuilder('Please provide last four digits of your account number', false));
            }
        } else {
            done(replyTemplateBuilder('Please provide last four digits of your account number', false));
        }
    },

    accountBalance: function (payload, done) {
        log.info({
            payload: payload
        }, 'accountBalance');
        if (undefined !== payload.request.intent.slots && null !== payload.request.intent.slots) {
            const slots = payload.request.intent.slots;
            if (undefined !== slots.account_number && null !== slots.account_number && undefined !== slots.account_number.value && null !== slots.account_number.value) {
                const accountNumberSlot = slots.account_number;

                done(replyTemplateBuilder('Your account balance for <say-as interpret-as="digits"> ' + accountNumberSlot.value + ' </say-as> is     $1000 ', false));
            } else {
                done(replyTemplateBuilder('Please provide last four digits of your account number', false));
            }
        } else {
            done(replyTemplateBuilder('Please provide last four digits of your account number', false));
        }
    },

    tearDown: function (done) {
        done(replyTemplateBuilder('Good bye.', true));
    }
}