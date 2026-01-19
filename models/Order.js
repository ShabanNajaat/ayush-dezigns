const Datastore = require('nedb-promises');
const path = require('path');

// Initialize the database in a file named 'orders.db' in the parent directory or current directory
// Let's put it in the root folder alongside server.js
const dbPath = path.join(__dirname, '..', 'orders.db');
const orders = Datastore.create(dbPath);

module.exports = orders;
