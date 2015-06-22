/// <reference path="../typings/mocha/mocha.d.ts"/>
"use strict";
var sinon = require('sinon');
var chai = require('chai');
var request = require('supertest');
var express = require('express');
var routes = require('../routes');
var path = require('path');

var expect = chai.expect;


var app = express();
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, '../views'));
console.log(__dirname + '../views');
app.set('view engine', 'jade');
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);

app.get('/', routes.index);


describe("Routes", function() {
  describe("GET Index", function() {

    it('responds to /', function testHomepage(done) {
        request(app)
          .get('/')
          .expect('Content-Type', /text\/html/)
          .expect(200)
          .end(function(err, res){
            done(err);
          });
    });
  });
});