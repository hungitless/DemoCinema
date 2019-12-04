const express = require('express');
const userController = require('../controller/userController');

const route = express.Router();

route.post('/', async function(req, res){
    try {
        let response = await userController.singUp(req.body);
        res.send(response);
    } catch (error) {
        console.log(error);
    }
});
module.exports = route;
