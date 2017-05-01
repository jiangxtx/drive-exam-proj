var express = require('express');
var router = express.Router();

var UserModel = require('../database/db').UserModel;
var TopicModel = require('../database/db').TopicModel;
var ChapterModel = require('../database/db').ChapterModel;

router.post('/saveDriveDatas', function (req, res, next) {


})

const products = [
    { name: 'apple juice', description: 'good', price: 12.12 },
    { name: 'banana juice', description: 'just so sos', price: 4.50 },
    { name: 'orange juice', description: 'very delicious', price: 5.23 },
];

// GET  /products
router.get('/drive-prods', function (req, res, next) {
    res.json(products);
});

// 用户注册
router.post('/drive-regst', function (req, res, next) {
    const data = req.body;
    console.log('user register data: ', data);
    // store into Database;

    const userEntity = new UserModel({
        name: data.userName,
        password: data.password,
        email: data.email
    })

    userEntity.save();


    res.json({
        success: true,
        msg: '注册成功',
        name: data.userName
    });

});

// 把习题写入数据库
router.post('/drive-dataImport', function (req, res, next) {
    const data = req.body;

    const topicEntity = new TopicModel({
        questionId: data.questionId,
        innerId: data.innerId,
        detail: data.topicData
    });

    topicEntity.save();

    res.json({
        success: true,
        msg: '写入数据成功',
        questionId: data.questionId
    });
})

// 把章节信息写入数据库
router.post('/drive-chapterImport', function (req, res, next) {
    const data = req.body;

    const entity = new ChapterModel(data);

    entity.save();

    res.json({
        success: true,
        msg: '写入数据成功',
        questionId: data.questionId
    });
})



module.exports = router;
