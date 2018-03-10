var request = require('request');
var expect = require('chai').expect;


describe('server', function() {
    it('should respond with a false boolean on requests to /emailCheck with invalid email', function(done) {
      request('http://127.0.0.1:3000/emailCheck', function(req, res, body) {

        expect(body).to.equal('false');
        done();
      });
    });
  
  });