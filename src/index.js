'use strict';

import Alexa from 'alexa-sdk'

const INVOCATION_NAME = process.env.INVOCATION_NAME || "Copy Cat";
const APP_ID = process.env.APP_ID;

// Note: these functions can't be ES6 arrow functions; "this" ends up undefined if you do that.
const handlers = {
    'WhisperIntent': function () {
        let slots = this.event.request.intent.slots;
        let message = slots.Message.value;
        let speechOutput = `<amazon:effect name="whispered">${message}</amazon:effect>`;
        this.emit(':tell', speechOutput);
    },
    'EmphasizeIntent': function () {
        let slots = this.event.request.intent.slots;
        let message = slots.Message.value;
        let speechOutput = `<emphasis level="strong">${message}</emphasis>`;
        this.emit(':tell', speechOutput);
    },
    'LowPitchIntent': function () {
        let slots = this.event.request.intent.slots;
        let message = slots.Message.value;
        let speechOutput = `<prosody pitch="low">${message}</prosody>`;
        this.emit(':tell', speechOutput);
    },
    'SlowIntent': function () {
        let slots = this.event.request.intent.slots;
        let message = slots.Message.value;
        let speechOutput = `<prosody rate="slow">${message}</prosody>`;
        this.emit(':tell', speechOutput);
    },
    'LaunchRequest': function () {
        let speechOutput = `Welcome to ${INVOCATION_NAME}`;
        this.emit(':ask', speechOutput, "What would you like to do?");
    },
    'AMAZON.HelpIntent': function () {
        let speechOutput = `Welcome to ${INVOCATION_NAME}`;
        this.emit(':ask', speechOutput, "What would you like to do?");
    },
    'AMAZON.StopIntent': function () {
        let speechOutput = "Goodbye";
        this.emit(':tell', speechOutput);
    },
    'AMAZON.CancelIntent': function () {
        let speechOutput = "Okay";
        this.emit(':tell', speechOutput);
    }
};

exports.handler = (event, context, callback) => {
    let alexa = Alexa.handler(event, context);
    // Only set appId if not debugging
    if ('undefined' === typeof process.env.DEBUG) {
        alexa.appId = APP_ID;
    }
    alexa.registerHandlers(handlers);
    alexa.execute();
};
