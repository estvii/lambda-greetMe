// non async await , node 6.1? run time
// exports.handler = (event, context, callback) => {

//     callback(null,result);
// };

// Exmaple lambda handler being used of it being used
// exports.handler = async (event, context) => {
//     const data = event.data;
//     let newImage = await resizeImage();
//     return newImage;
// }

// const resizeImage = (data) => new Promise((resolve,reject) => {
//     if (error) {
//         reject(error);
//     } else {
//         resolve(result)
//     }
// });

// Understanding Context
// exports.handler = async(event,context) => {
//     context.getRemainingTimeInMillis();

//     // Returns info of the current invocation or info of this functino
//     context.functionName;
//     context.functionVersion;
//     context.functionArn;
//     context.awsRequestId;
//     context.memoryLimitInMb;
//     context.identity;
//     context.logGroupName;
//     context.logStreamName;
//     context.clientContext.client.Custom;
//     context.clientContext.client.InstallationId;
//     context.clientContext.env.model;
// };

// Logging and Error Handling
// exports.handler = async(event,context) => {
//     // const error = new Error('An error occured');
//     // throw error;

//     console.error("An error has occured");
//     console.log("A log message");
//     console.info("an informative message");
//     console.warn("warning message");

// };

const moment = require('moment');

const greeting = {
    "en": "hello",
    "fr": "bonjour",
    "hi": "Namaste",
    "es": "hola",
    "pt": "ola",
    "ur": "assalamo aleikum",
    "it": "ciao",
    "de": "Hallo"
}

exports.handler = async (event) => {
    // pathParameters is a predefined parameter of the api gateway proxy
    let name = event.pathParameters.name;
    let { lang, ...info } = event.queryStringParameters || {};

    let message = `${greeting[lang] ? greeting[lang] : greeting['en']} ${name}`;
    let response = {
        message: message,
        info: info,
        timestamp: moment().unix()
    }

    // since api gate way expect a http object we need to return an http object and not a standard object below.
    // needs a status code and body
    return {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin": "*" //* allows any sites to access it, otherwise u can restrict it by replacing * with e.g. test-cors.org, so only that site can access it
        },
        body: JSON.stringify(response)
    }
};