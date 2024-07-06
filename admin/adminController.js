const express = require('express');
const router = express.Router();
const Produtos = require('../database/Produtos');
const Users = require('../users/Users');
const Pedidos = require('../database/Pedidos')

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

router.post('/admin/userDelete', (req,res)=>{
  var id = req.body.id;
  console.log(id)
  if(id!=undefined){
    if(!isNaN(id)){
      Users.destroy({
        where:{
          id:id
        }
      }).then(()=>{
        res.redirect('/admin')
      })
    }else{
      res.redirect('/admin')
    }
  }else{
    res.redirect('/admin')
  }
  
})

router.get('/admin/cashier', (req, res)=>{
  Pedidos.findAll().then((pedidos)=>{
    res.render('admin/cashier', {pedidos:pedidos})
  })
})


router.get('/kitchen', (req, res)=>{
  Pedidos.findAll().then((pedidos)=>{
    res.render('kitchen/main', {pedidos:pedidos})
  })
})

module.exports = router;