var low = require('lowdb');
var FileSync = require('lowdb/adapters/FileSync');
var adapter = new FileSync('db.json');
var db = low(adapter);

db.defaults({books: []})
  .write()
db.defaults({users: []})
.write();
db.defaults({transactions: []})
.write();
db.defaults({cookie: []})
.write();

module.exports = db;