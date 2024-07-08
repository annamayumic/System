const express = require('express');
const router = express.Router();
const Produtos = require('../database/Produtos');
const Users = require('../users/Users');
const Pedidos = require('../database/Pedidos');
const { where } = require('sequelize');

router.get('/admin', (req,res)=>{
  Users.findAll().then(users=>{
    res.render('admin/home.ejs', {users:users})
  })

})

/* -----products ------  */
router.get('/admin/products', (req,res)=>{
  Produtos.findAll().then(products=>{
    res.render('admin/products', {products:products})  
  })

})

router.get('/admin/products/new', (req,res)=>{
  res.render('admin/newProduct')
})

router.get('/admin/editProduct/:id', (req,res)=>{
  var id= req.params.id;
  console.log(id)
  
  Produtos.findOne({where:{id:id}}).then(produtos=>{  
    if(produtos != undefined){
      res.render('admin/editProduct', {produtos:produtos})
    }else{
      res.redirect('/admin/products')
    }
  })
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
      })
    }else{res.redirect('/admin/products')}
  }else{res.redirect('/admin/products')}

})


router.post('/admin/editProduct', (req,res)=>{
  var {id, title, price, status, image} = req.body;
  res.send('rota do botao precisa ser feita')
})

/*----- users --------- */
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

/* ----- cashier -------*/

router.get('/admin/cashier', (req, res)=>{
  Pedidos.findAll().then((pedidos)=>{
    res.render('admin/cashier', {pedidos:pedidos})
  })
})




/*------kitchen --------- */
router.get('/kitchen', (req, res)=>{
  Pedidos.findAll({order:[['status', 'DESC']]}).then((pedidos)=>{
    res.render('kitchen/main', {pedidos:pedidos})
  })
})

router.post('/changeStatus', (req,res)=>{
  var id = req.body.id;
  Pedidos.update({status: 'DONE'}, {where:{id:id}}).then(()=>{
    res.redirect('/kitchen')
  })
})


module.exports = router;