/**
 * Created by davedega on 14/02/17.
 */
var dao = require('../business/verifactura_dao.js');
// var fs = require('fs');

module.exports = function (app) {
    console.log("initializing routes...");

    app.use(function (req, res, next) {
        // res.header('Access-Control-Allow-Credentials', 'true');
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
        res.header('Access-Control-Allow-Headers', 'Authorization, Content-Type, unit, limit, qty, skip');
        res.header('Access-Control-Allow-Origin', '*');
        next();
    });


    //sign up
    app.post('/cfdi', function (req, res) {
            console.log('/cfdi called with following params: ');
            var emisor = req.body.emisor;
            var receptor = req.body.receptor;
            var id = req.body.id;
            var total = req.body.total;
            var qr = req.body.qr;

            console.log('emisor' + emisor);
            console.log('receptor' + receptor);
            console.log('id' + id);
            console.log('total' + total);
            console.log('qr' + qr);
        
            dao.newCFDI(emisor, receptor, id, total, qr, function (response) {
                res.send(JSON.stringify(response));
            });

        }
    );


};

function getFormattedTime() {
    var time = new Date();
    time = time.toString().replace(/\s+/g, '_');
    time = time.toString().replace(/:+/g, '_');
    time = time.toString().replace(/\(/, '_');
    time = time.toString().replace(/\)/, '_');
    return time;
};

//endregion
