/**
 * Created by 仲夏 on 2017/4/25.
 */

const mongoose = require('mongoose');
const db = mongoose.connect('mongodb://localhost/expressMongo');  // connect MongoDB
const Schema = mongoose.Schema; // create Modal;

// check if connect successfully;
const dbconnect = mongoose.connection;
dbconnect.on('error', console.error.bind(console, '>>>connect MongoDB Error!'));
dbconnect.on('open', function (callback) {
    console.log('>>>Connect MongoDB Success!');
});

// define a new model, but not related to 'users';
const userSchema = new Schema({
    name: String,
    password: String,
    email: String
});

exports.UserModel = db.model('users', userSchema); // relate to 'users'