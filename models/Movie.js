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
    },
    img:{
        type: String,
        default: 'https://cdnmedia.baotintuc.vn/Upload/DmtgOUlHWBO5POIHzIwr1A/files/2019/11/24/10-Frozen2.jpg'
    }
}, { usePushEach: true });

mongoose.model('Movie', MovieSchema);