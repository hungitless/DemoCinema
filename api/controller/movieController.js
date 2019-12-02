const mongoose = require('mongoose');

const Movie = mongoose.model('Movie');

async function createMovie(data) {
    await Movie.create(data);
    //console.log(123);
    return {
        status: 200,
        message: "Tao Phim Thanh Cong"
    };
};

module.exports = { 
    createMovie 
}
