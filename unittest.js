var assert = require('assert');

assert.equal("s1", "s1");

var restify = require('restify')

var client = restify.createStringClient({
  url: 'http://localhost:8080'
})
var jsonClient = restify.createJsonClient({
  url: 'http://localhost:8080'
})

function assertEquals(expected, actual) {
	assert.equal(expected, actual, "expected '" + expected + "' but got '" + actual + "'");
}

function postFoo() {
	jsonClient.post('/foo', {"hello": {"name1": "sven"}}, function(err, req, res, obj) {
		assert.ifError(err);
		console.log('%d -> %j', res.statusCode, res.headers);
		console.log('%j', obj);
	});

}
function callClean() {
	console.log("--- cleaning");
	client.del('/delete/all', function(err, req, res, data) {
		assertEquals('delete called', data);
		console.log('%s', data);

		callGetSven1();
	});
}

function callGetSven1() {
	console.log("--- get");
	client.get('/text/sven', function(err, req, res, data) {
		assertEquals('error=sven not found in DB', data);
		console.log('%s', data);

		callSaveSven();

	});
}
function callGetSven2() {
	console.log("--- get");
	client.get('/text/sven', function(err, req, res, data) {
		assertEquals('text=text1', data);
		console.log('%s', data);

		console.log('*** TEST DONE ***');
			//postFoo2();
			//postFoo();
	});
}

function callSaveSven() {
	console.log("--- save");
	jsonClient.post('/text', {"input": {"key": "sven", "text": "text1"}}, function(err, req, res, obj) {
		assert.ifError(err);
		console.log('%d -> %j', res.statusCode, res.headers);
		console.log('%j', obj);
	});
}

callClean();

postFoo();

