'use strict';


const wrapperTemplalte = function () {

    return {
        "version": "1.0",
        "sessionAttributes": {},
        "response": {
            "shouldEndSession": true,
            "outputSpeech": {
                "type": "SSML",
                "ssml": "<speak>Your name is gunjan and you are 25 years old</speak>"
            }
        }

    }


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
    helloIntent: function (slot, done) { // maps hello intent with a "name" slot
        const template = wrapperTemplalte();
        template.response = {
            outputSpeech: {
                type: 'PlainText',
                text: 'Hello , this is intent handler  ' // + slot.name
            },
            shouldEndSession: false
        };
        done(template);


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