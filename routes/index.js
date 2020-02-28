var express = require('express');
var router = express.Router();

var auth = require('../middlewares/auth')

var admin = require('../controllers/admin')


router.get('/', (req, res) => {
    res.render('index');
});

router.post('/login', auth.login)

router.get('/home', auth.isAdmin, admin.index);


/*=============================================
=            ADD BOOKS ROUTES                =
=============================================*/

router.get('/addBooks', auth.isAdmin, admin.getAddBooks)

router.post('/addBooks', auth.isAdmin, admin.postAddBooks);


/*=====  End of Section comment block  ======*/


/*=============================================
=            VIEW BOOKS ROUTES                =
=============================================*/

router.get('/viewBooks', auth.isAdmin, admin.getViewBooks)


/*=====  End of Section comment block  ======*/



module.exports = router;
