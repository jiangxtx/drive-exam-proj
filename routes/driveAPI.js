var express = require('express');
var router = express.Router();

var UserModel = require('../database/db').UserModel;
var ChapterModel = require('../database/db').ChapterModel;
var RecordModel = require('../database/db').RecordModel;
var TopicModel = require('../database/db').TopicModel;


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

// 管理员-更改用户密码
router.post('/drive-updatePwd', function (req, res, next) {
    const { id, newPwd } = req.body;

    UserModel.update({id: ~~id}, {
        password: newPwd
    }, function (error) {
        return res.json({
            success: !error,
            msg: '更改用户密码成功',
        });
    })
})

// 用户删除
router.post(`/drive-deleteUser`, function (req, res, next) {
    const { userId } = req.body;
    UserModel.remove({ id: userId }, function (err, docs) {
        const flag = !err;
        return res.json({
            success: flag,
            msg: flag ? '成功删除用户' : '删除用户失败',
        });
    })
})

// 获取所有用户信息
router.get('/drive-getAllusers', function (req, res, next) {
    UserModel.find({}, function (err, users) {
        if (err) {
            return res.json({
                success: false,
                msg: '获取用户信息失败'
            });
        }

        const userData = [];
        users.length && users.forEach(item => userData.push({
            name: item.name,
            email: item.email,
            id: item.id
        }));

        return res.json({
            success: true,
            msg: '获取用户信息成功',
            data: userData
        });
    })
})

// 获取所有题目信息
router.get('/drive-getAlltopics', function (req, res, next) {
    TopicModel.find({}, function (err, topics) {
        if (err) {
            return res.json({
                success: false,
                msg: '获取题目信息失败'
            });
        }

        const topicsData = [];
        topics.length && topics.forEach(item => {
            const detailObj = JSON.parse(item.detail);

            topicsData.push({
                id: item.questionId,
                question: detailObj.question,
                type: detailObj.optionType,
                difficulty: detailObj.difficulty,
            });
        });

        return res.json({
            success: true,
            msg: '获取题目信息成功',
            data: topicsData
        });
    })
})


// 获取所有题目ID信息
router.get('/drive-getAlltopicIds', function (req, res, next) {
    TopicModel.find({}, function (err, topics) {
        if (err) {
            return res.json({
                success: false,
                msg: '获取题目信息失败'
            });
        }

        const topicsIdsArr = [];
        topics.length && topics.forEach(item => topicsIdsArr.push(item.questionId) );

        return res.json({
            success: true,
            msg: '获取题目ID信息成功',
            data: topicsIdsArr
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
    const { _uid, uid, questionId, errorFlag, ownPanel } = req.body;
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
                const { doneIds='', errorIds='' } = exitInfo;
                const doneIdsArr = doneIds.split(',');
                const errorIdsArr = errorIds.split(',');
                if (doneIdsArr.indexOf(questionId) === -1) {
                    doneIdsArr.push(questionId);
                }
                if ((errorFlag == 0) && (errorIdsArr.indexOf(questionId) === -1)) {
                    errorIdsArr.push(questionId);
                }
                if ((errorFlag == 1) && (ownPanel == 'myerror')) {
                    const index = errorIdsArr.indexOf(questionId);
                    errorIdsArr.splice(index, 1);
                }
// console.log('update : ', (errorFlag == 0) && (errorIdsArr.indexOf(questionId) === -1), errorIdsArr)

                RecordModel.update({userId: ~~uid}, {
                    doneIds: doneIdsArr.join(','),
                    errorIds: errorIdsArr.join(',')
                }, function (error) {
                    if (error) {
                        console.error(error);
                    }
                })
            }

            return res.json({
                success: true,
                msg: '记录用户做题信息成功'
            });
        })
    })
});

// 获取“我的错题”ID array
router.post('/drive-myerror', function (req, res, next) {
    const { uid, _uid } = req.body;
    if (!uid) {
        return res.json({
            success: false,
            msg: '用户信息出错'
        })
    }

    RecordModel.find({userId: uid}, function (err, docs) {
        /*if (!docs.length) {
            return res.json({
                success: false,
                msg: '用户信息出错'
            })
        }*/
        const destData = docs.length && docs[0] || {};
        let errorIds = destData.errorIds || '';
        // 把字符串首尾/与中间超过1个','都去掉
        errorIds = errorIds.replace(/,{1,}/g, ',').replace(/^,/, '').replace(/,$/, '');
        const errorIdsArr = errorIds.split(',');

        return res.json({
            success: true,
            msg: '查询结果成功',
            data: errorIdsArr
        })
    })
})

// 获取“我的收藏”ID array
router.post('/drive-myfavor', function (req, res, next) {
    const { uid, _uid } = req.body;
    if (!uid) {
        return res.json({
            success: false,
            msg: '用户信息出错'
        })
    }

    RecordModel.find({userId: uid}, function (err, docs) {
        const destData = docs.length && docs[0] || {};
        let favorIds = destData.favorIds || '';
        // 把字符串首尾/与中间超过1个','都去掉
        favorIds = favorIds.replace(/,{1,}/g, ',').replace(/^,/, '').replace(/,$/, '');
        const favorIdsArr = favorIds.split(',');

        return res.json({
            success: true,
            msg: '查询结果成功',
            data: favorIdsArr
        })
    })
})

// 获取我的统计信息
router.post('/drive-mystatis', function (req, res, next) {
    const { uid, _uid } = req.body;
    if (!uid) {
        return res.json({
            success: false,
            msg: '用户信息出错'
        })
    }

    RecordModel.find({userId: uid}, function (err, docs) {
        const destData = docs.length && docs[0] || {};
        let { favorIds='', doneIds='', errorIds='' } = destData;

        // 把字符串首尾/与中间超过1个','都去掉
        favorIds = favorIds.replace(/,{1,}/g, ',').replace(/^,/, '').replace(/,$/, '');
        doneIds = doneIds.replace(/,{1,}/g, ',').replace(/^,/, '').replace(/,$/, '');
        errorIds = errorIds.replace(/,{1,}/g, ',').replace(/^,/, '').replace(/,$/, '');

        const favorIdsArr = favorIds.split(',');
        const doneIdsArr = doneIds.split(',');
        const errorIdsArr = errorIds.split(',');

        return res.json({
            success: true,
            msg: '查询统计结果成功',
            data: {
                doneTotal: doneIdsArr.length,
                errorTotal: errorIdsArr.length,
                favorTotal: favorIdsArr.length,
                allTotal: 1492  // TODO, 暂时写死 --2017-5-3；
            }
        })
    })
})

// 获取题目的收藏信息
router.post('/drive-topicFavor', function (req, res, next) {
    const { uid, _uid, questionId } = req.body;
    if (!uid) {
        return res.json({
            success: false,
            msg: '用户信息出错'
        })
    }

    RecordModel.find({userId: uid}, function (err, docs) {
        const destData = docs.length && docs[0] || {};
        let favorIds = destData.favorIds || '';
        // 把字符串首尾/与中间超过1个','都去掉
        favorIds = favorIds.replace(/,{1,}/g, ',').replace(/^,/, '').replace(/,$/, '');
        const favorIdsArr = favorIds.split(',');
        const isfavored = (favorIdsArr.indexOf(questionId) > -1);

        return res.json({
            success: true,
            msg: '查询结果成功',
            data: {
                questionId,
                isfavored
            }
        })
    })
})

// 处理题目的收藏情况
router.post('/drive-toggleFavor', function (req, res, next) {
    const { uid, _uid, questionId, isfavored } = req.body;
    if (!uid) {
        return res.json({
            success: false,
            msg: '用户信息出错'
        })
    }

    RecordModel.find({userId: uid}, function (err, docs) {
        if (!docs.length) { // 插入新数据
            const recordEntity = new RecordModel({
                userId: ~~uid,
                favorIds: questionId,
                doneIds: '',
                errorIds: '',
            });

            recordEntity.save(function (err) {
                console.log('save record 1: ', err)
            });

            return res.json({
                success: true,
                msg: "收藏题目成功",
                data: {
                    questionId,
                    isfavored: true, // 收藏标识
                }
            })
        }

        const destData = docs.length && docs[0] || {};
        let favorIds = destData.favorIds || '';
        // 把字符串首尾/与中间超过1个','都去掉
        favorIds = favorIds.replace(/,{1,}/g, ',').replace(/^,/, '').replace(/,$/, '');
        const favorIdsArr = favorIds.split(',');
        const hasDBContained = (favorIdsArr.indexOf(questionId) > -1);

        if (~~isfavored) {    // 执行“取消收藏”操作
            if (!hasDBContained) {
                return res.json({
                    success: false,
                    msg: '改题目不在“我的收藏”中'
                })
            }

            const exitedIndex = favorIdsArr.indexOf(questionId);
            favorIdsArr.splice(exitedIndex, 1); // delete current topicId, favorIdsArr changs itself;

            RecordModel.update({userId: ~~uid}, {
                favorIds: favorIdsArr.join(',')
            }, function (error) {
                return res.json({
                    success: !error,
                    msg: !error ? "取消收藏成功" : "取消收藏失败",
                    data: {
                        questionId,
                        isfavored: false, // 取消收藏标识
                    }
                })
            })
        } else {    // 执行“收藏”操作
            if (hasDBContained) {
                return res.json({
                    success: false,
                    msg: '改题目已经在“我的收藏”中'
                })
            }

            favorIdsArr.push(questionId);

            RecordModel.update({userId: ~~uid}, {
                favorIds: favorIdsArr.join(',')
            }, function (error) {
                return res.json({
                    success: !error,
                    msg: !error ? "收藏题目成功" : "收藏题目失败",
                    data: {
                        questionId,
                        isfavored: true, // 收藏标识
                    }
                })
            })
        }
    })
})

// 依据题目 IDs 获取对应的试题信息
router.post('/drive-queryTopicsByIds', function (req, res, next) {
    let { uid, _uid, idsStr } = req.body;
    if (!uid) {
        return res.json({
            success: false,
            msg: '用户信息出错'
        })
    }
    const idsArr = JSON.parse(idsStr);

    TopicModel.find({'questionId': {"$in": idsArr }}, function (err, docs) {
        // console.log('queryTopicinfo22: ', docs)

        const destData = [];
        idsArr.forEach(item => {
            for (let i=0; i<docs.length; i++) {
                if (~~item === docs[i].questionId) {
                    const topicInfo = JSON.parse(docs[i].detail || null) || {};
                    destData.push(topicInfo);
                    docs.splice(i, 1);  // delete selected Item, for better performence;
                    break;
                }
            }
        });

        return res.json({
            success: true,
            msg: '查询试题信息成功',
            data: destData
        });
    })
})


module.exports = router;
