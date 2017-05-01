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


const topicSchema = new Schema({
    questionId: Number,
    innerId: Number,
    detail: String
});

// 各个部分所拥有的的习题ID数组表
const ownidSchema = new Schema({
    key: String,
    value: String,
    ids: String
})

const chapterSchema = new Schema({
    id: Number,
    key: String,
    name: String,
    count: Number,
    ids: String
})

exports.UserModel = db.model('users', userSchema); // relate to 'users'
exports.TopicModel = db.model('topics', topicSchema); // relate to 'topics'
exports.ChapterModel = db.model('chapters', chapterSchema); // relate to 'topics'