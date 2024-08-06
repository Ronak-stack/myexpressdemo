const express = require('express');
const ProductRoutes = express.Router();
const ProductController = require('../../controllers/productController');

ProductRoutes.get('/',(req,res) => new ProductController(req,res).showProducts());
ProductRoutes.post('/add',(req,res) => new ProductController(req,res).saveProduct());
ProductRoutes.post('/update',(req,res) => new ProductController(req,res).saveProduct());
ProductRoutes.post('/search',(req,res) => new ProductController(req,res).searchProduct());
ProductRoutes.post('/delete',(req,res) => new ProductController(req,res).deleteProduct());
module.exports = ProductRoutes;