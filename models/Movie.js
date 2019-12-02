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
    createdTime: {
        type: Number,
        default: Date.now
    },
    description: {
        type: String,
        default: ''
    }
}, { usePushEach: true });
var SomeModel = mongoose.model('Movie',MovieSchema);