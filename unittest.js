var assert = require('assert');

assert.equal("s1", "s1");

var restify = require('restify')

var client = restify.createStringClient({
  url: 'http://localhost:8080'
})

function assertEquals(expected, actual) {
	assert.equal(expected, actual, "expected '" + expected + "' but got '" + actual + "'");
}

console.log("--- cleaning");
client.del('/delete/all', function(err, req, res, data) {
	assertEquals('delete called', data);
	console.log('%s', data);

	console.log("--- get");
	client.get('/text/sven', function(err, req, res, data) {
		assertEquals('error=sven not found in DB', data);
		console.log('%s', data);


		console.log("--- save");
		client.get('/save/sven?txt=text1', function(err, req, res, data) {
			assertEquals('saved sven=text1', data);
			console.log('%s', data);

			console.log("--- get");
			client.get('/text/sven', function(err, req, res, data) {
				assertEquals('text=text1', data);
				console.log('%s', data);

				console.log('*** TEST DONE ***');
			});

		});

	});
});

