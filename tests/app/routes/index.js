import request from 'request';
import assert from 'assert';

import 'bin/www';

describe('Node API Version Server', () => {
    it('should return 200', done => {
        request('http://127.0.0.1:3000/', function (error, response, body) {
            assert.equal(200, response.statusCode);
            done();
        });
    });
});
