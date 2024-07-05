const Sequelize = require('sequelize');
const connection = require('../database/database');
const Users = require('../users/Users');
const Produtos = require('./Produtos');

const Pedidos = connection.define('Pedidos', {
  status:{
    type:Sequelize.STRING,
    allowNull: false
  }
});



Pedidos.belongsTo(Users);
Users.hasMany(Pedidos);

Pedidos.belongsTo(Produtos)

//Pedidos.sync({force: true})
module.exports = Pedidos;

