
/*
 * GET home page.
 */

var https = require('https'),
	nextMeeting = "",
	cache = require('memory-cache');

//https://api.meetup.com/2/events?&sign=true&group_id=10250862&page=20&key=71453431395662501f61504236216c32

var httpsOptions = {
	hostname: 'api.meetup.com',
	port: 443,
	path: '/2/events?&sign=true&group_id=10250862&page=20&key=71453431395662501f61504236216c32',
	method: 'GET'
};

exports.index = function(req, res){
	console.log("Index started");
	var cMeetings = cache.get('nextMeeting');
	if (cMeetings !== null)
	{
		res.render('index', { title: 'Jax Node User Group', meetingArray: cMeetings });
	} else {
		var sreq = https.request(httpsOptions, function (response) {
			response.setEncoding('utf8');
			response.on('data', function (chunk) {
				console.log('receiving data.');
				nextMeeting += chunk;
			});
			response.on('end', function() {
				console.log('request has ended.');
				var meetingObject = JSON.parse(nextMeeting);
				cache.put('nextMeeting', meetingObject.results, 3600000);
				nextMeeting = "";
				res.render('index', { title: 'Jax Node User Group', meetingArray: meetingObject.results });
			});
		});
		sreq.on('error', function(e) {
			console.log('problem with request: ' + e.message);
		});
		sreq.write('data\n');
		sreq.end();
	}
};