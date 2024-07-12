const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const adminController = require('./controllers/adminController')
const userController = require('./controllers/userController')
const kitchenController = require('./controllers/kitchenController')
const loginController = require('./controllers/loginController')
const session = require('express-session')

//DB
const connection = require('./database/database')
const Produtos = require('./database/Produtos');
const Pedidos = require('./database/Pedidos');
const Users = require('./database/Users');
//

app.use(session({
  secret: 'abcdefg',
  cookie: {maxAge: 60000},
  resave: true,
  saveUninitialized: true
}))
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static('public'))


connection.authenticate().then(()=>{
  console.log('DB connected with Server')
}).catch((err)=>console.log(err))


app.use('/', adminController)
app.use('/', userController)
app.use('/', kitchenController)
app.use('/', loginController)




app.listen(9876, ()=>{
  console.log('Server on port 9876');
})