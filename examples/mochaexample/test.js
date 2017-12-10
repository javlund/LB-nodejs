const assert = require('assert');
const utils = require('./utils');

describe('Utils', function() {
  describe('#addThree', function() {
    it('should add three to the result', function() {
      const result = utils.addThree(4);
      assert.equal(7, result);
    });
  });
  
  describe('#removeDecimals', function() {
    it('should remove all decimals from the number', function() {
      const result = utils.removeDecimals(5.343);
      assert.equal(5, result);
    });
  });

  describe('#simpleServer', function() {
    
    beforeEach(function() {
      utils.startSimpleServer();
    });

    afterEach(function() {
      utils.stopSimpleServer();
    });

    it('should create a HTTP server listening on port 6754', function(done) {
      const http = require('http');
      http.get('http://localhost:6754', function(res) {
        res.on('data', function(data) {
          assert.equal('Hello', data.toString(), 'Ikke det korrekte resultat');
          done();
          // Ovenstående svarer også til:
          /*if(data.toString() == 'Hello') {
            done();
          } else {
            throw new Error('Ikke det korrekte resultat');
          }*/
        });
      });
    });
  });
});
