var repository = require('./stock_repository');
var app = require('./index')(repository);
var port = process.env.PORT || 3000;

app.listen(port, function () {
    console.log('Example app listening on port: ' + port);
});