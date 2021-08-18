const fs = require('fs');
const fetch = require('node-fetch');
var path = require('path');

const baseDir = path.join(__dirname, './../cropped');

exports.cropImage = async (image, callback) =>{
    const apiUrl = `https://ackeyogr.sirv.com/tempstore/${image}?crop.type=face&cw=380&ch=380`;
    const imageURI = baseDir + '/' + image
    const response = await fetch(apiUrl);
    const buffer = await response.buffer();
    fs.writeFile(imageURI, buffer, (err) => { 
        console.log('finished downloading!', err)
        callback(false)
    });
}