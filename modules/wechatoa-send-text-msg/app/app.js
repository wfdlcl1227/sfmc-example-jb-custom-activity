// JOURNEY BUILDER CUSTOM ACTIVITY - wechatoa-send-text-msg ACTIVITY
// ````````````````````````````````````````````````````````````
// SERVER SIDE IMPLEMENTATION
//
// This example demonstrates
// * Configuration Lifecycle Events
//    - save
//    - publish
//    - validate
// * Execution Lifecycle Events
//    - execute
//    - stop

const express = require('express');
const configJSON = require('../config/config-json');

// setup the wechatoa-send-text-msg example app
module.exports = function wechatoaTextMsgExample(app, options) {
    const moduleDirectory = `${options.rootDirectory}/modules/wechatoa-send-text-msg`;

    // setup static resources
    app.use('/modules/wechatoa-send-text-msg/dist', express.static(`${moduleDirectory}/dist`));
    app.use('/modules/wechatoa-send-text-msg/images', express.static(`${moduleDirectory}/images`));

    // setup the index redirect
    app.get('/modules/wechatoa-send-text-msg/', function(req, res) {
        return res.redirect('/modules/wechatoa-send-text-msg/index.html');
    });

    // setup index.html route
    app.get('/modules/wechatoa-send-text-msg/index.html', function(req, res) {
        // you can use your favorite templating library to generate your html file.
        // this example keeps things simple and just returns a static file
        return res.sendFile(`${moduleDirectory}/html/index.html`);
    });

    // setup config.json route
    app.get('/modules/wechatoa-send-text-msg/config.json', function(req, res) {
        // Journey Builder looks for config.json when the canvas loads.
        // We'll dynamically generate the config object with a function
        return res.status(200).json(configJSON(req));
    });

    // ```````````````````````````````````````````````````````
    // BEGIN JOURNEY BUILDER LIFECYCLE EVENTS
    //
    // CONFIGURATION
    // ```````````````````````````````````````````````````````
    // Reference:
    // https://developer.salesforce.com/docs/atlas.en-us.mc-apis.meta/mc-apis/interaction-operating-states.htm

    /**
     * Called when a journey is saving the activity.
     * @return {[type]}     [description]
     * 200 - Return a 200 iff the configuraiton is valid.
     * 30x - Return if the configuration is invalid (this will block the publish phase)
     * 40x - Return if the configuration is invalid (this will block the publish phase)
     * 50x - Return if the configuration is invalid (this will block the publish phase)
     */
    app.post('/modules/wechatoa-send-text-msg/save', function(req, res) {
        console.log('debug: /modules/wechatoa-send-text-msg/save');
        return res.status(200).json({});
    });

    /**
     * Called when a Journey has been published.
     * This is when a journey is being activiated and eligible for contacts
     * to be processed.
     * @return {[type]}     [description]
     * 200 - Return a 200 iff the configuraiton is valid.
     * 30x - Return if the configuration is invalid (this will block the publish phase)
     * 40x - Return if the configuration is invalid (this will block the publish phase)
     * 50x - Return if the configuration is invalid (this will block the publish phase)
     */
    app.post('/modules/wechatoa-send-text-msg/publish', function(req, res) {
        console.log('debug: /modules/wechatoa-send-text-msg/publish');
        return res.status(200).json({});
    });

    /**
     * Called when Journey Builder wants you to validate the configuration
     * to ensure the configuration is valid.
     * @return {[type]}
     * 200 - Return a 200 iff the configuraiton is valid.
     * 30x - Return if the configuration is invalid (this will block the publish phase)
     * 40x - Return if the configuration is invalid (this will block the publish phase)
     * 50x - Return if the configuration is invalid (this will block the publish phase)
     */
    app.post('/modules/wechatoa-send-text-msg/validate', function(req, res) {
        console.log('debug: /modules/wechatoa-send-text-msg/validate');
        return res.status(200).json({});
    });


    // ```````````````````````````````````````````````````````
    // BEGIN JOURNEY BUILDER LIFECYCLE EVENTS
    //
    // EXECUTING JOURNEY
    // ```````````````````````````````````````````````````````

    /**
     * Called when a Journey is stopped.
     * @return {[type]}
     */
    app.post('/modules/wechatoa-send-text-msg/stop', function(req, res) {
        console.log('debug: /modules/wechatoa-send-text-msg/stop');
        return res.status(200).json({});
    });

    /**
     * Called when a contact is flowing through the Journey.
     * @return {[type]}
     * 200 - Processed OK
     * 3xx - Contact is ejected from the Journey.
     * 4xx - Contact is ejected from the Journey.
     * 5xx - Contact is ejected from the Journey.
     */
    app.post('/modules/wechatoa-send-text-msg/execute', function(req, res) {
        console.log('debug: /modules/wechatoa-send-text-msg/execute');

        const request = req.body;

        console.log(" req.body", JSON.stringify(req.body));

        // Find the in argument
        function getInArgument(k) {
            if (request && request.inArguments) {
                for (let i = 0; i < request.inArguments.length; i++) {
                    let e = request.inArguments[i];
                    if (k in e) {
                        return e[k];
                    }
                }
            }
        }

        /**
         * Generate a random discount code.
         *
         * Note: This function is for demonstration purposes only and is not designed
         * to generate real random codes. The first digit is always A, B, C, D, or E.
         *
         * @returns {Object}
         *
         * Example Response Object
         * {
         *    "discount":"15",
         *    "discountCode":"ADUXN-96454-15%"
         * }
         */
        function generateRandomCode() {
            let toReturn = String.fromCharCode(65+(Math.random() * 5));
            for(let i = 0; i < 4; i++) {
                toReturn += String.fromCharCode(65+(Math.random() * 25));
            }
            return toReturn + "-" + Math.round(Math.random() * 99999, 0);
        }

        // example: https://developer.salesforce.com/docs/atlas.en-us.noversion.mc-app-development.meta/mc-app-development/example-rest-activity.htm
        const discountInArgument = getInArgument('discount') || 'nothing';
        const responseObject = {
            discount: discountInArgument,
            discountCode: generateRandomCode() + `-${discountInArgument}%`
        };

        console.log('Response Object', JSON.stringify(responseObject));

        return res.status(200).json(responseObject);
    });

};
