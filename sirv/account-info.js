var http = require("https");
//``
exports.getInfo = (token, callback) => {

  var auth = `Bearer ${token}`;
  var options = {
    "method": "GET",
    "hostname": "api.sirv.com",
    "port": null,
    "path": "/v2/account",
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
      callback(false, body.toString());
    });
  });

  req.end();

}