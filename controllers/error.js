exports.get404 = (req, res, next) => {
    res.status(404).render('404', { pageTitle: 'Page Not Found',isLoggedIn: true, path: '/404' });
  };
  
  exports.get500 = (req, res, next) => {
    res.status(500).render('500', { pageTitle: 'Error',isLoggedIn: true, path: '/500'  });
  };