const express = require('express');
const passport = require('passport');
const router = express.Router();

// Store LinkedIn tokens in memory (in production, use database)
const linkedinTokens = new Map();

// Ruta 1: Iniciar login
router.get('/auth/linkedin',
  passport.authenticate('linkedin', {
    scope: ['openid', 'profile', 'email', 'w_member_social']
  })
);

// Ruta 2: Callback (LinkedIn redirige aquí)
router.get('/auth/linkedin/callback',
  passport.authenticate('linkedin', {
    failureRedirect: '/login'
  }),
  (req, res) => {
    try {
      const user = req.user;

      // Guardar el accessToken y linkedinId en memoria
      // En producción, debería guardarse en la base de datos junto al usuario
      linkedinTokens.set(user.linkedinId, {
        accessToken: user.accessToken,
        refreshToken: user.refreshToken,
        email: user.email,
        name: user.name,
        linkedinId: user.linkedinId,
        authenticatedAt: new Date()
      });

      console.log('✅ LinkedIn tokens stored for user:', user.email);

      // Crear token JWT o sesión para el usuario
      // Por ahora, redirigir al dashboard
      // En el frontend, el usuario debería enviar el accessToken y personId al publicar
      res.redirect(`/dashboard?linkedin_authenticated=true&linkedin_id=${user.linkedinId}`);
    } catch (error) {
      console.error('❌ Error in LinkedIn callback:', error);
      res.status(500).json({ error: 'Authentication failed' });
    }
  }
);

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

module.exports = router;