const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const adminController = require('./admin/adminController')
const userController = require('./users/userController')

//DB
const connection = require('./database/database')
const Produtos = require('./database/Produtos');
const Pedidos = require('./database/Pedidos');
const Login= require('./database/Login');
const Users = require('./users/Users');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static('public'))


connection.authenticate().then(()=>{
  console.log('DB connected with Server')
}).catch((err)=>console.log(err))


app.use('/', adminController)
app.use('/', userController)


app.get('/', (req,res)=>{
  res.send("enviado")
})

app.listen(9876, ()=>{
  console.log('Server ON');
})