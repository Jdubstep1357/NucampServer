const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    }
});

//hashing
userSchema.plugin(passportLocalMongoose);

//User as first argument. Collection named users, then give it to userSchema
module.exports = mongoose.model('User', userSchema);