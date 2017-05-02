var express = require('express');
var router = express.Router();

var UserModel = require('../database/db').UserModel;

// var { custom_fetch } = require('../src/Tool/wrap.fetch');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'express-mongoDB Guide' });
});

/* login */
router.get('/login', function (req, res) {
    console.log('router login entering...')
    res.render('login', { title: 'Login' });
});

/* ucenter */
router.post('/ucenter', function(req, res) {
    var query_doc = {name: req.body.name, password: req.body.password};
    (function(){
        UserModel.count(query_doc, function(err, doc){
            if(doc == 1){
                console.log(query_doc.name + ": login success in " + new Date());
                res.render('ucenter', { user:doc });
            }else{
                console.log(query_doc.name + ": login failed in " + new Date());
                res.redirect('/');
            }
        });
    })(query_doc);
});


/****************** RESTful API ***********************/

/* query Users */
router.get('/queryUsers', function (req, res, next) {
    console.log('queryUsers entering...');
    res.contentType('json');
    res.send(JSON.stringify({ status:'success', data: { name:'jiangxtx', age: 36}}));
    res.end();
})

const products = [
    { name: 'apple juice', description: 'good', price: 12.12 },
    { name: 'banana juice', description: 'just so sos', price: 4.50 },
    { name: 'orange juice', description: 'very delicious', price: 5.23 },
];

// GET  /products
router.get('/products', function (req, res, next) {
    res.json(products);
});

// GET /products/:id
router.get('/products/:id', function (req, res, next) {
    const id = req.params.id || 0;
    console.log('---> id: ' + id, typeof id) // Note that id type is 'string';

    if (products.length < (~~id + 1) || id < 0) {
        res.statusCode = 404;
        return res.send('Error 404: No products found')

      /*
       // or code as below;
       res.statusCode = 404;
       const errorInfo = {
       statusCode: 404,
       msg: 'Error 404: No products found!'
       };
       res.json(errorInfo);
       */
    } else {
        res.json(products[id]);
    }
});


module.exports = router;
