const mongoose = require('mongoose');
 
const Movie = mongoose.model('Movie');

async function createMovie(data) {
    try {
        let movie = new Movie();
        movie.name = data.tenPhim || '';
        movie.kind = data.theLoai || '';
        movie.date = data.ngayChieu || '';
        movie.description = data.moTa || '';
        movie = await movie.save()
        if (!movie) {
            console.log('fail')
            throw {
                status: 400,
                errorMessage: ''
            }
        }
        console.log('success')
        return {
            movie: movie
            // status: 200,
            // message: "Tao Phim Thanh Cong"
        };
    }
    catch (error) {
        console.log(error)
    }
};
async function getListMovie() {
    try {
        let listMovie = await Movie.find({})
        return {
            listMovie: listMovie
        };
    }
    catch (error) {
        console.log(error)
    }
};

async function getDetailMovie(data){
    try {
        let listMovie = await Movie.findOne({"_id" : data})
        return {
            listMovie: listMovie
        };
    }
    catch (error) {
        console.log(error)
    }
}
module.exports = {
    createMovie,
    getListMovie,
    getDetailMovie
}
