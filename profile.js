function getProfile (url, profileName) {
	'use strict';
	var http = require('http'),
		https = require('https');

	// Print profile data
	function printMessage(username, badgeCount, points) {
		var message = username + ' has ' + badgeCount + ' total badge(s) and ' + points + ' in JavaScript';
		console.log(message);
	}
	// Print error messages
	function printError(error) {
		console.log(error.message);
	}

	// 1. Connect to the API URL (http://teamtreehouse/profileName.json)
	var request = https.get(url + profileName + '.json', function(response) {
		var body = '';
		response.setEncoding('utf8');
		// 2. Read the data
		response.on('data', function(dataChunk) {
			body += dataChunk;
		});
		// When data stream ends...
		response.on('end', function() {
			if (response.statusCode === 200){
				// Parse errors
				try {
					// 3. Parse the data
					var profile = JSON.parse(body);
					// 4. Print the data out
					printMessage(profile.name, profile.badges.length, profile.points.JavaScript);
					console.log('------- end of data stream -------');
				} catch(error) {
					printError(error);
				}
			} else {
				// status code error
				printError({
					message: 'There was a problem acquiring profile information for ' + profileName + '. Status code: ' + http.STATUS_CODES[response.statusCode]
				});
			}
		});
	});

	// Connection errors
	request.on('error', printError);
}

module.exports.get = getProfile;