const fetch = require('node-fetch');

exports.detect = (img, callback) => {

    const url = `https://ackeyogr.sirv.com/tempstore/${img}?info&crop.type=face`;

    fetch(url)
        .then(res => res.json())
        .then((data) => {
            //console.log(data)
            callback(false, data);
        })
        .catch((err)=>{
            //file not found
            callback(true, err)
        });

}
