const express = require("express");
const router = express.Router();
<<<<<<< HEAD
const generationController = require('../controllers/generationController');
const { authMiddleware } = require('../middlewares/authMiddlewares');
=======
const generationController = require("../controllers/generationController");
const { authMiddleware } = require("../middlewares/authMiddlewares");
>>>>>>> dev

router.post("/trigger", authMiddleware, generationController.triggerGeneration);
router.get(
  "/history",
  authMiddleware,
  generationController.getGenerationHistory,
);

module.exports = router;

