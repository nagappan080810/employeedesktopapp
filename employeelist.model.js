var PouchDB = require('pouchdb-browser')

var db = new PouchDB('employeedb')

const remote_url = 'http://admin:admin@127.0.0.1:5984/employeedb';

db.sync(remote_url, {live: true}).on('change', function() {
    console.log("change happened");
}).on('error', function(){
    console.log("error happened");
});

db.addEmployee = function (employeeObj) {
    employeeObj._id = new Date().toISOString();
    employeeObj.completed = false;
    db.put(employeeObj, function(err, result) {
        if (!err) {
            console.log("successfully add a employee");
            console.log(result);      
        }
    })
}

module.exports = db;