module.exports = ( req , res , next) => {
    if(!req.session.isLoggedIn){
        return res.redirect('/login');
     }
     else{
      // console.log(req.session.cookie);
      // console.log(req.session);
      // console.log(req.session.user);
      // console.log(req.session.userToken);
        next();
     }
} 