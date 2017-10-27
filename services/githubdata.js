'use strict';

const fetch = require('node-fetch');
const cache = require('memory-cache');
/*
 * Setting up link to GitHub
 */
function getCode(cb) {
    const githubcache = cache.get('githubrepos');
    if (githubcache) {
       cb(null, { repos: githubcache });
    } else {
        fetch('https://api.github.com/orgs/jaxnode-ug/repos', 
            { 
                headers: { 
                    Accept: 'application/vnd.github.v3+json',
                    'User-Agent': 'JaxNode' 
                } 
            }).then(response => {
                return response.json();
            }).then(json => {
                cache.put('githubrepos', json, 3600000);
                cb(null, { repos: json });
            }).catch(err => { 
                console.error(err);
                cb(err, { repos: [] });
            });
    }
}

module.exports = getCode;
