var mongoose = require('mongoose');
mongoose.connect('mongodb+srv://admin:admin@cinema-9zo1y.mongodb.net/cinema?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useCreateIndex:true,
    useUnifiedTopology: true
})
require('../models/Movie');

const Movie = mongoose.model('Movie');

updateMovieUrl()

async function updateMovieUrl(){
    try {
        let movies = await Movie.find({});
        let i = 0;
        for(let movie of movies){
            //lay movie cap nhat url
            let nameMovie = movie.name.split(" ");
            let head = '';
            for(let i = 0; i < nameMovie.length; i++)
            {
                head += nameMovie[i] + '-';
            }
            //console.log(movie._id)
            let foot = movie._id.toString();
            foot = foot.slice(movie._id.length - 5, 5);
            let url = head + foot;
            movie.url = url;
            await movie.save();
            console.log(movie.url);
            console.log(++i + '/' + movies.length);
        }
        console.log('DONE');
        process.exit();
    } catch (error) {
        console.log(error);
        process.exit();
    }
}