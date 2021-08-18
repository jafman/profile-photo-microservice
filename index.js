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
    const allowedFiles = ['.jpg', '.jpeg', '.png'];
    const uploadedFile = req.file;
    const extension = uploadedFile.originalname.substring(uploadedFile.originalname.lastIndexOf('.'));
    const newFileName = uploadedFile.filename+extension;

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
                                    'url': `http://localhost:4000/processed/${newFileName}`
                                });
                            }
                        }); 
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

app.listen(4000, ()=>{
    console.log('Server listening on 4000!');
})

