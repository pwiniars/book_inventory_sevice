var assert = require('assert');
const request = require('supertest');
const repo = require('../src/in_memory_repository')();
var app = require('../src/index')(repo);

describe('Book inventory test', function () {
    it('allows to stock up the items', function (done) {
    	request(app)
  			.post('/stock')
  			.send({ isbn: '37831643', count: 10 })
  			.expect('Content-Type', /json/)
  			.expect(200)
  			.expect({ isbn: '37831643', count: 10 })
  			.end(function(err, res) {
    			if (err) throw err;
    			done();
    		});
  	});
});