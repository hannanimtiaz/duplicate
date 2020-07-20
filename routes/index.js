var express = require('express');
var router = express.Router();

var auth = require('../middlewares/auth')

var admin = require('../controllers/admin')

var adminValidator = require('../validators/admin')


router.get('/', auth.isNotAdmin, (req, res) => {
    res.render('index');
});

router.post('/login', auth.login)

router.get('/logout', auth.isAdmin, auth.logout);

router.get('/home', auth.isAdmin, admin.index);

router.get('/profile', auth.isAdmin, admin.profileGet);

router.post('/profile', auth.isAdmin, adminValidator.adminUpdate, admin.profilePost);


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

router.post('/updateBook', auth.isAdmin, admin.updateBook);



/*=====  End of UPDATE BOOKS ROUTES  ======*/


/*=============================================
=            ISSUE BOOKS ROUTES            =
=============================================*/


router.post('/issueBook', auth.isAdmin, admin.issueBook)

router.get('/returnBook', auth.isAdmin, admin.returnBook)

router.post('/returnBook', auth.isAdmin, admin.returnBookPost)

/*=====  End of ISSUE BOOKS ROUTES  ======*/


/*=============================================
=            REMOVE BOOKS ROUTES            =
=============================================*/

router.get('/removeBooks', auth.isAdmin, admin.removeBookGet)

router.post('/removeBooks', auth.isAdmin, admin.removeBookPost)


/*=====  End of REMOVE BOOKS ROUTES  ======*/

/*=============================================
=            DEPARTMENT ROUTES            =
=============================================*/

router.get('/addDepartment', auth.isAdmin, admin.addDepartmentGet)
router.post('/addDepartment', auth.isAdmin, admin.addDepartmentPost)


/*=====  End of REMOVE BOOKS ROUTES  ======*/


/*=============================================
=            EDIT DEPARTMENT ROUTES            =
=============================================*/

router.get('/editDepartmentList', auth.isAdmin, admin.editDepartmentListGet)

router.get('/editDepartment/:departmentID', auth.isAdmin, admin.editDepartmentGet)
router.post('/editDepartment', auth.isAdmin, admin.editDepartmentPost)


/*=====  End of REMOVE BOOKS ROUTES  ======*/


module.exports = router;
