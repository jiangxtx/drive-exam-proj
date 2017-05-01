var express = require('express');
var router = express.Router();

var UserModel = require('../database/db').UserModel;
var ChapterModel = require('../database/db').ChapterModel;
var RecordModel = require('../database/db').RecordModel;


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

    const { userName, password, email } = data;
    // store into Database;

    UserModel.count({name: userName}, function (err, doc) {
        console.log('register data: ', doc)
        if (doc > 0) {
            return res.json({
                success: false,
                msg: '用户名已被使用'
            })
        } else {
            UserModel.count({email: email}, function (err, doc1) {
                if (doc1 > 0) {
                    return res.json({
                        success: false,
                        msg: '邮箱已被使用'
                    })
                } else {
                    let count = 0;
                    UserModel.count(function (err, doc) {
                        console.log('count doc: ', doc)
                        count = doc + 1;

                        const userEntity = new UserModel({
                            id: count,
                            name: userName,
                            password,
                            email,
                        })

                        userEntity.save();

                        return res.json({
                            success: true,
                            msg: '恭喜您，注册成功',
                            name: userName
                        });
                    })
                }
            })
        }
    })




});

// 用户登录
router.post('/drive-login', function (req, res, next) {
    const { username, password } = req.body;
    UserModel.find({name: username, password}, function (err, docs) {
        console.log('>>login info: ', docs)
        const flag = !!(docs.length > 0);
        return res.json({
            success: flag,
            msg: flag ? '登录成功' : '您的用户名或密码错误',
            name: username,
            _id: flag ? docs[0]._id.toString() : '',
            id: flag ? docs[0].id : ''
        });
    })

})

// 获取章节信息
router.get('/drive-chapters', function (req, res, next) {
    ChapterModel.find({}, function (err, docs) {
        console.log('/drive-chapters data: ', err)

        if (err) {
            return res.json({
                success: false,
                msg: '查询章节信息失败',
            });
        }


        const data = [];
        docs && docs.map(item => {
            data.push({
                id: item.id,
                name: item.name,
                count: item.count,
                ids: item.ids.split(',')
            })
        })
       return res.json({
            success: true,
            msg: '查询章节信息成功',
            data: data
        })
    })
})

// 记录用户做题信息
router.post('/drive-record', function (req, res, next) {
    const { _uid, uid, questionId, errorFlag } = req.body;
    UserModel.find({id: uid}, function (err, docs) {
        if (!docs.length) {
            return res.json({
                success: false,
                msg: '用户信息出错'
            })
        }

        RecordModel.find({userId: uid}, function (err, docs1) {
            if (!docs1.length) { // 插入新数据
                const recordEntity = new RecordModel({
                    userId: ~~uid,
                    doneIds: questionId,
                    errorIds: (errorFlag == 1) ? '' : questionId,
                    favorIds: ''
                })

                recordEntity.save();
            } else { // 更新已有数据
                const exitInfo = docs1[0];
                const { doneIds, errorIds } = exitInfo;
                const doneIdsArr = doneIds.split(',');
                const errorIdsArr = errorIds.split(',');
                if (doneIdsArr.indexOf(questionId) === -1) {
                    doneIdsArr.push(questionId);
                }
                if ((errorFlag == 0) && (errorIdsArr.indexOf(questionId) === -1)) {
                    errorIdsArr.push(questionId);
                }
console.log('update : ', (errorFlag == 0) && (errorIdsArr.indexOf(questionId) === -1), errorIdsArr)
                RecordModel.update({userId: ~~uid}, {
                    doneIds: doneIdsArr.join(','),
                    errorIds: errorIdsArr.join(',')
                }, function (error) {
                    if (error) {
                        console.error(error);
                    } else {
                        console.error("更新用户名成功")
                    }
                })
            }

            return res.json({
                success: true,
                msg: '记录用户做题信息成功'
            });
        })
    })


})



module.exports = router;
