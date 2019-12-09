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
    try {
        let response = await userController.getProfileUser(req.cookies.user);
        res.send(response);
    } catch (error) {
        console.log(error);
    }
});
route.post('/changePass', async function(req, res){
    try {
        let response = await userController.changePass(req.body);
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
