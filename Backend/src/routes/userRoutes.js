const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authMiddleware } = require('../middlewares/authMiddlewares');

router.get("/profile", authMiddleware, userController.profile); //Ruta de prueba
router.post("/register", userController.register);
router.post("/login", userController.login);

module.exports = router;