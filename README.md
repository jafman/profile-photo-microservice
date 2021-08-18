# Boardroom One Hackathon
## Microservice for Profile Photos

This microservice creates a uniform profile image from images upload by user. It detects face in an image, crop the image and applies a black background.

To test the microservice, a frontend UI was created which can be found in the frontend folder.

## Testing the App
1. Set your port in the .env file
2. Run  ```npm install``` to install all dependencies
3. Open the ```home.html``` file in the frontend folder and set the appropriate port on line 76.
4. Visit ```localhost:4040/home``` assuming your selected port is ```4040```
5. Upload a user profile picture and see the magic


## API Documentation

### Routes
1. ```/profile```
(Submit your multi-part form data to this route)

### Sample Response
```
{
    "status": "success",
    "message": "success",
    "url": "Url of the processed Image"
}
```

### For further Enquiries
kamsy74@gmail.com


