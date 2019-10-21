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
                    console.log(user);
                    let tempuser = JSON.parse(JSON.stringify(user));
                    console.log(tempuser);
                    // Match password
                    let isMatch = await bcrypt.compare(password, tempuser[0].password);
                    //bcrypt.compare(password, user.password);
                    console.log('from herre' + isMatch);
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
        console.log(`Added to session: ${user[0].name} `);
        done(null, user[0].id);
    });

    passport.deserializeUser(async(id, done) => {
        try {
            let user = await udao.getAllUserById(id);
            if (user != '') {
                done(null, user[0]);
            }
        } catch (error) {
            throw err;
        }
    });
};