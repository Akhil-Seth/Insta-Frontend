const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const multer = require('multer');
const session = require('express-session');
const User = require('./models/user');
const MongoDBStore = require('connect-mongodb-session')(session);
// const csrf = require('csurf');
const fs = require('fs');
const openSocket = require('socket.io-client');
const flash = require('connect-flash');


const errorController = require('./controllers/error');

app.set('view engine', 'ejs');
app.set('views', 'views');

const MONGODB_URI = `mongodb://localhost:27017/?directConnection=true`;

const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + path.basename(file.originalname) );
  }
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.use(session({
  secret: 'Akhil',
  resave: false,
  saveUninitialized: false
}));

// const store = new MongoDBStore({
//   uri: MONGODB_URI,
//   collection: 'sessions'
// });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(multer({ storage: fileStorage , fileFilter: fileFilter}).single('image'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/images', express.static(path.join(__dirname, 'images')));

// const csrfProtection = csrf();

app.use((req, res, next) => {
  if (!req.user) {
    return next();
  }
  User.findById(req.user._id)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

// app.use(csrfProtection);
app.use(flash());

app.use((req, res, next) => {
  // res.locals.isLoggedIn = req.session.isLoggedIn;
  // res.locals.csrfToken = req.csrfToken();
  next();
});

// app.use((error , req , res , next) => {
//   console.log(`error = ${error}`);
//   const statusCd = error.statusCode || 500;
//   const mess = error.message;
//   res.status(statusCd).json({message : mess});
//   next();
// });

// app.use(srcRoutes);
app.use(authRoutes);
app.use(adminRoutes);
// app.use(logRoutes);

app.get('/500', errorController.get500);

app.use(errorController.get404);

app.use((error, req, res, next) => {
  console.log(`error = ${error}`);
  res.status(500).render('500', {
    pageTitle: 'Error!',
    path: '/500'
  });
});



mongoose.connect(MONGODB_URI)
.then(result => {
  app.listen(4000, '0.0.0.0') ;
}).catch(err => {
  console.log(`error = ${err}`);
})