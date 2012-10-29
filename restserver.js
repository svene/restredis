var restify = require('restify')
var redis = require("redis"), client = redis.createClient();

client.on("error", function(err) {
	console.log("Error " + err);
});

function respond(req, res, next) {
	res.send('hello ' + req.params.name);
}

function deleteIt(req, response, next) {
	var key = req.params.key
	console.log("DDD in delete, key=" + key);
	if ("all" == key) {
		console.log("DDD deleting well known entries");
		client.del('string key', redis.print)
		client.del('sven', redis.print)
		console.log("DDD done with deleting well known entries");
	}
	response.send('delete called');
}

function textByKey(req, response, next) {
	var key = req.params.key
	if (!key) {
		response.status(404);
		response.send("error=required request parameter 'key' missing");
		return;
	}

		client.get(key, function(err, res) {
			console.log("GGG " + res);
			if (res) {
				console.log("GGG found " + key);
/*
				// Simulate long working time:
				setTimeout(function() {
					response.send('text=' + res);
				}, 5000);
*/				
				response.send('text=' + res);
			}
			else {
				console.log("GGG " + key + " not found");
				response.status(404);
				response.send('error=' + key  + " not found in DB");
			}
		});
}

function saveIt(req, response, next) {
	console.log("SSS in saveIt");
//	console.log(req.body);
	var key = req.params.key
	if (!key) {
		response.status(404);
		response.send("error=required request parameter 'key' missing");
		return;
	}
	var txt = req.params.txt
	if (!txt) {
		response.status(404);
		response.send("error=required request parameter 'txt' missing");
		return;
	}
	console.log("SSS trying to save");
	client.set(key, txt, function(err, res) {
		console.log("SSS saved " + key + "=" + txt);
	});
//	client.get(key, redis.print);
	response.send('saved ' + key + "=" + txt);	
}

function foo(req, response, next) {
	console.log("FFF2 in foo");
	var hello = req.params.hello;
	console.log("FFF2: body: ", req.body);
	var json = req.body;
	console.log("FFF2: json: ", json);
	console.log("FFF2: hello: ", json.hello);
	console.log("FFF2: hello.name1: ", json.hello.name1);

	response.contentType = 'json';
	response.send({"hello": "world"});
}

function saveIt2(req, response, next) {
	console.log("S2: in saveIt2");
	var input = req.body.input;
	var key = input.key;
	var text = input.text;
	console.log("S2: key=", key, ", text=", text);

	console.log("S2: trying to save");
	client.set(key, text, function(err, res) {
		console.log("SSS saved " + key + "=" + text);
	});
	response.send('saved ' + key + "=" + text);	

//	response.contentType = 'json';
//	response.send({"hello": "world"});
}

var server = restify.createServer();
server.use(restify.queryParser());
server.use(restify.bodyParser({ mapParams: false }));
server.get('/hello/:name', respond);
server.head('/hello/:name', respond);
server.get('/save/:key', saveIt);

server.post('/text', saveIt2);

server.del('/delete/:key', deleteIt);

server.get('/text/:key', textByKey);

server.post('/foo', foo);

server.listen(8080, function() {
	console.log('%s listening at %s', server.name, server.url);
});