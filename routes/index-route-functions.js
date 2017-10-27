'use strict';
/*
 * GET home page.
 */

exports.index = function index(req, res) {
    req.service.getNextMeetup(function callback(err, results) {
        if (err) {
            console.log('problem with meetup request: ' + err);
            res.status(500).render('error', {
                message: 'No app exists',
                error: {
                    status: '500',
                    stack: 'App Error'
                }
            });
        } else {
            var meetingArray = results;
            req.service.getTweets(function cb(err2, tweetResults) {
                if (err2) {
                    console.log('problem with twitter request: ' + err2);
                    res.status(500).render('error', {
                        message: 'No tweets',
                        error: {
                            status: '500',
                            stack: 'App Twitter Error'
                        }
                    });
                } else {
                    if (meetingArray) {
                        var displayMeetup = Object.keys(meetingArray).length !== 0;
                        if (displayMeetup && meetingArray.hasOwnProperty('venue')) {
                            var displayMap = Object.keys(meetingArray.venue).length !== 0;
                        }
                    }
                    var displayTweets = tweetResults.tweets.length !== 0;
                    res.render('index', {
                        title: 'JaxNode User Group',
                        meeting: meetingArray,
                        tweets: tweetResults.tweets,
                        displayMeetup: displayMeetup,
                        displayMap: displayMap,
                        displayTweets: displayTweets
                    });
                }
            });
        }
    });
};

exports.code = async function code(req, res) {
    var pagenum = 0;
    if (req.params.page && !isNaN(req.params.page)) {
        pagenum = req.params.page;
    }
    try {
        const resp = await req.getCode();
        const sortedRepos = resp.repos.sort(nameCompare);
        const repopage = sortedRepos.slice(parseInt(pagenum) * 10, parseInt(pagenum) * 10 + 10);
        const pageCount = Math.ceil(sortedRepos.length / 10);
        res.render('code', { title: 'Jax Node GitHub code', repos: repopage, currPage: pagenum, pageCount: pageCount });
    } catch (err) {
        console.log('problem with request: ' + err);
        res.status(500).render('error', {
            message: 'problem with request',
            error: {
                status: '500',
                stack: 'problem with request'
            }
        });
    }
};

exports.api = function api(req, res) {
    req.service.getNextMeetup(function callback(err, results) {
        if (err) {
            console.log('problem with request: ' + err);
            res.status(500).send({ meeting: 'Error occured' });
        } else {
            res.send({ meeting: results });
        }
    });
};

function nameCompare(a, b) {
    // if (a.name === undefined || b.name === undefined) {
    //     return 0;
    // }
    const nameA = a.name.toLowerCase();
    const nameB = b.name.toLowerCase();
    if (nameA < nameB) { //sort string ascending
        return -1;
    }
    if (nameA > nameB) {
        return 1;
    }
    return 0; //default
}

exports.nameCompare = nameCompare;
