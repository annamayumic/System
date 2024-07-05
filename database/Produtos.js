const Sequelize = require('sequelize');
const connection = require('../database/database')

const Produtos = connection.define('Produtos', {
  title:{
    type: Sequelize.STRING,
    allowNull: false
  },
  price:{
    type: Sequelize.FLOAT,
    allowNull: false
  },
  status:{
    type:Sequelize.BOOLEAN,
    allowNull: false
  },
  image:{
    type:Sequelize.CHAR,
    allowNull: false
  }
});


Produtos.sync({force:true})

module.exports = Produtos;