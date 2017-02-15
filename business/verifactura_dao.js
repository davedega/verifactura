/**
 * Created by davedega on 12/02/17.
 */
var db = require('./../db/db.js');

module.exports = {
    newCFDI: function (emisor, receptor, id, total, qr, callback) {
        console.log("DAO, emisor:" + emisor);
        console.log("DAO, receptor:" + receptor);
        console.log("DAO, id: " + id);
        console.log("DAO, total: " + total);
        console.log("DAO, qr: " + qr);
        db.newCFDI(emisor, receptor, id, total, qr, function (response) {
            callback(response)
        });
    }
}