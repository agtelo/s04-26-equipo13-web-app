const express = require('express');
const passport = require('passport');
const router = express.Router();

// Store LinkedIn tokens in memory (in production, use database)
const linkedinTokens = new Map();

// Ruta 1: Iniciar login
router.get('/auth/linkedin', (req, res, next) => {
  console.log('🔵 Starting LinkedIn OAuth flow');
  console.log('📦 Session:', req.sessionID);
  console.log('🍪 Cookies:', req.cookies);

  passport.authenticate('linkedin')(req, res, next);
});

// Ruta 2: Callback (LinkedIn redirige aquí)
router.get('/auth/linkedin/callback', (req, res, next) => {
  console.log('🔵 LinkedIn callback received');
  console.log('📦 Session:', req.sessionID);
  console.log('🔗 Query params:', req.query);

  passport.authenticate('linkedin', {
    failureRedirect: '/login',
    failureMessage: true
  }, (err, user, info) => {
    if (err) {
      console.error('❌ Authentication error:', err);
      return res.status(500).json({ error: 'Authentication error', details: err.message });
    }

    if (!user) {
      console.error('❌ No user returned from LinkedIn');
      console.error('Info:', info);
      return res.status(401).json({ error: 'Authentication failed', info });
    }

    req.logIn(user, (err) => {
      if (err) {
        console.error('❌ Login error:', err);
        return res.status(500).json({ error: 'Login failed', details: err.message });
      }

      try {
        // Guardar el accessToken y linkedinId en memoria
        linkedinTokens.set(user.linkedinId, {
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
          email: user.email,
          name: user.name,
          linkedinId: user.linkedinId,
          authenticatedAt: new Date()
        });

        console.log('✅ LinkedIn tokens stored for user:', user.email);
        console.log('✅ User authenticated:', user.linkedinId);

        // Redirigir al dashboard con parámetros
        res.redirect(`http://localhost:3000/dashboard?linkedin_authenticated=true&linkedin_id=${user.linkedinId}`);
      } catch (error) {
        console.error('❌ Error storing tokens:', error);
        res.status(500).json({ error: 'Failed to store tokens', details: error.message });
      }
    });
  })(req, res, next);
});

// Endpoint para obtener el token del usuario (para el frontend)
router.get('/linkedin/token/:userId', (req, res) => {
  try {
    const { userId } = req.params;
    const tokenData = linkedinTokens.get(userId);

    if (!tokenData) {
      return res.status(404).json({ error: 'LinkedIn credentials not found' });
    }

    res.json({
      accessToken: tokenData.accessToken,
      linkedinId: tokenData.linkedinId,
      email: tokenData.email
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Export tokens store for use in other modules
module.exports = router;
module.exports.getLinkedInToken = (userId) => linkedinTokens.get(userId);