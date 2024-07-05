const Sequelize = require('sequelize');
const connection = require('../database/database')

const Users = connection.define('Users', {
  id:{
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  password:{
    type:Sequelize.CHAR,
    allowNull: false
  }
});


Users.sync({force:false})
module.exports = Users;