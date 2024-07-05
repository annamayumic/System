const Sequelize = require('sequelize');
const connection = require('../database/database')

var Login = connection.define('Login', {
  category:{
    type:Sequelize.STRING,
    allowNull: false
  },
  password:{
    type:Sequelize.CHAR,
    allowNull: false
  }
});

Login.sync({force:false})
module.exports = Login;