const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/user');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const jwt = require('jsonwebtoken');

const config = require('./config.js');

//uses new instance of local strategy to pass it in ie: User.authenticate
exports.local = passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//function that recieves object
exports.getToken = function(user) {
    return jwt.sign(user, config.secretKey, {expiresIn: 3600});
};

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
//allows jwt with key for token
//Key is the same as made in config.js
opts.secretOrKey = config.secretKey;

exports.jwtPassport = passport.use(
new JwtStrategy(
        opts,
        (jwt_payload, done) => {
            console.log('JWT payload', jwt_payload);
            User.findOne({_id: jwt_payload._id}, (err, user) => {
                if (err) {
                    return done(err, false);
                } else if (user) {
                    //done callback is function written in jwt module
                    return done(null, user)
                } else {
                    //shows if no user was found
                    return done(null, false)
                }
            });
        }
    )  
);

exports.verifyAdmin = (req, res,next) => {
    if (!req.user.admin) {
    const err = new Error ('You are not authenticated to perform this operation');
    err.status = 403;
    return next(err);
    } else {
        return next();
    }
};



exports.verifyUser = passport.authenticate('jwt', {session: false});