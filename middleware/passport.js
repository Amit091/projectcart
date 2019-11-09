const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const userDAO = require('./../DAO/user_dao');
const udao = new userDAO();


module.exports = (passport) => {
    let user = '';
    passport.use(
        new LocalStrategy({ usernameField: 'email' },
            async(email, password, done) => {
                try {
                    let user = await udao.getAllUserByEmail(email);
                    if (user == '') {
                        return done(null, false, { message: 'That email is not registered' });
                    }
                    // console.log(user);
                    let tempuser = JSON.parse(JSON.stringify(user));
                    //console.log(tempuser);
                    // Match password
                    let isMatch = await bcrypt.compare(password, tempuser.password);
                    //bcrypt.compare(password, user.password);
                    //console.log(isMatch);
                    if (isMatch) {
                        return done(null, user);
                    } else {
                        return done(null, false, { message: 'Password incorrect' });
                    }
                } catch (err) {
                    console.log(err);
                }
            }
        )
    );

    passport.serializeUser((user, done) => {
        console.log(`New User Session: ${user.username} `);
        //console.log(user);
        done(null, user.id);
    });

    passport.deserializeUser(async(id, done) => {
        try {
            let user = await udao.getAllUserById(id);
            await done(null, user);
        } catch (error) {
            throw err;
        }
    });
};