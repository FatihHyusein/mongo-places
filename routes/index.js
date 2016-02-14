var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Mongo Places'});
});

router.use('/logins', require('./logins'));
router.use('/users', require('./users'));
router.use('/pois', require('./pois'));

module.exports = router;
