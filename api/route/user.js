const express = require('express');
const userController = require('../controller/userController');

const route = express.Router();

route.post('/', async function(req, res){
    try {
        let response = await userController.singUp(req.body);
        console.log(req.body.email);
        res.send(response);
    } catch (error) {
        console.log(error);
    }
});


route.get('/profile', async function(req, res){
    //console.log(req);
    try {
        let response = await userController.getDetailUser(req.cookies.user);
        //console.log(req.body.email);
        res.send(response);
    } catch (error) {
        console.log(error);
    }
});
// oute.get('/detail/:id', async function(req, res){
//     try {
//         let response = await movieController.getDetailMovie(req.params.id);
//         res.send(response);
//     } catch (error) {
//         console.log(error);
//     }
// });
module.exports = route;
