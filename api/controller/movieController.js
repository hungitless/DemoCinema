const mongoose = require('mongoose');
 
const Movie = mongoose.model('Movie');

async function createMovie(data) {
    let movie = new Movie();
    let a = data;
    movie.name = data.tenPhim || '';
    movie.kind = data.theLoai || '';
    movie.date = data.ngayChieu || '';
    movie.description = data.moTa || '';
    movie.img = data.img;
    movie = await movie.save();
    if (!movie) {
        console.log('fail')
        throw {
            status: 400,
            errorMessage: ''
        }
    }
    return {
        status: 200,
        message: "Tao Phim Thanh Cong",
        movie: movie
       
    };                                                           
};
async function getListMovie() {
    let listMovie = await Movie.find({}).sort({createdTime: -1});
    return {
        listMovie: listMovie
    };
};

async function getDetailMovie(data){
     let listMovie = await Movie.findOne({"_id" : data})
        return {
            listMovie: listMovie
        };
}
module.exports = {
    createMovie,
    getListMovie,
    getDetailMovie
}
