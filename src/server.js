var repository = require('./stock_repository');
var app = require('./index')(repository);

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});