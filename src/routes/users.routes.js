const {Router}= require('express');
const router = Router();

const {renderSignUpForm, signUp, renderSignInForm, signIn, logout} = require('../controllers/users.controller');

//Routes SignIn
router.get('/users/signin', renderSignInForm);

router.post('/users/signin', signIn);

//Routes SignUp
router.get('/users/signup', renderSignUpForm);

router.post('/users/signup', signUp);

//Routes Logout
router.get('/users/logout', logout);

module.exports = router;