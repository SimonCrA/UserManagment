const mongoose = require('mongoose');


let Schema = mongoose.Schema;

let clientSchema = new Schema({
    enterprise: {
        type: String,
        required: [true, 'Enterprise is needed']
    },
    business: {
        type: String,
        required: [true, 'Business is needed']
    },
    location: {
        type: String,
        required: [true, 'Location is needed']
    },
    img: {
        type: String,
        required: false
    },
    map: {
        type: String,
        required: false
    },
});

module.exports = mongoose.model('Client', clientSchema);
