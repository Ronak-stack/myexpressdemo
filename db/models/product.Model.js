const mongoose = require('mongoose');
const productSchema = require('../schemas/productSchema');

const productModel = mongoose.model('products',productSchema);
module.exports = productModel;