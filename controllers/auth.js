const authController = require('../controllers/auth');
const express = require('express');
const fs = require('fs');
const isAuth = require('../MiddleWare/is-auth');
const openSocket = require('socket.io-client');
const path = require('path');

const User = require('../models/user');













const socket = openSocket('http://localhost:8080');



















exports.getLogin = (req, res, next) => {
  // let message = req.flash('error');
  // let mess;
  // if (message.length > 0) {
  //   mess = message[0];
  // } else {
  //   mess = null;
  // }
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    isLoggedIn: false,
    errorMess: '',
    post: false
});

};

exports.getReset = (req, res, next) => {
  // let message = req.flash('error');
  // let mess;
  // if (message.length > 0) {
  //   mess = message[0];
  // } else {
  //   mess = null;
  // }
  res.render('auth/reset', {
    path: '/reset',
    pageTitle: 'Login',
    isLoggedIn: false,
    errorMess : '' ,
    post : false
  });
};

exports.getSignIn = (req, res, next) => {
  // let message = req.flash('error');
  // let mess;
  // if (message.length > 0) {
  //   mess = message[0];
  // } else {
  //   mess = null;
  // }
  res.render('auth/signIn', {
    path: '/signIn',
    pageTitle: 'SignUp',
    isLoggedIn: false,
    errorMess : '' ,
    post : false
  });
};

exports.getRegister = (req, res, next) => {
  res.render('auth/register', {
    path: '/register',
    pageTitle: 'register',
    isLoggedIn: false,
    errorMess : '' ,
    post : false
  });
};

exports.getNewPass = (req , res , next) => {
  const id = req.params.id;
  res.render('auth/newPass', {
    path: '/signIn',
    pageTitle: 'New Password',
    isLoggedIn: false,
    userId : id ,
    post : false
  });
}

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  if(!email || !password){
    // req.flash('error' , 'Fill All Fieldreq.flashs');
    return res.redirect('/login');
  }
  console.log(email , password);
  fetch('http://localhost:8080/auth/login' ,  {
      method : 'POST' ,
      headers : {
        'Content-Type' : 'application/json'
      },
      body : JSON.stringify({
        email : email ,
        password : password
      })
    })
    .then(result => {
      // console.log(result.status);
      if (result.status === 422) {
        // req.flash('error' , 'Validation failed.');
        return res.redirect('/login');
      }
      else if (result.status !== 200 && result.status !== 201) {
        // req.flash('error' , 'Could not authenticate you!');
        return res.redirect('/login');
      }
      else{ 
        result.json()
        .then(resData => {
          // console.log(resData);
          req.session.user = resData.userId;
          req.session.isLoggedIn = true ;
          req.session.userToken = resData.token;
          res.redirect('/profile'); 
        })
      }
    })
    .catch(err => {
      console.log(err);
    });
};

// exports.postSignIn = (req, res, next) => {
//   const email = req.body.email ;
//   const password = req.body.password ;
//   const cpassword = req.body.password2 ;
//   const name = req.body.name ;
//   const rno = req.body.rno ;
//   const cty = req.body.country ;
//   console.log(`cty = ${cty}`);
//   const clg = req.body.clg ;
//   const post = req.body.post ;
//   const phone = req.body.phone ;
//   const errors = validationResult(req);
//   const image = req.file;
//   if (!errors.isEmpty()) {
//     return res.status(422).render('auth/signIn', {
//       path: '/signIn',
//       pageTitle: 'SignIn',
//       errorMess: errors.array()[0].msg
//     });
//   }
//   if(cpassword === password){
//     fetch('http://localhost:8080/auth/signUp' , {
//       method : 'PUT' ,
//       headers : {
//         'Content-Type' : 'application/json'
//       },
//       body : JSON.stringify({
//         email : email ,
//         password : password ,
//         name : name ,
//         rno : rno ,
//         cty : cty ,
//         post : post ,
//         clg : clg ,
//         phone : phone ,
//         imageUrl : image 
//       })
//     })
//       .then(result => {
//         console.log(result.status);
//         if (res.status === 422) {
//           req.flash('error' , 'Validation failed. Make sure the email address isnt used yet!');
//           return res.redirect('/login');
//         }
//         if (result.status !== 200 && result.status !== 201) {
//           req.flash('error' , 'Creating a user failed!');
//           return res.redirect('/login');
//         }
//         return result.json();
//       })
//       .then(resData => {
//         if(resData.message === 'User created'){
//           req.flash('error', 'User created');
//           return res.redirect('/login');
//         }
//         else if(resData.message === 'Email already exits'){
//           req.flash('error', 'Email already exits');
//           return res.redirect('/signIn');
//         }
//         else {
//           req.flash('error', 'Internal Server Error');
//           return res.redirect('/signIn');
//         }
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   }
// };

exports.postLogout = (req, res, next) => {
  req.session.destroy(err => {
    res.redirect('/login');
  });
};

exports.postReset = (req , res , next) => {
  const email = req.body.email;
  fetch('http://localhost:8080/auth/fetch' , {
      method : 'PUT' ,
      headers : {
        'Content-Type' : 'application/json'
      },
      body : JSON.stringify({
        email : email
      })
    })
    .then(result => {
      if (res.status === 422) {
        // req.flash('error' , 'Validation failed. Make sure the email address isnt used yet!');
        return res.redirect('/login');
      }
      if (result.status !== 200 && result.status !== 201) {
        // req.flash('error' , 'Sending Link Failed!');
        return res.redirect('/login');
      }
      return result.json();
    })
    .then(result => {
      if(!result){
        // req.flash('error' , 'email not found');
        return res.redirect('/login');
      }
      else {
        const id = result.user._id;
        return res.redirect(`/newPass/${id}`);
      }
    })
}

exports.postRegister = (req , res , next) => {
  const name = req.body.name ;
  const password = req.body.password ;
  const password2 = req.body.password2 ;
  const email = req.body.email ;
  const image = '../images/noImage' ;

  if(password !== password2){
    return res.redirect('/register');
  }
  fetch('http://localhost:8080/auth/register' , {
      method : 'POST' ,
      headers : {
        'Content-Type' : 'application/json'
      },
      body : JSON.stringify({
        name : name ,
        email : email ,
        password : password ,
        image : image
      })
    })
    .then(result => {
      if (result.status !== 200 && result.status !== 201) {
        return res.redirect('/register');
      }
      return result.json();
    })
    .then(result => {  
        return res.redirect('/login');
    })
}

exports.postNewPass = (req , res , next) => {
  const id = req.body.userId;
  console.log(`id = ${id}`)
  const pass = req.body.password;
  fetch('http://localhost:8080/auth/update' , {
      method : 'PUT' ,
      headers : {
        'Content-Type' : 'application/json'
      },
      body : JSON.stringify({
        id : id ,
        pass : pass
      })
    })
    .then(result => {
      if (res.status === 422) {
        // req.flash('error' , 'Validation failed. Make sure the email address isnt used yet!');
        return res.redirect('/login');
      }
      if (result.status !== 200 && result.status !== 201) {
        // req.flash('error' , 'Update Failed!');
        return res.redirect('/login');
      }
      return result.json();
    })
    .then(result => {
      if(!result){
        // req.flash('error' , 'email not found');
        return res.redirect('/login');
      }
      else {
        // req.flash('error' , 'Now enter same email and updated Password');
        res.redirect('/login');
      }
    })
  // User.findOne({_id : id})
  // .then( result => {
  //       result.password = pass;
  //       result.save();
  //       req.flash('error' , 'Now enter same email and updated Password');
  //       res.redirect('/login');
  // })
  // .catch(err => {
  //   const error = new Error(err);
  //   error.httpStatusCode = 500;
  //   return next(error);
  // });
}