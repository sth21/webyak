const JWTStrategy = require("passport-jwt").Strategy;
const Extractor = require("passport-jwt").ExtractJwt;
const fs = require("fs");
const User = require("./models/User");

const secret = fs.readFileSync("./cryptography/id_rsa_pub.pem");

const Strategy = new JWTStrategy({
    jwtFromRequest: Extractor.fromAuthHeaderAsBearerToken(),
    secretOrKey: secret,
}, async (jwtPayload, done) => {
    try {
        const user = await User.findById(jwtPayload.sub);
        
        if (user !== null) {
            return done(null, user);
        }
        
        return done(null, false);

    } catch (err) {
        return done(err, false);
    }
});

module.exports = Strategy;
