var http = require("https");

var clientId = "aKeOFFzEU3a9a0rIxtvUWYQ2nec";
var clientSecret = "sFiiPBNPW7To2ddEYbkigiHZ2a3bgM9JtVe2vI/xfIkzBcBV30IKr/v2LgreNMabpHIsBBBjZl/Pn886qvchzQ=="

var options = {
  "method": "POST",
  "hostname": "api.sirv.com",
  "port": null,
  "path": "/v2/token",
  "headers": {
    "content-type": "application/json"
  }
};

exports.getToken = (callback) => {

    var req = http.request(options, function (res) {
    var chunks = [];

    res.on("data", function (chunk) {
        chunks.push(chunk);
    });

    res.on("end", function () {
        var body = Buffer.concat(chunks);
        //console.log(body.toString());
        callback(false, body.toString())
    });
    });

    req.write("{\"clientId\":\"aKeOFFzEU3a9a0rIxtvUWYQ2nec\",\"clientSecret\":\"sFiiPBNPW7To2ddEYbkigiHZ2a3bgM9JtVe2vI/xfIkzBcBV30IKr/v2LgreNMabpHIsBBBjZl/Pn886qvchzQ==\"}");
    req.end();

}