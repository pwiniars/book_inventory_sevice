module.exports = {
    clientError: function(req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    },
    serverError: function(err, req, res, next) {
        var status = err.status || 500;
        console.error(err.stack);
        res.status(status).send('Oh no: ' + err.message);
        next();
    }
};