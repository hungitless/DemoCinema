var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    name: {
        type: String,
        default: ''
    },
    email: {
        type: String,
        default: ''
    },
    createdTime: {
        type: Number,
        default: Date.now
    },
    password: {
        type: String,
        default: ''
    }
}, { usePushEach: true });

mongoose.model('User', UserSchema);