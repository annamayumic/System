const express = require('express');
const router = express.Router();
const Produtos = require('../database/Produtos');
const Users = require('../database/Users');
const Pedidos = require('../database/Pedidos');
const { where } = require('sequelize');

router.get('/admin', (req,res)=>{
  Users.findAll().then(users=>{
    res.render('admin/home.ejs', {users:users})
  }).catch(err=>res.send(err))

})

/* -----products ------  */

router.get('/admin/products', (req,res)=>{
  Produtos.findAll().then(products=>{
    res.render('admin/products', {products:products})  
  }).catch(err=>res.send(err))

})

router.get('/admin/products/new', (req,res)=>{
  res.render('admin/newProduct')
})

router.get('/admin/editProduct/:id', (req,res)=>{
  var id= req.params.id;
  
  Produtos.findOne({where:{id:id}}).then(produtos=>{  
    if(produtos != undefined){
      res.render('admin/editProduct', {produtos:produtos})
    }else{
      res.send('produtos is undefined')
    }
  }).catch(err=>res.send(err))
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
        }).catch(err=> res.send(err))
      }else{res.send('image is not defined')}
    }else{res.send('price is not a Number')}
  }else{res.send('title is undefined')}
})

router.post('/deleteProduct/:id', (req,res)=>{
  var id = req.params.id;

  if(id != undefined){
    if(!isNaN(id)){
      Produtos.destroy({
        where:{
          id:id
        }
      }).then(()=>{
        res.redirect('/admin/products')
      }).catch(err=>res.send(err))
    }else{res.send('id is not a Number')}
  }else{res.send('id is undefined')}

})

router.post('/admin/editProduct', (req,res)=>{
  var {id, title, price, status, image} = req.body;
  if(title!=undefined){
    if(!isNaN(price)){
      if(image!=undefined){
        Produtos.update({
          title:title,
          price:price,
          status:status,
          image:image
        }, {where:{id:id}}).then(()=>{
          res.redirect('/admin/products')
        }).catch(err=> res.send(err))
      }else{res.send('image is undefined')}
    }else{res.send('price is Not a Number')}
  }else{res.send('title is undefined')}
})


/*----- criar e remover users --------- */

router.get('/admin/newUsers', (req,res)=>{
  res.render('admin/newUser')
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

  if(id!=undefined){
    if(!isNaN(id)){
      Users.destroy({
        where:{
          id:id
        }
      }).then(()=>{
        res.redirect('/admin')
      }).catch(err=>res.send(err))
    }else{
      res.send('id is Not a Number')
    }
  }else{
    res.send('id is undefined')
  }
})


/* ----- cashier -------*/

router.get('/admin/cashier', (req, res)=>{
  Users.findAll().then(users=>{
    req.users=users
  }).then(()=>{
    Pedidos.findAll({
      order:[['userId', 'ASC']],
      include:[{model: Produtos, as:"Produto"}]
    }).then((pedidos)=>{
      res.render('admin/cashier', {pedidos:pedidos, users:req.users})
    }).catch(err=> res.send(err))
  }).catch(err=> console.log(err))
    
})

router.post('/deleteItemPedido', (req,res)=>{
  var id = req.body.id;
  if(id!=undefined){
    if(!isNaN(id)){
      Pedidos.destroy({where:{id:id}}).then(()=>{
        console.log('item deletado');
        res.redirect('/admin/cashier')
      }).catch(err=>res.send(err))
    }else{console.log('id is Not a Number')}
  }else{console.log('id is undefined')}
  

})

router.post('/endSection/:id', (req,res)=>{
  var UserId = req.params.id;

  if(UserId!=undefined){
    if(!isNaN(UserId)){
  
      Pedidos.destroy({where:{UserId:UserId}}).then(()=>{
        console.log('Mesa resetada')
        res.redirect('/admin/cashier')
      }).catch(err=>res.send(err))

    }else{console.log('id is not a Number')}
  }else{console.log('id is undefined')}

})


module.exports = router;