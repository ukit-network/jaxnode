'use strict';

var getTheSponsors = require('../services/sponsordata');

function getNextMeeting(req, res) {
    req.service.getNextMeetup(function callback(err, results) {
        if (err) {
            res.status(500).send({ meeting: 'Error occured' });
        } else {
            res.send({ meeting: results });
        }
    });
}

function getSponsors(req, res) {
    res.send(getTheSponsors());
}

async function getGitHubCode(req, res) {
    try {
        const results = await req.getCode();
        res.send(results.repos);
    } catch (err) {
        console.log('problem with request: ' + err);
        res.status(500).send({
            message: 'problem with request',
            error: {
                status: '500',
                stack: 'problem with request'
            }
        });
    }
}

exports.meeting = getNextMeeting;
exports.sponsors = getSponsors;
exports.github = getGitHubCode;
