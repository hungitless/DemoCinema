const express = require('express');
const movieController = require('../controller/movieController');
const fileUpload = require('express-fileupload');

const route = express.Router();

route.post('/', async function(req, res){
    try {
        let response = await movieController.createMovie(req.body);
        res.send(response);
    } catch (error) {
        console.log(error);
    }
    // try {
    //     if(!req.files) {
    //         res.send({
    //             status: false,
    //             message: 'No file uploaded'
    //         });
    //     } else {
    //         let data = []; 
    
    //         //loop all files
    //         _.forEach(_.keysIn(req.files.photos), (key) => {
    //             let photo = req.files.photos[key];
                
    //             //move photo to uploads directory
    //             photo.mv('./uploads/' + photo.name);

    //             //push file details
    //             data.push({
    //                 name: photo.name,
    //                 mimetype: photo.mimetype,
    //                 size: photo.size
    //             });
    //         });
    
    //         //return response
    //         res.send({
    //             status: true,
    //             message: 'Files are uploaded',
    //             data: data
    //         });
    //     }
    // } catch (err) {
    //     res.status(500).send(err);
    // }
});
route.get('/', async function(req, res){
    try {
        let response = await movieController.getListMovie();
        res.send(response);
    } catch (error) {
        console.log(error);
    }
});
route.get('/detail/:id', async function(req, res){
    try {
        let response = await movieController.getDetailMovie(req.params.id);
        res.send(response);
    } catch (error) {
        console.log(error);
    }
});
module.exports = route;
