const express = require('express');
const movieController = require('../controller/movieController');

const route = express.Router();

route.post('/', async function(req, res){
    try {
        
        let response = await movieController.createMovie(req.body);
        res.send(response);
        //console.log('ok' + response);
        
    } catch (error) {
        //console.log(error);
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
module.exports = route;
