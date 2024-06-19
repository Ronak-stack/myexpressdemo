const mongoose = require('mongoose');
const userSchema = require('./userSchema');

const productSchema = mongoose.Schema({
    name:String,
    category:String,
    user_id:{type:mongoose.Schema.Types.ObjectId, ref:'users'},
    company:String,
    is_active:Boolean,
    created_at:{type:Date, default:Date.now},
    updated_at:{type:Date, default:Date.now}, 
});

module.exports = productSchema;
