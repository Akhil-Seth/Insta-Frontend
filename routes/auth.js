const authController = require('../controllers/auth');
const express = require('express');
const isAuth = require('../MiddleWare/is-auth');
const path = require('path');

const User = require('../models/user');





const { check, body } = require('express-validator');

const router = express.Router();

router.get('/login', authController.getLogin);

router.get('/register', authController.getRegister);

router.post('/login', authController.postLogin);

router.post('/register', authController.postRegister);

router.post('/LogOUT', authController.postLogout);

module.exports = router;
