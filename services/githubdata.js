"use strict";

var https = require('https');

/*
 * Set up GitHub http options for the GitHub API.
 */
var gitHubOptions = {
	hostname: 'api.github.com',
	port: 443,
	path: '/users/jaxnode/repos',
	method: 'GET',
	headers: {
		'Accept': 'application/vnd.github.v3+json',
		'User-Agent': 'JaxNode'
	}
};

var GitHubData = function GitHubData() {};

/*
 * Setting up link to GitHub
 */
GitHubData.prototype.getCode = function getCode(cb) {
	var reposText = "";
	var githubReq = https.request(gitHubOptions, function(response) {
		response.setEncoding('utf8');
		response.on('data', function (chunk) {
			//console.log('receiving data.');
			reposText += chunk;
		});
		response.on('end', function() {
			console.log('request has ended.');
			//console.log(reposText);
			var reposArray =  JSON.parse(reposText);
			//console.log(reposArray);
			//, repos: reposArray 
			cb(null, { repos: reposArray })	
		});
	});
	githubReq.on('error', function(e) {
		console.log('problem with request: ' + e.message);
		cb(e, { repos: [] });	
	});
	githubReq.write('data\n');
	githubReq.end();
};

module.exports = new GitHubData();