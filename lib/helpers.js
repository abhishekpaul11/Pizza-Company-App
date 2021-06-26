/*
 * Helper modules for the API
 *
 */

//dependencies
var config = require("./config");
var crypto = require("crypto");
var https = require("https");
var querystring = require('querystring');
var path = require('path');
var fs = require('fs')

//container
var helpers = {};

// Parse a JSON string to an object in all cases, without throwing
helpers.parseJsonToObject = function (str) {
    try {
        var obj = JSON.parse(str);
        return obj;
    } catch (e) {
        return {};
    }
};

// Create a SHA256 hash
helpers.hash = function (str) {
    if (typeof str == "string" && str.length > 0) {
        var hash = crypto
        .createHmac("sha256", config.hashingSecret)
        .update(str)
        .digest("hex");
        return hash;
    }else {
        return false;
    }
};

// Create a string of random alphanumeric characters, of a given length
helpers.createRandomString = function (strLength) {
    strLength = typeof strLength == "number" && strLength > 0 ? strLength : false;
    if (strLength) {
        // Define all the possible characters that could go into a string
        var possibleCharacters = "abcdefghijklmnopqrstuvwxyz0123456789";

        // Start the final string
        var str = "";
        for (i = 1; i <= strLength; i++) {
        // Get a random charactert from the possibleCharacters string
        var randomCharacter = possibleCharacters.charAt(
            Math.floor(Math.random() * possibleCharacters.length)
        );
        // Append this character to the string
        str += randomCharacter;
        }
        // Return the final string
        return str;
    } else {
        return false;
    }
};

//Charge a credit card with Stripe
helpers.stripeCharge = function(amount, callback) {
    // validate parameters
    amount = typeof(amount) == "number" && amount > 0 ? amount : false;

    if (amount) {
        // Configure the request payload
        var payload = {
            'amount' : parseInt(amount.toFixed(2) * 100),
            'currency': 'usd',
            'source': 'tok_amex'
        };

        // Stringfy the payload
        var stringPayload = querystring.stringify(payload);
        
        // Configure the request details
        var requestDetails = {
            'protocol' : 'https:',
            'hostname' : 'api.stripe.com',
            'method' : 'POST',
            'path' : '/v1/charges',
            'auth' : config.stripe,
            'headers' : {
                'Content-type' : 'application/x-www-form-urlencoded',
                'Content-length' : Buffer.byteLength(stringPayload)
            }
        };

        // Instantiate the request object
        var req = https.request(requestDetails, res => {
            // Grab the status of the sent request
            var status = res.statusCode;

            // Callback successfuly if the request went through
            if (status == 200 || status == 201) {
                callback(false);
            } else {
                callback('Status code returned was '+ status);
            }
        });
        
        // Bind to the error event so it doesn't get thrown
        req.on('error', e => {
            callback(e);
        });

        // Add the payload
        req.write(stringPayload);

        // End the request
        req.end();

    } else {
        callback('Given parameters are missing or invalid.');
    }
};

// Charge a credit card with Stripe
helpers.mailgunSendEmail = function(toEmail, toName, subject, message, callback) {
    // validate parameters
    var emailRegex = /\S+@\S+\.\S+/;
    toEmail = typeof(toEmail) == 'string' && emailRegex.test(toEmail) ? toEmail.trim() : false;
    toName = typeof(toName) == 'string' && toName.trim().length > 2 ? toName.trim() : false;
    subject = typeof(subject) == 'string' && subject.trim().length > 2 ? subject.trim() : false;
    message = typeof(message) == 'string' && message.trim().length > 2 ? message.trim() : false;
    

    if (toEmail && toName && message) {
        // Configure the request payload
        var payload = {
            'from' : 'pizza@' + config.mailGun.domain,
            'to' : toEmail,
            'subject' : subject,
            'text' : message
        };

        // Stringfy the payload
        var stringPayload = querystring.stringify(payload);
        
        // Configure the request details
        var requestDetails = {
            'protocol' : 'https:',
            'hostname' : 'api.mailgun.net',
            'method' : 'POST',
            'path' : '/v3/' + config.mailGun.domain + '/messages',
            'auth' : 'api:' + config.mailGun.api,
            'headers' : {
                'Content-type' : 'application/x-www-form-urlencoded',
                'Content-length' : Buffer.byteLength(stringPayload),
            }
        };

        // Instantiate the request object
        var req = https.request(requestDetails, res => {
            // Grab the status of the sent request
            var status = res.statusCode;

            // Callback successfuly if the request went through
            if (status == 200 || status == 201) {
                callback(false);
            } else {
                callback('Status code returned was '+ status);
            }
        });
        
        // Bind to the error event so it doesn't get thrown
        req.on('error', e => {
            callback(e);
        });

        // Add the payload
        req.write(stringPayload);

        // End the request
        req.end();

    } else {
        callback('Given parameters are missing or invalid.');
    }
};

// Get the string content of a template, and use provided data for string interpolation
helpers.getTemplate = function (templateName, data, callback) {
    // validate templateName
    templateName = typeof (templateName) == 'string' && templateName.length > 0 ? templateName : false;
    data = typeof (data) == 'object' && data !== null ? data : {};
    if (templateName) {
        var templatesDir = path.join(__dirname, '/../templates/');
        fs.readFile(templatesDir + templateName + '.html', 'utf8', function (err, str) {
            if (!err && str && str.length > 0) {
                // Do interpolation on the string
                var finalString = helpers.interpolate(str, data);
                callback(false, finalString);
            } else {
                callback('No template could be found');
            }
        })
    } else {
      callback('A valid template name was not specified');
    }
}

// Add the universal header and footer to a string, and pass provided data object to header and footer for interpolation
helpers.addUniversalTemplates = function (str, data, callback) {
    str = typeof (str) == 'string' && str.length > 0 ? str : '';
    data = typeof (data) == 'object' && data !== null ? data : {};
    // Get the header
    helpers.getTemplate('_header', data, function (err, headerString) {
        if (!err && headerString) {
        // Get the footer
        helpers.getTemplate('_footer', data, function (err, footerString) {
            if (!err && headerString) {
                // Add them all together
                var fullString = headerString + str + footerString;
                callback(false, fullString);
            } else {
                callback('Could not find the footer template');
            }
        });
        } else {
            callback('Could not find the header template');
        }
    });
};

// Take a given string and data object, and find/replace all the keys within it
helpers.interpolate = function (str, data) {
    str = typeof (str) == 'string' && str.length > 0 ? str : '';
    data = typeof (data) == 'object' && data !== null ? data : {};

    // Add the templateGlobals to the data object, prepending their key name with "global."
    for (var keyName in config.templateGlobals) {
        if (config.templateGlobals.hasOwnProperty(keyName)) {
            data['global.' + keyName] = config.templateGlobals[keyName]
        }
    }

    // For each key in the data object, insert its value into the string at the corresponding placeholder
    for (var key in data) {
        if (data.hasOwnProperty(key) && typeof (data[key] == 'string')) {
            var replace = data[key];
            var find = '{' + key + '}';
            str = str.replace(find, replace);
        }
    }
    return str;
};

// Get the contents of a static (public) asset
helpers.getStaticAsset = function (fileName, callback) {
    fileName = typeof (fileName) == 'string' && fileName.length > 0 ? fileName : false;
    if (fileName) {
        var publicDir = path.join(__dirname, '../public/');
        fs.readFile(publicDir + fileName, function (err, data) {
            if (!err && data) {
                callback(false, data);
            } else {
                callback('No file could be found');
            }
        });
    } else {
        callback('A valid file name was not specified');
    }
};

//export modules
module.exports = helpers