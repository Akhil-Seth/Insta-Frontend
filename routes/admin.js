const express = require('express');
const isAuth = require('../MiddleWare/is-auth');
const path = require('path');
const proController = require('../controllers/profile');

const User = require('../models/user');





const router = express.Router();

router.get('/profile',isAuth ,  proController.getProfile);
router.get('/search',isAuth ,  proController.getSearch);
router.get('/addPost',isAuth ,  proController.getAddPost);
router.post('/addPost',isAuth ,  proController.postAddPost);
router.post('/search',isAuth ,  proController.postSearch);
router.post('/follow',isAuth ,  proController.postFollow);


module.exports = router;
