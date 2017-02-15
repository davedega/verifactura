var MongoClient = require('mongodb').MongoClient;


DATABASE = "production";
LOG_LEVEL = "error";
AJASI = 12;
function getUrlDataBase() {

    if (DATABASE == "production") {
        var userName = "dashboard";
        var password = "rA0rjuAxqsBfPRtQnpBK";
        var dbName = "dashboard";
        var hosts = "mongo-dashboard-rs-01.dashboard.amx:27000,mongo-dashboard-rs-02.dashboard.amx:27000,mongo-dashboard-rs-03.dashboard.amx:27000";
        var replicaSet = "dashboardAMX";
        return "mongodb://" + userName + ":" + password + "@" + hosts + "/" + dbName + "?ssl=true&replicaSet=" + replicaSet;
    } else {
        return 'mongodb://' + DATABASE + ':27017/CVMetrics';
    }
}

//region Connection Properties
function getConnectionProperties() {
    if (DATABASE == "production") {
        return {
            server: {
                sslValidate: false
            }, replSet: {
                replicaSet: "dashboardAMX",
                sslValidate: false
            }
        };
    } else {
        return {};
    }
}
var state = {
    db: null
};


exports.connect = function(url,properties, done) {
    if (state.db) return done()

    MongoClient.connect(url,properties, function(err, db) {
        if (err) return done(err)
        state.db = db
        done()
    })
}

exports.get = function(){
    return state.db;
}

exports.close = function(done){
    if (state.db){
        state.db.close(function(err, result){
            state.db = null;
            state.mode = null;
            done(err);
        });
    }
}