/*
	Problem: We need a simple way to look at a user's badge count and JavaScript points
	Solution: Use node.js to connect to Treehouse's API to get profile information to print out
 */
 	var profile = require('./profile.js');
	var url = "https://teamtreehouse.com/";
	var profileName = "konstantinminevich";

	profile.get(url, profileName);