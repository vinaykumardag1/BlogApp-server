const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
const User=require("../model/User")


passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            callbackURL: "http://localhost:3000/api/google/callback",
            scope: ["profile", "email"],
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
              let user = await User.findOne({ googleId: profile.id });
      
              if (!user) {
                user = new User({
                  googleId: profile.id,
                  displayName: profile.displayName,
                  email: profile.emails?.[0]?.value || "",
                  photo: profile.photos?.[0]?.value || "",
                });
                await user.save();
              }
      
              done(null, user);
            } catch (error) {
                done(error, null);
            }
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (error) {
        done(error, null);
    }
});