const express = require('express');
const router = express.Router();


const authController = require('../controllers/authController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.post('/login', authController.loginUser);
router.post('/register', authController.registerUser);
router.post('/admin/create-user', protect, adminOnly, authController.createUserByAdmin);

module.exports = router;
