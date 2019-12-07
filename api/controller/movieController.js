const mongoose = require('mongoose');
 
const Movie = mongoose.model('Movie');

async function createMovie(data) {
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
