var express = require('express');
var bodyParser = require('body-parser');
var assert = require('assert');
var error = require('./error');

module.exports = function(stockRepository) {
    var app = express();
    var routes = require('./routes')(stockRepository);
   
    app.use(bodyParser.json());

    app.post('/stock', routes.stockUp);

    app.get('/stock', routes.findAll);

    app.get('/stock/:isbn', routes.findByIsbn);

    // app.get('/error', function(req, res) {
    //     throw new Error("Forced error");
    // });

    app.use(error.clientError);
    app.use(error.serverError);

    return app;
}