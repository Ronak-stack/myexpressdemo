const express = require('express');
require('./db/config');
const cors = require('cors');
const app = express();
const UserController = require('./controllers/userController');
const LoginController = require('./controllers/loginController');
const ProductRoutes = require('./routers/productRoutes/products');
app.use(express.json());
app.use(cors());
app.post('/user/add', (req, res) => new UserController(req, res).saveUser());
app.post('/login', (req, res) => new LoginController(req, res).login());

// Product routes
app.use('/product', ProductRoutes);
app.listen(5000);