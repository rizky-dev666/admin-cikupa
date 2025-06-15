const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/auth/login', authController.login);
router.post("/auth/logout", authController.logout);
router.get('/auth/user',authController.getUser);
router.get('/auth/check', authController.checkAuth, (req, res) => {
  res.json({ message: 'Authenticated', user: req.user });
});

module.exports = router;
