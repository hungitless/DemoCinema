const mongoose = require('mongoose');
 
const Movie = mongoose.model('Movie');

async function createMovie(data) {
    try {
        let movie = new Movie();
        movie.name = data.tenPhim || '';
        movie.kind = data.theLoai || '';
        movie.createdTime = data.ngayChieu || '';
        movie.description = data.moTa || '';
        // movie = await Movie.create(movie)
        movie = await movie.save()
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
module.exports = {
    createMovie,
}
