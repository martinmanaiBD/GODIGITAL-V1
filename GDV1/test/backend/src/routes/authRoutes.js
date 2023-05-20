const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/auth');

router.post('/api/register', authController.register);
router.post('/api/login', authController.login);
router.get('/api/session', authMiddleware, authController.checkSession);
router.get('/api/user', authMiddleware, authController.getUserData);
router.put('/api/user', authMiddleware, authController.updateUserData);
router.post('/api/user/logout', authMiddleware, authController.logout);



module.exports = router;
