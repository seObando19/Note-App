const userCtrl = {};

const User = require('../models/User');
const passport = require('passport');

//Sign Up
userCtrl.renderSignUpForm = (req,res) =>{
    res.render('users/signup');
};

userCtrl.signUp =async(req,res) =>{
    const {name, email, password, confirm_password} = req.body;
    const errors = [];
    if(name.length <= 0){
        errors.push({text: 'Please insert your name'});
    }
    if(password != confirm_password){
        errors.push({text: 'Password do not match'});
    }
    if(password.length < 4){
        errors.push({text: 'Passwoord must be at least 4 characters'});
    }
    if(errors.length > 0){
        res.render('users/signup', {
            errors,
            name,
            email,
            password,
            confirm_password
        });
    }else{
        const emailUser = await User.findOne({email : email});
        if (emailUser) {
            req.flash('error_msg', 'The email is already in use');
            res.redirect('/users/signup');
        }
        const newUser = new User({name, email, password});
        newUser.password = await newUser.encryptPassword(password);
        await newUser.save();
        req.flash('success_msg', 'You are registered');
        res.redirect('/users/signin');
    }
};

//Sign In
userCtrl.renderSignInForm =(req,res) =>{
    res.render('users/signin');
};

userCtrl.signIn =  passport.authenticate('local', {
    successRedirect: '/notes',
    failureRedirect: '/users/signin',
    failureFlash: true
});

//Logout
userCtrl.logout = (req,res) =>{
    req.logout();
    req.flash('success_msg', 'You are loggedout now');
    res.redirect('/signin');
};


module.exports = userCtrl;