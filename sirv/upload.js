var http = require("https");
var fs = require("fs");
var path = require('path')

exports.uploadImage = (token, image, callback) => {
    const baseDir = path.join(__dirname, './../uploads');
    const destDir = `/v2/files/upload?filename=%2Ftempstore%2F${image}`;
    fs.readFile(baseDir+'/'+image, (err, fileData) => {  
    
        if(!err){
            var auth = `Bearer ${token}`;
            var options = {
                "method": "POST",
                "hostname": "api.sirv.com",
                "port": null,
                "path": destDir,
                "headers": {
                "content-type": "application/json",
                "authorization": auth
                }
            };

            var req = http.request(options, function (res) {
                var chunks = [];

            res.on("data", function (chunk) {
                chunks.push(chunk);
                });

            res.on("end", function () {
                var body = Buffer.concat(chunks);
                //console.log(body.toString());
                //console.log(res.statusCode);
                callback(false, res.statusCode);
                });
            });

            req.write(fileData);
            req.end();
        }else{
            callback(true, err)
            console.log('Readfile error ', err)
        }
    });

}