const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
const passport = require('passport');

passport.use(new LinkedInStrategy({
    clientID: process.env.LINKEDIN_CLIENT_ID,
    clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
    callbackURL: process.env.LINKEDIN_REDIRECT_URI,
    scope: ['openid', 'profile', 'email', 'w_member_social'],
    state: true, // Explicitly enable state parameter for CSRF protection
}, (accessToken, refreshToken, profile, done) => {
    const user = {
        linkedinId: profile.id,
        email: profile.emails?.[0]?.value,
        name: profile.displayName,
        accessToken,
        refreshToken,
        linkedinProfileUrl: profile._json?.picture || null,
    };

    console.log('✅ LinkedIn user authenticated:', {
        linkedinId: user.linkedinId,
        email: user.email,
        name: user.name,
    });

    return done(null, user);
}));

passport.serializeUser((user, done) => {
    console.log('🔐 Serializing user:', user.email);
    done(null, user);
});

passport.deserializeUser((user, done) => {
    console.log('🔓 Deserializing user:', user.email);
    done(null, user);
});

module.exports = passport;