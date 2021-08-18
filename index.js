const express = require('express')
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
const sirvtoken = require('./sirv/token');
const sirvinfo = require('./sirv/account-info');
const sirvUpload = require('./sirv/upload');
const sirvCrop = require('./sirv/crop-image');
const bgRemover = require('./remove-bg/removebg');

const app = express()

app.post('/profile', upload.single('avatar'), function (req, res, next) {
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
  console.dir(req.file);
})

app.use('/processed', express.static('processed'));

app.listen(4000, ()=>{
    console.log('Server listening on 4000!');
    sirvtoken.getToken((err, data)=>{
        data = JSON.parse(data); 
        sirvUpload.uploadImage(data.token, 'friend.jpg', (err, statusCode)=>{
            if(err){
                console.log('Error uploading Image!', err);
            }else{
                let url = `https://ackeyogr.sirv.com/tempstore/friend.jpg?crop.type=face&cw=400&ch=450`;
                bgRemover.removeBG(url,'friend.jpg', (err, msg)=>{
                    console.log(msg)
                });
            }
        });

    });
})

