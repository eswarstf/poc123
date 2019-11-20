'user strict';

var mysql = require('mysql');

//local mysql db connection
var connection = mysql.createConnection({
    host: '166.62.28.83',
    user: 'kaburulu_admin',
    password: 'AkixdV@EF8291',
    database: 'phutBoxDB'
    // host: 'localhost',
    // user: 'root',
    // password: '',
    // database: 'test2'
});
connection.connect(function (err) {
    if (err) {throw err;}else{
        console.log("Connected");
    }
});
module.exports = connection;