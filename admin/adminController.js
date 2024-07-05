const express = require('express');
const router = express.Router();
const Produtos = require('../database/Produtos');
const Users = require('../users/Users');

router.get('/admin', (req,res)=>{

  Users.findAll().then(users=>{
    res.render('admin/home.ejs', {users:users})
  })

})

router.get('/admin/products', (req,res)=>{

  Produtos.findAll().then(products=>{
    res.render('admin/products', {products:products})  
  })

})

router.get('/admin/products/new', (req,res)=>{
  res.render('admin/newProduct')
})


router.get('/admin/newUsers', (req,res)=>{
  res.render('admin/newUser')
})

router.post('/admin/createProduct', (req,res)=>{
  var {title, price, status, image} = req.body;
  if(title!=undefined){
    if(!isNaN(price)){
      if(image!=undefined){
        Produtos.create({
          title,
          price,
          status,
          image
        }).then(()=>{
          res.redirect('/admin/products')
        })
      }
    }
  }
})

router.post('/admin/createUser', (req,res)=>{
  var {password} = req.body;

  Users.create({
    password:password
  }).then(()=>{
    res.redirect("/admin")
  }).catch(err=>{
    res.send(err)
  })
})
module.exports = router;