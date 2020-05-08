const LocalStrategy = require('passport-local').Strategy;

const User = require('../db/models/user');

module.exports = function (passport) {

    // used to serialize the user for the session
    passport.serializeUser((user, done) => done(null, user.id));

    // used to deserialize the user
    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => done(err, user));
    });

    passport.use('local-signup', new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        },
        (req, email, password, done) => {
            process.nextTick(async () => {
                try {
                    const user = await User.findOne({email});
                    if (user) {
                        return done(null, false, req.flash('signupMessage', `${email} is already taken.`));
                    } else {
                        req.body.password = User.generateHash(password);
                        const newUser = await User.create(req.body);
                        return done(null, newUser);
                    }
                } catch (e) {
                    return done(e);
                }
            });
        })
    );

    passport.use('local-login', new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass back the entire request to the callback
        },
        async (req, email, password, done) => {
            try {
                const user = await User.findOne({email});
                if (!user)
                    return done(null, false, req.flash('loginMessage', 'No user found.'));

                if (!user.validPassword(password))
                    return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));

                return done(null, user);
            } catch (e) {
                return done(e);
            }
        }));
};