var db = require('./db-work.js');
var http = require('http'), qs = require('querystring');

function handle_incoming_request(req, res) {
    var body = '';
    req.on('readable', () => {
        var d = req.read();
        if (d) {
            if (typeof d == 'string') {
                body += d;
            } else if (typeof d == 'object' && d instanceof Buffer) {
                body += d.toString('utf8');
            }
        }
    });

    // 3. when we have all the post data, make sure we have valid
    //    data and then try to do the rename.
    req.on('end', () => {
        if (req.method.toLowerCase() == 'post') {
            var POST_data = qs.parse(body);
            var name = POST_data.desp_for_save
            var age = POST_data.input_pass
            db.insertData(name, age, function(result0){
                res.writeHead(200,{"Content-Type":"text/plain", "Access-Control-Allow-Headers":"x-requested-with","Access-Control-Allow-Origin":"*"});

                if (result0 == 1){
                    res.write("记录成功")
                }
                else {
                    res.write("记录数据库失败")
                }
                
                res.end();
            });
            console.log(name);
            console.log(age);
        }
       
    });
}




db.init( (err, results) => {
    if (err) {
        console.error("** FATAL ERROR ON STARTUP: ");
        console.error(err);
        process.exit(-1);
    }

    var server = http.createServer(handle_incoming_request);
    //server.listen(8080);
    server.listen(8080,"127.0.0.1",function(){
        console.log("开始监听...");
    });
    
});