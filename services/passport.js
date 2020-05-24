const passport = require("passport");

const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const User = require("../models/user");
const { secretOrKey } = require("../config/keys");

/* -------------------------------------------------------------------------- */

const opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = secretOrKey;

passport.use(
  new JwtStrategy(opts, async (payload, done) => {
    const existingUser = await User.findById(payload.id).catch(() => {
      console.log("Something went wrong when find user by id in JWT Strategy");
    });

    if (existingUser) {
      return done(null, existingUser);
    }

    return done(null, false);
  })
);
