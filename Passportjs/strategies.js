// import { Strategy as JwtStrategy } from 'passport-jwt';
// import { ExtractJwt } from 'passport-jwt';
// import 'dotenv/config';
// import passport from 'passport';
// import User from '../DataBase/models/users.js';
// const opts = {};
// opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken(); // passing function into opts object
// opts.secretOrKey = process.env.PrivateKey; //normally store this in process.env.secret

// const strategy = new JwtStrategy(opts, async (jwt_payload, done) => {
//   console.log(jwt_payload);

//   const user = await User.findById(jwt_payload.user._id);

//   if (user) {
//     return done(null, user);
//   } else {
//     return done(null, false);
//     // or you could create a new account
//   }
// });
// passport.use(strategy);
