const mongoose = require('mongoose');
const {Schema} = mongoose;

const objectSchema = new Schema({
    title: String,
    subscription: String,
    imageUrl: String,
    location: {
        lat: Number,
        lng: Number
    },
    _user: {type: Schema.Types.ObjectId, ref: 'User'},
    findLostDate: Date,
    registeredDate: Date,
});

mongoose.model('objects', objectSchema);