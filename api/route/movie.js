const express = require('express');
const movieController = require('../controller/movieController');
const fileUpload = require('express-fileupload');
var multipart = require('connect-multiparty');
const route = express.Router();

route.post('/', async function(req, res){
    //console.log("aa" + req.body);
    try {
        let response = await movieController.createMovie(req.body);
        res.send(response);
    } catch (error) {
        console.log(error);
    }
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
route.post('/delete/:id', async function(req, res){
    try {
        // console.log("123");
        let response = await movieController.deleteMovie(req.params.id);
        res.send(response);
    } catch (error) {
        console.log(error);
    }
});
module.exports = route;
