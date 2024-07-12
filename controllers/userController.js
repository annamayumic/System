const express = require('express');
const Produtos = require('../database/Produtos');
const Pedidos = require('../database/Pedidos');
const { where } = require('sequelize');
const Users = require('../database/Users');
const router = express.Router();
const usersAuth = require('../middlewares/usersAuth')


router.get('/user/:id',usersAuth, (req, res) => {
  var id = req.params.id;
  Produtos.findAll().then(products => {
    req.products = products;
    return Pedidos.findAll({
      order: [['createdAt', 'ASC']],
      include: [{ model: Produtos, as: "Produto" }]
    });
  }).then(pedidos => {
    res.render('users/main.ejs', { id: id, products: req.products, pedidos: pedidos });
  }).catch(err => {
    console.error(err);
    res.send(err);
  });
});

router.post('/user/newOrder/:id', async  (req,res)=>{
  try {
    const userId = req.params.id;
    const array = req.body.array;

    //armazenar as promessas
    const promises = [];
    //
    for (const order of array) {  //para cada item do array
      const produto = await Produtos.findOne({ //encontra o id do produto que seja igual na tabela produtos
        where: { id: order }
      });

      if (produto) { //se id do produto houver na tabela produtos, cria um item na tabela Pedidos
        const pedido = await Pedidos.create({
          status: "preparing",
          UserId: userId,
          ProdutoId: order
        });
        promises.push(pedido); 
      } else {
        console.log(`Produto com id ${order} não encontrado.`);
      }
    }

    // Espera todas as operações de criação de pedido serem concluídas
    await Promise.all(promises);

    // Redirecionamento após o loop e criação dos pedidos
    res.redirect("/admin");
  } catch (err) {
    console.error('Erro ao processar novos pedidos:', err);
    res.status(500).send('Erro ao processar novos pedidos.');
  }
})

router.get('/users/login',usersAuth, (req,res)=>{
  res.render('login/loginUsers')
})

router.post('/users/signIn', (req,res)=>{
  var {id, password} = req.body
  
if(id!=undefined){
  if(password!=undefined){
    Users.findOne({
        where:{
          id:id,
          password:password
        }
      }).then(()=>{
        req.session.users = {
          id:id
        }
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