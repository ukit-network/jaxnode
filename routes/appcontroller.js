"use strict";

/*
 * List apps
 */
var path = require('path'); 
var appdata = require(path.join(__dirname, '../data/apps.json'));

function getApps(req, res) {
	//res.send({ apps: [ { name: 'JaxNode Console JNN'}] });
    console.log(appdata);
    res.render('apps', { title: 'JaxNode User Group Apps'});
}

module.exports = getApps;