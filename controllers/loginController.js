const express = require('express');
const router = express.Router();

// GET

router.get('/', (req,res)=>{
  res.render('login/login')
})


// POST

router.post('/login', (req,res)=>{
  var name = req.body.name;
  var password = req.body.password

  if(name === 'admin'){
    if(password==='admin'){
      res.redirect('/admin')
    }else{
      console.log('Wrong Password')
      res.redirect('/')
    }
  }else if(name === 'Kitchen'){
    if(password==='kitchen'){
      res.redirect('/kitchen')
    }else{
      console.log('Wrong Password')
      res.redirect('/')
    }
  }else{
    res.redirect('/')
  }
})


module.exports = router;