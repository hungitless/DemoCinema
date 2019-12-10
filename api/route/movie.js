const express = require('express');
const movieController = require('../controller/movieController');
const fileUpload = require('express-fileupload');
var multipart = require('connect-multiparty');
const route = express.Router();

route.post('/', multipart(), async function(req, res){
    // console.log(req.files);
    // console.log("123");
    try {
        //req.files.img.mv('./public/images/aa.png');
        let image = req.files.img;
        let nameImg = Date.now() + image.name;
        let imgUrl = '/images/' + nameImg;
        //image.mv('./public/images/' + nameImg);
        // image.mv('./public/images/' + nameImg)
        let { tenPhim, theLoai, ngayChieu, moTa , byUser} = req.body;
        let data = {
            byUser,
            tenPhim,
            theLoai,
            ngayChieu,
            moTa,
            img: imgUrl
        }
        let response = await movieController.createMovie(data);
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
