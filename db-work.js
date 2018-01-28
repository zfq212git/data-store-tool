var jiajiemi = require('./jiajiemi.js');
var mysql = require('mysql'),
    async = require('async');

var host = "localhost";
var database = "test";
var user = "feiqizhang";
var password = "";


var dbpool;

exports.init = function (callback) {
    async.waterfall([
        function (cb) {
            dbpool = mysql.createPool({
                connectionLimit: 200,
                host: host,
                user: user,
                password: password,
                database: database,
            });
            cb(null);
        }
    ], callback);
};

exports.insertData = function (desp, dataItem, callback) {
    
    async.waterfall([
        function (cb) {
            dbpool.query(
                "INSERT INTO datalist1 VALUES (?, ?)",
                [desp, jiajiemi.jiami(dataItem,desp)], function(err, result) {
                if (err) {
                    // 普通出错
                    callback(0);
                    if (err.number == 1062) {
                        console.log("未知error");
                    } else {
                        console.log('运行出错：' + err.message);
                    }
                } else if (result) {
                    // 正常
                    callback(1);
                    console.log("写入正常");
                } else {
                    console.log('未知运行出错');
                }
            });   
            cb(null);
        }
    ]);
};


exports.findData = function (desp, callback) {
    
    async.waterfall([
        function (cb) {
            dbpool.query(
                "SELECT * FROM datalist1 WHERE name = ?",
                [desp], function(err, results, fields) {
                if (err) {
                    // 普通出错
                    callback(0,"run into error");
                    if (err.number == 1062) {
                        console.log("未知error");
                    } else {
                        console.log('运行出错：' + err.message);
                    }
                } else if (results) {
                    if(results.length == 0){
                        callback(0,"no record found");
                        return;
                    }
                    // 正常
                    var d1 = results[0];
                    var d2 = d1['dataitem'];
                    var d2_decode = jiajiemi.jiemi(d2,desp);
                    console.log("查询(解码）正常");
                    callback(1,d2_decode);
                    
                } else {
                    callback(0,"run into error");
                    console.log('未知运行出错');
                }
            });   
            cb(null);
        }
    ]);
};

exports.updateData = function (desp, dataItem, callback) {
    
    async.waterfall([
        function (cb) {
            dbpool.query(
                "UPDATE datalist1 SET dataitem = ? WHERE name = ?",
                [jiajiemi.jiami(dataItem,desp),desp], function(err, result) {
                if (err) {
                    // 普通出错
                    callback(0);
                    if (err.number == 1062) {
                        console.log("未知error");
                    } else {
                        console.log('运行出错：' + err.message);
                    }
                } else if (result) {
                    // 正常
                    callback(1);
                    console.log("更新正常");
                } else {
                    console.log('未知运行出错');
                }
            });   
            cb(null);
        }
    ]);
};




