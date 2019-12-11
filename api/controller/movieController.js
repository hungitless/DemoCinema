const mongoose = require('mongoose');
 
const Movie = mongoose.model('Movie');

async function createMovie(data) {
    let movie = new Movie();
    let a = data;
    movie.byUser = data.byUser;
    movie.name = data.tenPhim || '';
    movie.kind = data.theLoai || '';
    movie.date = data.ngayChieu || '';
    movie.description = data.moTa || '';
    movie.img = data.cover;
    console.log(movie.img);
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
        message: "Tạo Phim Thành Công",
        movie: movie
       
    };                                                           
};

async function updateMovie(data) {
    // let movie = new Movie();
    let movie = await Movie.findById(data.id);
    // let a = data;
    movie.byUser = data.byUser;
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
        message: "Tạo Phim Thành Công",
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

async function deleteMovie(data){
    let listMovie = await Movie.findOneAndDelete({"_id" : data})
    return {
           listMovie: listMovie
    };
}

module.exports = {
    createMovie,
    getListMovie,
    getDetailMovie,
    deleteMovie,
    updateMovie
}
