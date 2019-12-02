const express = require('express');
const movieController = require('../controller/movieController');

const route = express.Router();

route.post('/', async function(req, res){
    try {
        let response = await movieController.createMovie(req.body);
        res.send(response);
    } catch (error) {
        Console.log(error);
    }
});
module.exports = route;
