/// <reference path="../typings/mocha/mocha.d.ts"/>
"use strict";
var sinon = require('sinon');
var chai = require('chai');
var expect = chai.expect;


describe("Routes", function() {
  describe("GET Index", function() {
    var app;
    beforeEach(function () {
      app = require('../app');
    });
    it('responds to /', function testHomepage(done) {
        done();
    });


  });
});