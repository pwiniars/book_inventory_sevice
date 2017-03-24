module.exports = function(stockRepository) {
    return {
        stockUp: function(req, res, next) {
            stockRepository
                .stockUp(req.body.isbn, req.body.count)
                .then(function(data) {
                    res.json(data);
                }).catch(next);
        },
        findAll: function(req, res, next) {
            stockRepository
                .findAll()
                .then(function(results) {
                    res.json(results);
                }).catch(next);
        },
        findByIsbn: function(req, res, next) {
            stockRepository
                .findByIsbn(req.params.isbn)
                .then(function(result) {
                    if (result) {
                        res.format({
                            html: function() {
                                res.send('<p>Items in stock: ' + result.count + '</p>');
                            },
                            json: function() {
                                res.json({
                                    count: result.count
                                });
                            },
                        });
                    } else {
                        res.status(404).send('No book with given isbn');
                    }
                }).catch(next);
        }
    };
};