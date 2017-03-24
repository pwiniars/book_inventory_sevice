var MongoClient = require('mongodb').MongoClient;
var collection = null;
// Connection URL
var url = 'mongodb://localhost:27017/booksdb'

var connectionPromise = MongoClient.connect(url, { bufferMaxEntries: 0 });
var collectionPromise = connectionPromise.then(function(db) {
	return db.collection('books');
});

exports.stockUp = function(isbn, count) {
	var data = {
		isbn,
		count
	}

	return collectionPromise.then(function(collection) {
		return collection.updateOne({isbn}, data, {upsert: true});
	}).then(function() {
		return data;
	});
}

exports.findAll = function() {
	return collectionPromise.then(function(collection) {
		return collection.find({}).toArray();
	});
}

exports.findByIsbn = function(isbn) {
	return collectionPromise.then(function(collection) {
		return collection.find({isbn}).limit(1).next();
	});
}
