var express = require('express');
var router = express.Router();

var UserModel = require('../database/db').UserModel;


/************************** 获取“驾考宝典”试题 BEGIN ********************************/

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



module.exports = router;
