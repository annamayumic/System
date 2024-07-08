const express = require('express');
const router = express.Router();
const Produtos = require('../database/Produtos');
const Users = require('../database/Users');
const Pedidos = require('../database/Pedidos');


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