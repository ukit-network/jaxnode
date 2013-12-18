
var util = require('util'),
    twitter = require('twitter'),
	async = require('async'),
	myJson = "";

var twit = new twitter({
    consumer_key: 'tBCQH0VMMNG1GMfAP8zJXw',
    consumer_secret: 'had3p8keStIZha6dE9EJ4F4cwKVsk1VtfsyHbRAmZQ',
    access_token_key: '2148983065-T9dlP0yquLJqmA9MbJlfQz9ZzUOOXKTKfpeeub9',
    access_token_secret: 'CQ7tGg6kEnAWsxR96SA1N6KTpWI2rjuvDWGpFP9wcqY0K'
});

exports.twitterclient = function (handler) {
	twit.get('/statuses/user_timeline.json', {include_entities:true}, function(data) {
		async.map(data, printTweets, handleResult);
	});
}

function printTweets(item, index) {
	//console.log(item.text);
	//console.log("<br />");
}

function handleResult(err, results) {
	console.log(err);
	console.log(results);
}

