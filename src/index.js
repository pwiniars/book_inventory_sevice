var express = require('express');
var bodyParser = require('body-parser');
var assert = require('assert');

module.exports = function(stockRepository) {
    var app = express();
   
    app.use(bodyParser.json());

    app.post('/stock', function(req, res, next) {
        stockRepository
            .stockUp(req.body.isbn, req.body.count)
            .then(function(data) {
                res.json(data);
            }).catch(next);
    });

    app.get('/stock', function(req, res, next) {
        stockRepository
            .findAll()
            .then(function(results) {
                res.json(results);
            }).catch(next);
    });

    app.get('/stock/:isbn', function(req, res, next) {
        stockRepository
            .findByIsbn(req.params.isbn)
            .then(function(result) {
                if (result) {
                    res.json(result);
                } else {
                    res.status(404).send('No book with given isbn');
                }
            }).catch(next);
    });

    app.get('/error', function(req, res) {
        throw new Error("Forced error");
    });

    app.use(urlError);
    app.use(serverError);

    return app;
}

function urlError(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
}

function serverError(err, req, res, next) {
    var status = err.status || 500;
    res.status(status);
    console.error(err.stack);
    res.send('Oh no: ' + status);
}