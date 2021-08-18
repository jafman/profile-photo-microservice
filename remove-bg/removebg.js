const { RemoveBgResult, RemoveBgError, removeBackgroundFromImageUrl } = require('remove.bg');


exports.removeBG = (url, image, callback) => {

    var path = require('path')
    var outputUri = path.join(__dirname, './../processed');
    outputUri += '/'+image;
    
    removeBackgroundFromImageUrl({
    url,
    apiKey: "S37d9ERM3dHLdqdV9w7nptdq",
    size: "regular",
    type: "person",
    bg_color: "000000",
    outputFile: outputUri
    }).then((result) => {
    //console.log(`File saved to ${outputUri}`);
    //const base64img = result.base64img;
    callback(false, `File saved to ${outputUri}`)
    }).catch((errors) => {
        callback(true, JSON.stringify(errors))
        //console.log(JSON.stringify(errors));
    });

}