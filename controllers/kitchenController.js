const express = require('express');
const router = express.Router();
const Produtos = require('../database/Produtos');
const Users = require('../database/Users');
const Pedidos = require('../database/Pedidos');

router.get('/kitchen', (req, res) => {
  Pedidos.findAll({
    order: [['status', 'DESC']],
    include: [{ model: Produtos, as: 'Produto' }]
  }).then(pedidos => {
    res.render('kitchen/main', { pedidos: pedidos });
  }).catch(err => {
    console.error('Erro ao buscar pedidos:', err);
    res.status(500).send('Erro ao buscar pedidos');
  });
});

router.post('/changeStatus', (req,res)=>{
  var id = req.body.id;
  if(id!=undefined){
    Pedidos.update({status: 'DONE'}, {where:{id:id}}).then(()=>{
      res.redirect('/kitchen')
    }).catch(err => res.send(err))
  }else{
    res.send('id is undefined')
  }
  
})


module.exports = router;