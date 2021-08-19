const express = require('express')
const multer  = require('multer')
const path = require('path');
//const upload = multer({ dest: 'uploads/' })
const sirvtoken = require('./sirv/token');
const sirvinfo = require('./sirv/account-info');
const sirvUpload = require('./sirv/upload');
const sirvCrop = require('./sirv/crop-image');
const bgRemover = require('./remove-bg/removebg');
const faces = require('./sirv/detect-face');
const cors = require('cors');
const app = express();
require('dotenv').config();
const port = process.env.PORT

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname).toLowerCase()) //Appending extension
    }
})
  
var upload = multer({ storage: storage }); 

app.use(cors());

app.post('/profile', upload.single('avatar'), function (req, res, next) {
    const allowedFiles = ['.jpg', '.jpeg', '.png'];
    const uploadedFile = req.file; 
    const newFileName = uploadedFile.filename;
    const extension = path.extname(newFileName).toLowerCase();


    if(allowedFiles.includes(extension)){
        sirvtoken.getToken((err, data)=>{
            if(err){
                res.status(500).json({
                    'status': 'error',
                    'message': 'We messed up, 😭 we could not upload your image, please try again.'
                });
            }else{
                data = JSON.parse(data); 
                sirvUpload.uploadImage(data.token, newFileName, (err, statusCode)=>{
                    if(err || statusCode != 200){
                        console.log('Error uploading Image!', err);
                        res.status(500).json({
                            'status': 'error',
                            'message': 'We messed up, 😭 we could not upload your image, please try again.'
                        });
                    }else{
                        // check if image has a face
                        faces.detect(  newFileName, (err, faceData)=>{
        
                            if(err){
                                console.log(faceData);
                                res.status(500).json({
                                    'status': 'error',
                                    'message': 'Sorry, 😭 we could not detect a face, please upload another picture.'
                                });
                            }else{
                                //console.log(faceData.original.smartcrop.faces);
                                var faceCount = 0;
                                try{
                                    faceCount = faceData.processingSettings.crop.faces.faces.length
                                }catch(errmsg){
                                    console.log('face count: ',errmsg)
                                }
                                if(faceCount > 0){
                                    //console.log('Face Detected!')
                                    let url = `https://ackeyogr.sirv.com/tempstore/${newFileName}?crop.type=face&cw=400&ch=450`;
                                    bgRemover.removeBG(url, newFileName, (err, msg)=>{
                                        console.log(msg)
                                        if(err){
                                            res.status(500).json({
                                                'status': 'error',
                                                'message': 'We messed up, 😭 we could not process your image, please try again.'
                                            });
                                        }else{
                                            res.status(200).json({
                                                'status': 'success',
                                                'message': 'success',
                                                'url': `http://localhost:${port}/processed/${newFileName}`
                                            });
                                        }
                                    }); 

                                }else{
                                    res.status(400).json({
                                        'status': 'error',
                                        'message': 'Sorry, 😭 no human face detected, please upload another picture.'
                                    });
                                }
                            }
                        });
                        //                     
                    }
                });
            }
    
        });
    }else{
        res.status(400).json({
            'status': 'error',
            'message': 'File type not supported! 😭. Upload JPEG or PNG file'
        });
    }
    
})

app.use('/processed', express.static('processed'));
app.use('/', express.static('frontend'))

app.listen(port, ()=>{
    console.log('Server listening on port '+port);
})

