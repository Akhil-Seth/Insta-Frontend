const authController = require('../controllers/auth');
const express = require('express');
const fs = require('fs');
const isAuth = require('../MiddleWare/is-auth');
const openSocket = require('socket.io-client');
const path = require('path');

const User = require('../models/user');































































const socket = openSocket('http://localhost:8080');



















// exports.getProfile = (req, res, next) => {
//     console.log(req.session.user);
//     fetch('http://localhost:8080/myProfile' , {
//         headers : {
//           Authorization : 'Bearer ' + req.userToken 
//         } ,method : 'Post' ,
//          body : JSON.stringify({
//             id: req.session.user,
//             token: req.session.userToken 
//         })
//       })
//         .then(result => {
//           if (result.status !== 200) {
//             console.log('Failed to fetch user status.');
//             return res.redirect('/');
//           }
//           return result.json();
//         })
//         .then(resData => {
//           res.render('pages/profile', {
//             path: '/profile',  
//             pageTitle: 'My Profile',
//             name: resData.name ,
//             image: resData.image ,
//             bio: resData.bio ,
//             postNo: '1' ,
//             following: '100' ,
//             follow: '100' ,
//             same: true ,
//             posts : []
//           });
//         })
//         .catch(err => {
//             console.log(err);
//             return res.redirect('/');
//         });
// };

exports.getProfile = (req, res, next) => {
    fetch('http://localhost:8080/myProfile', {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + req.userToken 
        },
        body: JSON.stringify({
            id: req.session.user,
            token: req.session.userToken 
        })
    })
    .then(result => {
        if (result.status !== 200) {
            console.log('Failed to fetch user status.');
            return res.redirect('/');
        }
        return result.json();
    })
    .then(resData => {
        res.render('pages/profile', {   
            path: '/profile',  
            pageTitle: 'My Profile',
            name: resData.name ,
            image: resData.image ,
            bio: resData.bio ,
            userSend: '' ,
            isLoggedIn : req.session.isLoggedIn ,
            postNo: resData.posts.length , 
            following: resData.following ,
            follow: resData.follow ,
            userId: req.session.user ,
            same: true , 
            posts : resData.posts
        });
    })
    .catch(err => {
        console.log(err);
        return res.redirect('/');
    });
};

exports.getAddPost = (req, res, next) => {
    res.render('pages/addPost', {
      path: '/addPost',
      pageTitle: 'Add Post',
      isLoggedIn: true,
      userId: req.session.user ,
      errorMess : ''
    });
  };

  exports.postAddPost = (req, res, next) => {
    const title = req.body.title ;
    const image = req.file.path ;
    const id = req.body.id ;
    fetch('http://localhost:8080/addPost', {
        method: 'POST',
        headers: {  
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + req.userToken 
        } ,
        body: JSON.stringify({
            id: req.session.user,
            image: image ,
            title : title
        }) 
    })
    .then(result => {
        if (result.status !== 201) {     
            console.log('Failed to fetch posts.');
            return res.redirect('/');
        }
        return result.json();
    })
    .then(resData => {
        res.redirect('/profile')
    })
    .catch(err => {
        console.log(err);
        return res.redirect('/');
    });
};

exports.getSearch = (req, res, next) => {
    res.render('pages/search', {
      path: '/search',
      pageTitle: 'Search',
      isLoggedIn: true 
    });
  };

  exports.postSearch = (req, res, next) => {
    const email = req.body.email;
    fetch('http://localhost:8080/search', {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + req.userToken 
        },
        body: JSON.stringify({
            email: email,
            token: req.session.userToken 
        })
    })
    .then(result => {
        if (result.status !== 200) {
            console.log('Failed to fetch user status.');
            return res.redirect('/');
        }
        return result.json();
    })
    .then(resData => {
        console.log(resData);
        res.render('pages/profile', {   
            path: '/profile',   
            pageTitle: 'My Profile',
            name: resData.name ,
            image: resData.image ,
            bio: resData.bio ,
            userId: req.session.user ,
            userSend: resData.id ,
            isLoggedIn : req.session.isLoggedIn ,
            postNo: resData.posts.length ,  
            following: resData.following ,
            follow: resData.follow ,
            same: resData.same ,   
            posts : resData.posts
        });
    })
    .catch(err => {
        console.log(err);
        return res.redirect('/');
    });
};

exports.postFollow = (req, res, next) => {
    const id = req.body.id ;
    const send = req.body.send ;
    console.log(send );
    console.log(id );
    fetch('http://localhost:8080/followReq', {
        method: 'POST',
        headers: {  
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + req.userToken 
        } ,
        body: JSON.stringify({    
            id: id,
            send: send 
        }) 
    })
    .then(result => {
        if (result.status !== 200) {     
            console.log('Failed to follow');
            return res.redirect('/');
        }
        return result.json();
    })
    .then(resData => {
        res.redirect('/profile')
    })
    .catch(err => {
        console.log(err);
        return res.redirect('/');
    });
};