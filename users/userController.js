const express = require('express');
const Produtos = require('../database/Produtos');
const Pedidos = require('../database/Pedidos');
const router = express.Router();

router.get('/user/:id', (req,res)=>{
  var id = req.params.id;
  Produtos.findAll().then(products=>{
    res.render('users/main.ejs',{id:id, products:products})
  })
  
})

router.post('/user/newOrder/:id', (req,res)=>{
  var userId = req.params.id
  var OrderList = req.body.array;

  OrderList.forEach(order => {
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

module.exports = router;