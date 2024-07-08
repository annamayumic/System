const express = require('express');
const Produtos = require('../database/Produtos');
const Pedidos = require('../database/Pedidos');
const { where } = require('sequelize');
const router = express.Router();


router.get('/user/:id', (req,res)=>{
var id = req.params.id;
 Produtos.findAll().then(products=>{
  id=id
  req.products = products
 }).then(()=>{
  Pedidos.findAll().then(pedidos=>{
    res.render('users/main.ejs',{id:id, products:req.products, pedidos:pedidos})
  })
 })
  
})

router.post('/user/newOrder/:id', (req,res)=>{
  var userId = req.params.id
  var array = req.body.array;

  array.forEach(order => {
    Produtos.findOne({
      where:{
        id: order
      }
    }).then(()=>{
      Pedidos.create({
        status:"preparing",
        UserId:userId,
        ProdutoId: order
      })

      res.redirect('/user/:id')
    }).catch(err=>res.send(err))
    // find Id do produto na lista produtos e puxar o objeto.
    // colocar o UserId na tabela do pedido
  });
})

router.get('/users/login', (req,res)=>{
  res.render('login/loginUsers')
})

router.post('/users/signIn',(req,res)=>{
  var {id, password} = req.body
  console.log(id+password)
if(id!=undefined){
  if(password!=undefined){
    Login.findOne({
        where:{
          id:id,
          password:password
        }
      }).then(()=>{
        res.redirect("/user/"+id)
      })
  }else{
    res.redirect('/users/login')
  }

}else{
  res.redirect('/users/login')
}
  

})

module.exports = router;