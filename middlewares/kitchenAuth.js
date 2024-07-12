function kitchenAuth(req,res, next){
  if(req.session.kitchen != undefined){
    next();
  }else{
    res.redirect('/')
  }
}

module.exports = kitchenAuth;

