var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var assert = require('assert');
var stockRepository = null;

function logRequest(req, res, next) {
	console.log('incoming request at ', new Date());
	next();
}

function auth(req, res, next) {
	console.log('you can pass my auth');
	next();
}

app.use(logRequest);
app.use(auth);
app.use(bodyParser.json());

app.post('/stock', function (req, res, next) {
	stockRepository
	.stockUp(req.body.isbn, req.body.count)
	.then(function(data) {
		res.json(data);
	}).catch(next);
});

app.get('/stock', function (req, res, next) {
	stockRepository
	.stockAll()
	.then(function(results) {
		res.json(results);
	}).catch(next);
});

app.get('/stock/:isbn', function (req, res, next) {
	stockRepository
	.stockByIsbn(req.params.isbn)
	.then(function(result) {
		if (result) {
			res.json(result);
		} else {
			res.status(404).send('No book with given isbn');
		}
	}).catch(next);
});

app.get('/error', [logRequest, auth], function (req, res) {
    throw new Error("Forced error");
});

function urlError(req, res, next) {
	var err = new Error('Not Found');
    err.status = 404;
    next(err);
}

function serverError(err, req, res, next) {
	var status = err.status || 500;
    res.status(status);
	console.error(err.stack);
    res.send('Oh no: '+ status);
}

app.use(urlError);
app.use(serverError);

module.exports = function(repository) {
	stockRepository = repository;
	return app;
}