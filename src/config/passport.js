const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('../models/User');

//estrategia de autenticacion del user y password
passport.use(new LocalStrategy({
    usernameField: 'email'
},async(email, password, done) =>{
    const user = await User.findOne({email: email});
    if(!user){
        return done(null,false, {message : 'Not User Found.'});
    }else{
        const match = await user.matchPassword(password);
        if(match){
            return done(null, user);
        }else{
            return done(null,false,{message: 'Incorrect Password.'})
        }
    }
}));

//manera de almacenar dentro de una sesion usuario se loguea almacenamos su id
passport.serializeUser((user,done) => {
    done(null, user.id);
});

//Toma un id y genera un usuario proceso inverso
passport.deserializeUser((id,done) =>{
    User.findById(id, (err, user) =>{
        done(err, user);
    });
});