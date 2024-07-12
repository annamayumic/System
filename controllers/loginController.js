const express = require('express');
const router = express.Router();
// GET

router.get('/', (req,res)=>{
  res.render('login/login')
})

router.get('/admin/logout', (req,res)=>{
  req.session.admin = undefined;
  res.redirect('/')
})
router.get('/kitchen/logout', (req,res)=>{
  req.session.kitchen = undefined;
  res.redirect('/')
})
// POST

router.post('/login', (req,res)=>{
  var {name, password} = req.body;

  if(name!=undefined){
    if(password!=undefined){
      if(name === 'admin'){
        if(password==='admin'){
          req.session.admin = {
            name: name
          }
          res.redirect('/admin')
        }else{
          console.log('Wrong Password')
          res.redirect('/')
        }
      }else if(name === 'Kitchen'){
        if(password==='kitchen'){
          req.session.kitchen = {
            name: name}
          res.redirect('/kitchen')
        }else{
          console.log('Wrong Password')
          res.redirect('/')
        }
      } else{
       console.log('not found')
       res.redirect('/')
      }
    }else{console.log('password undefined'); res.redirect('/')}
  }else{console.log('name undefined'); res.redirect('/')}
  
})


module.exports = router;