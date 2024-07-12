function usersAuth(req,res, next){
  if(req.session.users != undefined){
    next();
  }else{
    res.redirect('/')
  }
}

module.exports = usersAuth;

