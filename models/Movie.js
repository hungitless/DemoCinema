var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MovieSchema = new Schema({
    name: {
        type: String,
        default: ''
    },
    kind: {
        type: String,
        default: ''
    },
    date: {
        type: Number,
        default: Date.now
    },
    createdTime: {
        type: Number,
        default: Date.now
    },
    description: {
        type: String,
        default: ''
    }
}, { usePushEach: true });

mongoose.model('Movie', MovieSchema);