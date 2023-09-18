const JWTStrategy = require("passport-jwt").Strategy;
const Extractor = require("passport-jwt").ExtractJwt;
const fs = require("fs");
const User = require("./models/User");

const secret = fs.readFileSync("./cryptography/id_rsa_pub.pem");

const Strategy = new JWTStrategy({
    jwtFromRequest: Extractor.fromAuthHeaderAsBearerToken(),
    secretOrKey: secret,
}, (jwtPayload, done) => {

    User.findById(jwtPayload.sub, (err, user) => {
        // Error
        if (err) {
            return done(err, false);
        }

        // User found
        if (user) {
            return done(null, user);
        }
        
        // No user found
        return done(null, false);
    });
});

module.exports = Strategy;
