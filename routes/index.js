var express = require('express');
var router = express.Router();

var auth = require('../middlewares/auth')

var admin = require('../controllers/admin')


router.get('/', auth.isNotAdmin, (req, res) => {
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



/*=============================================
=            UPDATE BOOKS ROUTES            =
=============================================*/

router.get('/updateBooks', auth.isAdmin, admin.getUpdateBooks)


router.get('/update/:bookID', auth.isAdmin, admin.getUpdatePage)

router.post('/issueBook', admin.issueBook)

router.get('/returnBook', auth.isAdmin, admin.returnBook)

router.post('/returnBook', admin.returnBookPost)
/*=====  End of UPDATE BOOKS ROUTES  ======*/


module.exports = router;
