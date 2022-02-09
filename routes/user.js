const express = require('express');
const router = express.Router();
const userCTRl = require('../controllers/user');

router.post('/signup', userCTRl.signUp);
router.post('/login', userCTRl.login);

module.exports = router;