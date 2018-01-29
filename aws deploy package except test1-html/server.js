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
            var request_type = POST_data.request_type;
            var name;
            var age;
            var result0;

            if (request_type == "save") {
                 name = POST_data.desp_for_save;
                 age = POST_data.input_pass;
                 db.insertData(name, age, function(result0){
                    res.writeHead(200,{"Content-Type":"text/plain", "Access-Control-Allow-Headers":"x-requested-with","Access-Control-Allow-Origin":"*"});

                    if (result0 == 1){
                        res.write("save succeeded-FZ")
                    }
                    else {
                        res.write("save in database failed-FZ")
                    }
                    
                    res.end();
                });
            };

            if (request_type == "find") {
                name = POST_data.desp_for_find;
                var returned_pass;
                db.findData(name, function(result0,returned_pass){
                   res.writeHead(200,{"Content-Type":"text/plain", "Access-Control-Allow-Headers":"x-requested-with","Access-Control-Allow-Origin":"*"});
                   res.write(returned_pass);
                   res.end();
                });
            };
        


            if (request_type == "update") {
                name = POST_data.desp_for_update;
                age = POST_data.new_pass;
                db.updateData(name, age, function(result0){
                    res.writeHead(200,{"Content-Type":"text/plain", "Access-Control-Allow-Headers":"x-requested-with","Access-Control-Allow-Origin":"*"});

                    if (result0 == 1){
                        res.write("更新成功！")
                    }
                    else {
                        res.write("记录数据库失败")
                    }
                    
                    res.end();
                });
            };
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
    server.listen(process.env.PORT || 8080,"0.0.0.0",function(){
        console.log("Feiqi server starts to listen...");
    });
    
});