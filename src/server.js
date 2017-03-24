var app = require('./index')(require('./stock_repository'));

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});